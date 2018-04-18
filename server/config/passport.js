const pg = require('pg');
const dbAuth = require('../config/auth-keys')
const { validate, writeUserToDb } = require('../controllers/user');
var LocalStrategy   = require('passport-local').Strategy;
const logger = require('../config/log');

const deserializeQuery = (email) => {
  return {
    name: 'deserialize user',
    text: `SELECT *
            FROM users
            WHERE user_email=$1`,
    values: [email]
  }
}

module.exports = function(passport) {

  passport.serializeUser((user, done)=>{
    logger.info("Serialize", user.usernameField);
    done(null, user.usernameField);
  });

  passport.deserializeUser((user, done)=>{
    const client = new pg.Client(dbAuth);
    client.connect();
    logger.info(user);
    logger.info("deserialize ", user);
    client.query(deserializeQuery(user), (err, res) => {
      if(err) { logger.error(err.stack) }
      else {
        client.end();
        const updatedUser = Object.assign({}, {
          email: res.rows[0].user_email,
          firstName: res.rows[0].user_first_name,
          id: res.rows[0].user_id,
          surname: res.rows[0].user_surname,
        })
        logger.info('Client terminated, found user.')
        done(null, updatedUser);
      }
    })
  });

  passport.use('sign-up', new LocalStrategy({
    usernameField: 'user_email',
    passwordField: 'user_password',
    session: true,
    }, {
    function(email, password, done) {
      logger.info('Signing up...');
      validate(email, password);
      writeUserToDb(email, password);
      return done(null, email);
    }
    }));

    passport.use('login', new LocalStrategy({
      usernameField: 'user_email',
      passwordField: 'user_password',
      session: true,
    },
    (username, password, done) => {
      logger.info("Login process:", username);
      return db.one("SELECT user_id, user_name, user_email, user_role " +
          "FROM users " +
          "WHERE user_email=$1 AND user_pass=$2", [username, password])
        .then((result)=> {
          return done(null, result);
        })
        .catch((err) => {
          log.error("/login: " + err);
          return done(null, false, {message:'Wrong user name or password'});
        });
    }));
}
