// This is needed for relative imports to work when including the main module
// from the test suite.
process.env.NODE_PATH = '.';
require('module').Module._initPaths();

var express = require('express')
require('express-crud');
var app = express();
var Article = require("./app/models/article");

var mongoose = require('mongoose')

var configPath = './config/env/';

if(process.env.MONGOLAB_URI === undefined) {
    console.log("MONGOLAB_URI not found, using development config.");
	configPath += "dev";
} else {
    console.log("Using production config.");
    configPath += "production";
}

var config = require(configPath);



// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db_uri, options);
};

connect();


mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('connected', function(){
    console.log("Connected to database.");
        });

app.set('port', (process.env.PORT || 5000))

var pub = __dirname + '/public';
app.use(express.static(pub));


//Jade html template language example stuff...
app.set('view engine', 'jade');
app.set('views', (__dirname + '/app/views'));

app.get('/', function(request, response) {
  response.render('index', function(err, html){
      response.send(html);
      console.log(html);
      console.log(err);
  });
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

app.crud('article', Article);

exports.app = app;

