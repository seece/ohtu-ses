var express = require('express')
var mongoose = require('mongoose')
var config = require('./config/env/production')

var app = express();

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
app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  response.render('index', {}, function(err, html){
    // ..
  });
})

app.get('/', function(request, response) {
  response.send('bibtex on paras!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

