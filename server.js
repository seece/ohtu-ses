var express = require('express')
var mongoose = require('mongoose')

var configPath = './config/env/';
//get command line argument that specifies whether to run in production/development/.. mode
if(process.argv.length >= 3)
{
    configPath+=process.argv[2];
}
else
{
    console.log("No configuration type given, using production");
    configPath+="production";
}

var config = require(configPath);

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
app.set('views', __dirname + 'app/views/');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  response.render('index', {}, function(err, html){
      response.send(html);
  });
})

app.get('/', function(request, response) {
  response.send('bibtex on paras!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

