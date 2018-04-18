const pg = require('pg');
const bcrypt = require('bcrypt');
const moment = require('moment');
const uuidV1 = require('uuid/v1');
const dbAuth = require('../config/auth-keys')
const logger = require('../config/log');
const {
  retrieveUsername,
  changePassword,
} = require('../helpers/queries');

const resetRequest = (user, values, success, failure) => {
  const client = new pg.Client(dbAuth);
  client.connect();
  logger.info('Client has been connected and assigned');
  logger.info(user);
  // usernameField has to be named as such because thats what the query has. blame past you.
  const valuesToPass = {
    usernameField: user.email,
  };
  client.query(retrieveUsername(valuesToPass), (err, res) => {
    if (err) { throw(err.stack); }
    if (res.rowCount === 0) {
      return failure();
    }
    logger.info('values', values)
    bcrypt.compare(values['old-password'], res.rows[0].user_password, (err, res) => {
      if (err) {
        logger.err(err);
        return failure();
       }
      if (res === false) {
        return failure();
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) logger.err(err);
          bcrypt.hash(values.password, salt, (err, hash) => {
            if (err) logger.err(err);
            logger.info('Password has been hashed, will write to database.');
            valuesToPass.id = user.id;
            valuesToPass.password = hash;
            client.query(changePassword(valuesToPass), (err, res) => {
              if(err) { logger.err(err); }
              client.end();
              logger.info('Users password has been reset, client has been terminated.');
              return success();
            })
          })
        })
      }

    })
    logger.info('response: ', res.rows[0]);
    // bcrypt.compare(val)
    // bcrypt compare old password and whats in the db. if no match, return failure.
  })
}

module.exports = {
  resetRequest,
}

// first need to GET the user, compare the password, if it matches, then you may reset it.
