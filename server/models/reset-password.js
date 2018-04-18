const pg = require('pg');
const bcrypt = require('bcrypt');
const moment = require('moment');
const uuidV1 = require('uuid/v1');
const dbAuth = require('../config/auth-keys')
const logger = require('../config/log');
const {
  checkForUser,
  insertNewToken,
  updatePassword,
  setToDeleted,
  check,
  checkIfRequestExists,
 } = require('../helpers/queries');

const reset = (email, success, failure, error) => {
  const client = new pg.Client(dbAuth);
  client.connect();
  logger.info('Client has been connected and assigned.');
  client.query(checkForUser(email), (err, res) => {
    if (err)  { throw err; }
    if (res.rowCount === 0) {
      client.end();
      logger.info('Client has been terminated.');
      return failure();
    } else {
      client.query(checkIfRequestExists(email), (err, res) => {
        if (err) { logger.error(err); }
        logger.info('res you need...', res.rowCount);
        if(res.rowCount > 0) {
          client.end();
          logger.info('Customer has outstanding reset request, reusing token.');
          return success(res.rows[0].reset_token, res.rows[0]);
        } else {
          generateToken(res.rows[0], client, (tokenInfo) => {
            client.end();
            logger.info('Client has been terminated.');
            return success(tokenInfo, res.rows[0]);
          });
        }
      });
    }
  })
}

const generateToken = (user, client, success, error) => {
  const tokenInfo = Object.assign({}, {
    id: user.user_id,
    begin_time: moment().unix(),
    end_time: moment().add(1, 'h').unix(),
    reset_token: uuidV1(),
  });
  client.query(insertNewToken(tokenInfo), (err, res) => {
    if (err) { throw err; }
    else {
      logger.info('New token generated and inserted into db.');
      success(tokenInfo.reset_token);
    }
  })
}

const resetComplete = (values, success, failure) => {
  logger.info('Client has been connected and assigned.');
  bcrypt.genSalt(10, (err, salt) => {
    if(err) { throw err; }
    bcrypt.hash(values.password.password, salt, (err, hash) => {
      console.log('hash ended');
      if (err) { throw err; }
      const newValues = Object.assign({}, {
        id: values.id,
        password: hash,
      });
      logger.info(newValues);
      const client = new pg.Client(dbAuth);
      client.connect();
      client.query(updatePassword(newValues), (err, res) => {
        if (err) { throw err; }
        if (res.rowCount === 1) { // we know it's been updated, nice.
        client.query(setToDeleted(values.id), (err, res) => {
          if (err) { throw err; }
          logger.info('Row in table has been set to archive state.')
          client.end();
        });
        success();
        // V2: research using a postgres 'trigger' to clean up the table: (if current time is greater than expiry, set deleted to true)
        //https://stackoverflow.com/questions/26046816/is-there-a-way-to-set-an-expiry-time-after-wich-a-data-entry-is-automatically
      } else {
        client.end();
        failure(); // token probs expired.
      }
    })
  })
  })
}

const resetCheck = (token, success, failure) => {
  logger.info(`Initiating validity check for ${token}`);
  const client = new pg.Client(dbAuth);
  client.connect();
  logger.info('Client has been connected and assigned.');
  client.query(check(token), (err, res) => {
    if (err) { throw err; }
    if (res.rows[0].deleted === true || moment().unix() > res.rows[0].end_time) {
      client.query(setToDeleted(token), (err, res) => {
        if (err) { logger.error(err); }
        client.end();
        logger.info('Client has been terminated and the token has been confirmed deleted.');
      })
      return failure();
    } else {
      client.end();
      logger.info('Client has been terminated');
      return success();
    }

  })
}

module.exports = {
  reset,
  resetComplete,
  resetCheck,
}

// create a new table, with rows: begin_time, end_time, user_id, reset_token. Done.

//  before the email goes out, generate a code in a seperate db of like 'valid email codes', send this out
// in a link when that link is clicked, we will check if that's a valid code, pass down the email address its attached to, when someone types in a new password, then we do another post to update the password.
// eventually, need to do a batch job that will clean this db up of old/expired tokens.
