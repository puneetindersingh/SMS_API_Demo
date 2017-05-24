var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/** DEV */
/*
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var config = require("./config/webpack.dev");
*/
/** /DEV */

var appRoutes = require('./routes/app');
var smsApiRoutes = require('./routes/sms-api');

var app = express();
//var compiler = webpack(config); //dev

/** For dev only. Will have to comment out when i want to run prod stuff.
 *  Having a dev server would be better
 */
/*
app.use(webpackDevMiddleware(compiler, {
  publicPath: 'http://localhost:8080/'
}));
*/
/** /DEV */

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/sms-api', smsApiRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = app;
