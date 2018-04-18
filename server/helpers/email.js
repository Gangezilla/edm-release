const nodemailer = require('nodemailer');
const logger = require('../config/log');

const signupMessage = `Hey there, thanks for signing up...`; // eslint-disable-line max-len
const resetPasswordMessage = (user) => `Hey, looks like you've forgotten your password. We can fix that up no problems. Just click on the link below. .../user/reset-password/${user.tokenInfo}`; // eslint-disable-line max-len
const resetPasswordNotFoundMessage = `You (or someone else) entered this email when trying to reset their password. However, this email is not in our database so the password reset attempt has failed...` // eslint-disable-line max-len
const resetPasswordSuccess = `Hey, just letting you know that your password has been reset. If you didn't do this please let us know etc...` // eslint-disable-line max-len


// create transporter to be reused.
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  port: 465,
  secure: true,
  auth: {
    user: 'FAKE EMAIL ADDRESS',
    pass: 'FAKE PASSWORD'
  }
});

const mailer = (user) => {
  logger.info('trying to send email now boss');
  let mailOptions;
  if (user.type === 'signup') {
    mailOptions = Object.assign({}, {
      from: `"EDM Dream Team 👨🏻" <FAKE EMAIL ADDRESS>`,
      to: user.email,
      subject: `Hey, ${user.firstName}, welcome to email building paradise!`,
      text: signupMessage,
    })
  } else if (user.type === 'forgot-password') {
    logger.info('forgot pw: ', user);
    mailOptions = Object.assign({}, {
      from: `"EDM Dream Team 👨🏻" <FAKE EMAIL ADDRESS>`,
      to: user.email,
      subject: `Hey ${user.firstName}, let's get you back into your account`,
      text: resetPasswordMessage(user),
    })
  } else if (user.type === 'forgot-password-not-found') {
    mailOptions = Object.assign({}, {
      from: `"EDM Dream Team 👨🏻" <FAKE EMAIL ADDRESS>`,
      to: user.email,
      subject: `Account Access Attempted`,
      text: resetPasswordNotFoundMessage,
    })
  } else if (user.type === 'reset-password') {
    mailOptions = Object.assign({}, {
      from: `"EDM Dream Team 👨🏻" <FAKE EMAIL ADDRESS>`,
      to: user.email,
      subject: `Your password has been reset`,
      text: resetPasswordSuccess,
    })
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw err
    }
    logger.info(info);
    logger.info(`Message to ${user.email} has been sent.`)
  })
}

module.exports = mailer;
