const pg = require('pg');
const bcrypt = require('bcrypt');
const dbAuth = require('../config/auth-keys')
const uuidV1 = require('uuid/v1');
const logger = require('../config/log');
const { signUpNewUser, checkForUser, retrieveUsername } = require('../helpers/queries');

const newUser = (client, values, failure, success, error) => {
  values.id = uuidV1();
  client.query(checkForUser(values.email), (err, res) => {
    if(err) {
      logger.error(err.stack);
    } else {
      if (res.rowCount > 0) {
        logger.debug('Customer exists.');
        client.end();
        return failure(err);
      } else {
        logger.warn('Customer does not exist.')
        client.query(signUpNewUser(values), (err) => {
          if(err) {
            error(err.stack);
          } else {
            client.end();
            logger.info('Client has been terminated.');
            return success();
          }
        });
      }
    }
  });
};

const retrieveUser = (client, values, failure, success, error) => {
  logger.debug('Retrieving, and logging in: ', values.usernameField);
  client.query(retrieveUsername(values), (err, res) => {
    if (err) { throw(err.stack); }
    else {
      if (res.rowCount === 0) {
        return failure();
      }
      else {
        const user = Object.assign({}, res.rows[0]);
        bcrypt.compare(values.passwordField, res.rows[0].user_password, (err, res) => {
          client.end();
          if(err) throw err;
          if (res === false) {
            return failure();
          } else {
            return success(user);
          }
        });
      }
    }
  });
};

module.exports.newUser = newUser;
module.exports.retrieve = retrieveUser;
