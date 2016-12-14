const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const favicon = require('serve-favicon');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const routes = require('./app/routes');
const port = process.env.PORT || 8080;
const app = express();

const configDB = require('./config/database');
mongoose.connect(configDB.url);

require('./config/passport')(passport);
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'hellothisisasecret',
  saveUninitialized: true,
  resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);

app.listen(port);
console.log(`Listening on port ${port}...`);
