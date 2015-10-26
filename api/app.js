var express = require('express');
var http = require('http'); 
var app = express();
var morgan = require('morgan')
var bodyParser = require('body-parser');
var server = require('http').createServer(app)
var port = process.env.PORT || 3000;
var server    = app.listen(3000);



// var express = require('express'),
// var app = express();
// var server = http.createServer(app);

server.listen(3000);

// var routes = require('./config/routes');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(routes);

app.use(express.static(__dirname  + '../app'));



server.listen(port, function(){
  console.log('Your sever is listening on port', port)
});

var io = require('socket.io')(server)
// http.listen(server)
//   serveClient: (process.env === 'production') ? false : true,
//   path: '/'
// });


//TWITTER WEB SOCKET
// var io = require('socket.io')(server);
var Twit = require('twit');

var twitter = new Twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET_KEY,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
});





//for multiple do { track: '[ josh, yao]'}
// module.exports = function(io){}
// var socket = io.connect('http://localhost:9000')
  var stream = twitter.stream('statuses/filter', { track: 'snowden' } );

io.on('connect', function (socket){
  stream.on('tweets', function (tweets){
    var data = {};
    data.name = tweets.user.name;
    // data.screen_name = tweets.user.screen_name;
    data.text = tweets.text;
    // data.user_profile_image = tweets.user.profile_image_url;
    socket.emit('tweets', data);
  });
  console.log(data)
});



