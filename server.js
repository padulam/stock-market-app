var express = require('express');
var app = express();
var port = process.env.PORT||3000;
var session = require('express-session');
var routes = require('./app/routes/index');
var passport = require('passport');
var mongoose = require('mongoose');

if(port===3000){
  require('dotenv').load()
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var devConfig = require('./webpack.config.dev');

  new WebpackDevServer(webpack(devConfig),{
    publicPath: devConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy:{
      "*": "http://localhost:3000"
    }
  }).listen(8080);
}

require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

app.use(express.static('public'));

app.use('/bower_components', express.static('./bower_components'));

app.use(session({
  secret: 'secretVoting',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

app.listen(port);