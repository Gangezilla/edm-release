const logger = require('../config/log');
const emailUser = require('../helpers/email');
const { resetRequest } = require('../models/profile');

const initReset = (user, values, success, failure) => {
  resetRequest(user, values, () => {
    logger.info('success in controller')
    const userInfo = Object.assign({}, user, {
         type: 'reset-password'
       }
     );
    emailUser(userInfo)
    success();
  }, () => {
    logger.info('Users password was not reset.');
    failure();
  });


 // so, we need to do a query to check if the password exists (probably just a where clause), if the where clause
 // matches, reset password (make sure you use all the bcrypt bs and so forth). then just return something (y).

};

module.exports = {
  initReset,
}

// query should be: where id = user.id AND where bcrypt.password = old_password, password = bcrypt(new-password)... or something...
