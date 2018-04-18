const {
  reset,
  resetComplete,
  resetCheck,
} = require('../models/reset-password');
const logger = require('../config/log');
const emailUser = require('../helpers/email');

// should also check if the user has an existing request to reset open.
const resetPasswordInit = (email) => {
  reset(email.toLowerCase(), (tokenInfo, user) => { // success if user has been found.
    logger.info(`Customer has been found, token has been generated, will send password reset email now...`);
    const values = Object.assign({}, {
      email: user.user_email,
      firstName: user.user_first_name,
      type: 'forgot-password',
      tokenInfo,
    })
    emailUser(values);
  }, () => { // failure, if customer is not in our db.
    logger.info(`Password reset failed, customer does not exist, will alert the emails owner.`);
    const values = Object.assign({}, {
      email: email,
      type: 'forgot-password-not-found',
    });
    emailUser(values);
  });
}

const resetPasswordComplete = (values, success, failure) => {
  resetComplete(values, () => {
    logger.info('Password has been reset.')
    success();
  }, () => {
    logger.info('Password has not been reset.')
    failure();
  });
}

const resetPasswordCheck = (token, success, failure) => {
  resetCheck(token, () => { // success
    success();
  }, () => { //failure;
    failure();
  });
}

module.exports = {
  resetPasswordInit,
  resetPasswordComplete,
  resetPasswordCheck,
}
