angular.module('tweetApp', [])
  .controller('tweetController', tweetController)

// tweetController.$inject = ['socket'];

function tweetController($http, $scope) {

  var self = this;
  self.title = "Twitterappy";

  var socket = io('http://localhost:3000');

  // self.score = []
  self.negArray = []
  self.posArray = []
  self.sentimentArray = []

  socket.on('tweet', function(tweet) {

    var sentimentObject = tweet
    self.sentimentArray.push(sentimentObject)
    console.log(self.sentimentArray)


    var sentimentScore = tweet.sentiment.score  

    if(sentimentScore < 0){
      self.negArray.push(tweet)

    } else if(sentimentScore > 0) {
      self.posArray.push(tweet)
    }
    
    $scope.$apply()

  });

}

