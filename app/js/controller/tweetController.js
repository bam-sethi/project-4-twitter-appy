angular.module('tweetApp', [])
  .controller('tweetController', tweetController)

// tweetController.$inject = ['socket'];

function tweetController($scope) {

  var self = this;
  self.title = "Twitterappy";

  var socket = io('http://localhost:3000');
  self.tweets = [];

  socket.on('tweet', function(data) {
    self.tweets.push(data);
    $scope.$apply();



    // for(var i = 0; i < self.tweets.length; i++){

    //   self.tweets[i].text
    // }


    
  });

  


}