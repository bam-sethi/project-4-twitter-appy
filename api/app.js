var express = require('express');
// var cors = require('cors');
var app = express();
var morgan = require('morgan')
var bodyParser = require('body-parser');
var server = require('http').createServer(app)
var port = process.env.PORT || 3000;
// var server    = app.listen(3000);

// app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname  + '../app'));

//TWITTER WEB SOCKET
var io = require('socket.io')(server);
var Twit = require('twit');

var twitter = new Twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET_KEY,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var stream = twitter.stream('statuses/filter', { track: 'feminist' });

io.on('connect', function (socket){
  stream.on('tweet', function (tweet){
    // var data = {};
    // data.text = tweet.text;
    // socket.emit('tweet', data);
    // console.log(data);

    console.log(tweet);
    var data = tweet;
    socket.emit('tweet', data);
  });
});

server.listen(port, function(){
  console.log('Your server is listening on port', port)
});

