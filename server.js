var express = require('express');
var app = express();
var port = process.env.PORT||3000;
var mongoose = require('mongoose');
var server = require('http').createServer(app);
var io = require('socket.io')(server)
var routes = require('./app/routes/index.js');

if(port===3000){
  require('dotenv').load();
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

mongoose.connect(process.env.MONGO_URI);

app.use(express.static('public'));

app.use('/bower_components', express.static('./bower_components'));

routes(app, io);

server.listen(port);