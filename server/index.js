const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session'); 
const passport = require('passport');
const logger = require('./config/log');
var helmet = require('helmet')

const app = express();
const PORT = process.env.PORT || 3000;

// Priority serve any static files.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname,  '../react-ui/build')));
}

app.use(helmet());

require('./config/passport')(passport);

// Log incoming requests
app.use(morgan('dev'));

// Need to read cookies for auth stuff.
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
// app.use(bodyParser());

// app.use(bodyParser.json({limit: '5mb'}));
// app.use(bodyParser.urlencoded({limit: '5mb'}));

// parse application/json
app.use(bodyParser.json({ limit: '10mb' }))

app.use(session({ secret: 'w:8CRAHD2~+_;5jH3[qkpm_r},,s$9EV' }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes.js')(app, passport);

logger.info('App has been initialised.')

// app.use('/', routes);

app.listen(PORT, function () {
  logger.info(`Listening on port ${PORT}`);
});
