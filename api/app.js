var express = require('express')
var app = express();
var morgan = require('morgan')
var bodyParser = require('body-parser');
var server = require('http').createServer(app)
var port = process.env.PORT || 3000;


// var routes = require('./config/routes');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(routes);

//ROUTE
app.get('/', function (req, res){
  // res.json('res', res)
   console.log(res.json())
});



server.listen(port, function(){
  console.log('Your sever is listening on port', port)
});



//TWITTER WEB SOCKET
var io = require('socket.io')(server);
var Twit = require('twit');

var twitter = new Twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET_KEY,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
});


var stream = twitter.stream('statuses/filter', { track: 'snowden' } );
//for multiple do { track: '[ josh, yao]'}

io.on('connect', function (socket){
  stream.on('tweet', function (tweet){
    var data = {};
    data.name = tweet.user.name;
    // data.screen_name = tweet.user.screen_name;
    data.text = tweet.text;
    // data.user_profile_image = tweet.user.profile_image_url;
    socket.emit('tweet', data);
  });
  console.log(data)
});




