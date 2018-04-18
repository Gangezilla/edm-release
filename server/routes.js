const logger = require('./config/log');

const {
  validate,
  writeUserToDb,
  retrieveUser,
} = require('./controllers/user');

const {
  resetPasswordCheck,
  resetPasswordInit,
  resetPasswordComplete,
} = require('./controllers/reset-password');

const {
  initReset,
} = require('./controllers/profile');

const {
  generateImages,
  generateHTML,
} = require('./controllers/email');

module.exports = (app, passport) => {

  app.get('/initial-config', (req, res) => {
    logger.silly('user', req.user);
    if(req.user) {
      res.send(req.user)
    } else {
      res.send({ error: 'user is not logged in' })
    }
  });

  app.get('/user/logout', (req, res, next) => {
    logger.info('User has been logged out');
    req.logout();
    res.send({ message: 'User has been logged out.' });
    // when you implement this, you need to update what you have in the redux state as well, k?
  });

  app.post('/user/profile', (req, res, next) => {

  })

  app.post('/user/profile/reset-password', (req, res) => {
    const values = req.body.values;
    const user = req.user;
    logger.info(`${user.email} has initiated password reset request from profile.`);
    initReset(user, values, () => { // success
      res.send({
        message: 'Your password has been successfully reset.'
      });
    },
    () => { // failure.
      res.send({
      error: 'Your password has not been reset. Please try again.'
      });
    });
  });

  app.post('/user/sign-up', (req, res, next) => {
    const user = {
      usernameField: req.body.values.email.toLowerCase(),
      passwordField: req.body.values.password,
    }
    passport.authenticate('sign-up', (err, user) => {
      if (err) return err;
      logger.info(req.user);
      validate(req, res, next);
      writeUserToDb(req, res, next);
    })(req, res, next);
  });

  app.post('/user/login', (req, res, next) => {
    const user = {
      usernameField: req.body.values.email.toLowerCase(),
      passwordField: req.body.values.password,
    }
    req.login(user, function(err) {
      if (err) { return next(err); }
      return;
    });
    passport.authenticate('login', function(err, user) {
      retrieveUser(req, res, next);
    })(req, res, next);
  });

  app.post('/reset-password/init/', (req, res, next) => {
    const message =
    `We have sent an email to ${req.body.values.email} with further instructions.`;
    resetPasswordInit(req.body.values.email);
    res.send({
      type: 'message',
      message,
    });
  });

  app.post('/reset-password/check/', (req, res, next) => {
    logger.info(`Checking the validity of ${req.body.id}`);
    resetPasswordCheck(req.body.id, () => { // success
      logger.info(`Token ${req.body.id} is valid.`)
      res.send({ message: 'Token is valid' });
    }, () => { // failure
      logger.info(`Token ${req.body.id} is invalid.`)
      res.send({
        errors: [`Your password has not been reset, probably because more than an hour has passed. Please try to reset your password again.`],
      });
    });
  })

  app.post('/reset-password/', (req, res, next) => {
    logger.info('reqqq', res.headersSent);
    if (req.body.values.password.password !== req.body.values.password.confirmPassword) {
      res.send({
        errors: [`It looks like those passwords don't match. Can you please try again?`]
      })
    }
    logger.info(`Password reset on ${req.body.values.id} is proceeding.`)
    resetPasswordComplete(req.body.values, () => { // success.
      res.send({
        success: 'Your password has been successfully reset. Please log in.'
      })
    }, () => { // failure.
      res.send({
        error: 'Your password has not been reset. Please try to reset your password again.'
      })
    });
  });

  app.post('/email/generate-html', (req, res) => {
    const imageDimensions = req.body.imageDimensions;
    const slicePositions = req.body.slicePositions;
    const uploadedImage = req.body.uploadedImage;

    generateHTML(imageDimensions, slicePositions, () => { // success

    }, () => { // failure

    });
  });

  app.post('/email/slice-image', (req, res) => {
    generateImages(req.body.imgBlobs, () => { // success

    }, () => { // failure

    });
  })
}

// so, what do we do with each of these?
// we need to 1) upload the image somewhere (probs)?
// 2) we need to use the slicing tools to slice (which isnt too hard, i've done it before)
// 3) return these sliced images as a zip, probably.
// 4) simultaneously, generate the HTML, give that. can probably just spit them onto the page at different times too, doesn't matter.
// you'd have a "we're just making your images/html now, please wait."
// 5) put the HTML into the DB. images at a later stage, soz.
