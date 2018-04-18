const checkForUser = (email) => {
  return {
    name: 'check for duplicates',
    text: `SELECT * FROM users WHERE user_email=$1`,
    values: [email],
  }
}

const signUpNewUser = (values) => {
  return {
    name: 'sign up new user',
    text: `INSERT INTO users(user_email, user_password, user_first_name, user_surname, user_id)
    values($1, $2, $3, $4, $5)`,
    values: [values.email, values.password, values.firstName, values.surname, values.id],
  }
}

const retrieveUsername = (values) => {
  return {
    name: 'retrieve user by email',
    text: `SELECT user_email, user_password, user_first_name, user_id, user_surname
            FROM users
            WHERE user_email=$1`,
    values: [values.usernameField],
  }
}

const insertNewToken = (values) => {
  return {
    name: 'generate new token for a user who has forgotten their password',
    text: `INSERT INTO password_reset(user_id, begin_time, end_time, reset_token)
    values($1, $2, $3, $4)`,
    values: [values.id, values.begin_time, values.end_time, values.reset_token],
  }
}

const updatePassword = (values) => {
  return {
    name: 'check if reset token is valid, reset password if it is.',
    text: `
      UPDATE users
      SET user_password = $1
      FROM password_reset
      WHERE extract(epoch from now()) < password_reset.end_time
        AND password_reset.reset_token = $2
        AND password_reset.user_id = users.user_id
        AND password_reset.deleted != 't';`,
    values: [values.password, values.id],
  }
}

const changePassword = (values) => {
  return {
    name: 'reset password from user profile',
    text: `
      UPDATE users
      SET user_password = $1
      WHERE user_id = $2
        AND user_email = $3
      ;
    `,
    values: [values.password, values.id, values.usernameField]
  }
}

const setToDeleted = (id) => {
  return {
    name: 'setting values in pass_reset to true',
    text: `
    UPDATE password_reset
    SET deleted = true,
        deleted_time = extract(epoch from now())
    WHERE reset_token = $1
    ;`,
    values: [id]
  }
}

const check = (token) => {
  return {
    name: 'check if token is still valid',
    text: `
      SELECT *
      FROM password_reset
      WHERE reset_token = $1;`,
    values: [token]
  }
}

const checkIfRequestExists = (email) => {
  return {
    name: 'check if user has existing pw reset request',
    text: `
      SELECT *
      FROM users
      INNER JOIN password_reset
        ON users.user_id = password_reset.user_id
      WHERE deleted != 't'
      AND extract(epoch from now()) < password_reset.end_time
      AND user_email = $1;
    `,
    values: [email]
  }
}

// should REALLY fix this...
// const checkAndSignUp = (values) => {
//   return {
//     name: 'check for dupes, sign up if none',
//     text: ` INSERT INTO users (user_email, user_password)
//             SELECT $1
//             WHERE NOT EXISTS (SELECT user_email FROM users
//                   WHERE user_email=$1)
//           `,
//     values: [values.email, values.password]
//   }
// }

module.exports = {
  changePassword,
  check,
  checkForUser,
  checkIfRequestExists,
  insertNewToken,
  retrieveUsername,
  setToDeleted,
  signUpNewUser,
  updatePassword,
};
