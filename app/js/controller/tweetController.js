angular.module('tweetApp', [])
  .controller('tweetController', tweetController)

// tweetController.$inject = ['socket'];

function tweetController($http, $scope) {

  var self = this;
  var socket = io('http://localhost:3000');

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

    $scope.expandTweet = function(tweet){
      tweet.showTweet = !tweet.showTweet
      for (var i = 0; i < self.negArray.length; i++){
        var currentTweet = self.negArray[i];
        if (currentTweet != tweet){
          currentTweet.showTweet = false;
        } 
      }
    }

    $scope.expandPosTweet = function(tweeto){
      tweeto.showPosTweet = !tweeto.showPosTweet
      for (var i = 0; i < self.posArray.length; i++){
        var thisTweet = self.posArray[i];
        if (thisTweet != tweeto){
          thisTweet.showPosTweet = false;
        } 
      }
    }

    $scope.$apply()
  });






  //this needs to happen after
  // also have a button that resets the socket?
  // console.log(self.negArray.length)
  // if(self.negArray.length > self.posArray.length){
  //   console.log("bad vibes")
  // } else {
  //   console.log("goodvibes")
  // }

}

