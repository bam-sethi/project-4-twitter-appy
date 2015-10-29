angular.module('tweetApp', [])
  .controller('tweetController', tweetController)

// tweetController.$inject = ['socket'];

function tweetController($http, $scope) {

  var self = this;
  self.title = "Twitterappy";

  var socket = io('http://localhost:3000');

  self.score = []
  self.negArray = []
  self.posArray = []

  socket.on('tweet', function(tweet) {

    var sentimentScore = tweet.sentiment.score   
    self.score.push(sentimentScore)

    for(var j = 0; j < self.score.length; j ++){
      var num = self.score[j]
      if(num < 0){
        self.negArray.push(num)
        // console.log(self.negArray)
        
      } else if(num > 0){
        self.posArray.push(num)

      }
      $scope.$apply()
    }

        // console.log(self.posArray)

  });

}

