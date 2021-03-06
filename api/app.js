var express = require('express');
var cors = require('cors');
var app = express();
var morgan = require('morgan')
var bodyParser = require('body-parser');
var http = require('http');
var server = http.createServer(app)
var port = process.env.PORT || 3000;
// var server    = app.listen(3000);
var request = require('request');

app.use(cors());

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

//LONDON STREAM
var stream = twitter.stream('statuses/filter', { track: '[fml, ACAB, rentstrike, rentcap, london rent, blacklivesmatter, politics, fully automated luxury communism, sorrynotsorry]', filter_level: 'low', locations: "51.286839, -0.51035, 51.507702, -0.12797" });

var twitterArray = [] 

io.on('connect', function (socket){
  stream.on('tweet', function (tweet){

    var tweetText = tweet.text;

    request("http://www.tweetsentimentapi.com/api/?key=7f8e61099ff5c865cd5f736e57d76638905b9b0d&text=" + 
      tweetText, function(error, response, body){

      if(!error && response.statusCode == 200){

        var sentimentBody = JSON.parse(body);
        var tweetAndSentiment = { 
          sentiment: sentimentBody,
          tweetText: tweetText 
        };
        twitterArray.push(tweetAndSentiment)

        if (twitterArray.length < 100){
            console.log(twitterArray.length)
            socket.emit('tweet', tweetAndSentiment)
        };
      }
    })    
  })
});



server.listen(port, function(){
  console.log('Your server is listening on port', port);
});

