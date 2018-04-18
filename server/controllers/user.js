const pg = require('pg');
const bcrypt = require('bcrypt');
const dbAuth = require('../config/auth-keys')
const { newUser, retrieve } = require('../models/user');
const logger = require('../config/log');
const emailUser = require('../helpers/email');

// validate the information thats been provided to us.
const validate = (req, res) => {
  logger.info('Validating...');
  const values = req.body.values;
  const errors = ['Sorry, some of your information is invalid. Please try again.'];
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line max-len
  const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
  if (values === undefined) {
    return res.send(errors);
  }
  var emailResult = emailRegex.test(values.email);
  var passwordResult = passwordRegex.test(values.password);
  if (!emailResult) errors.push('Invalid email address.');
  if (!passwordResult) errors.push('Password must be 8 characters, with one number and one capital letter.');
  if (errors.length > 1) {
    const clientResponse = {
      type: 'error',
      errors,
    }
    res.send(clientResponse);
  } else {
    logger.info('Validated!');
  }
};

const errorHandler = (err) => {
  throw err
}

const writeUserToDb = (req, res, next) => {
  const values = Object.assign({}, req.body.values);
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(req.body.values.password, salt, (err, hash) => {
      if (err) return next(err);
      values.password = hash;
      const client = new pg.Client(dbAuth);
      client.connect();
      req.client = client;
      logger.info('Client has been connected and assigned.');
      newUser(req.client, values,
        (err) => { // failure: if user has already signed up.
          if (err) throw err;
          const errors = ['Email has been registered previously, try resetting your password']
          const clientResponse = {
            type: 'error',
            errors,
          }
          res.send(clientResponse);
        },
        () => { // success: if user is new.
          logger.info('New user has been created, nice.');
          // need to send an email in here.
          req.values = values;
          values.type = 'signup';
          emailUser(values);
          res.redirect(307, '../login');
        },
        errorHandler);
    });
  });
};

const retrieveUser = (req, res, next) => {
  const client = new pg.Client(dbAuth);
  client.connect();
  req.client = client;
  logger.info('Client has been connected and assigned.');
  retrieve(req.client, req.user,
    (err) => { // failure: if user hasn't got the password/user right.
      if (err) throw err;
      logger.info('User\'s email and password don\'t match.')
      const errors = ['Email and password don\'t match. Please try again, or reset your password.']
      const clientResponse = {
        type: 'error',
        errors,
      }
      res.send(clientResponse);
    },
    (user) => { // success: if user has got the pw/user correct (y).
      logger.info(`${user.user_email} is logged in`);
      const clientUser = {
        userLoggedIn: true,
        firstName: user.user_first_name,
        surname: user.user_surname,
        email: user.user_email,
        id: user.user_id,
      }

      const clientResponse = {
        type: 'login',
        message: 'Successfully logged in',
        user: clientUser,
      }
      res.send(clientResponse)
      return next(null, res);
    }
  )
}

module.exports.validate = validate;
module.exports.writeUserToDb = writeUserToDb;
module.exports.retrieveUser = retrieveUser;
