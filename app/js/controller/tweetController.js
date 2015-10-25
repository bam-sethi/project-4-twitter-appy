angular.module('tweetApp', [])
  .controller('tweetController', tweetController)

// tweetController.$inject = ['$scope', 'socket']

function tweetController($scope, socket){
  self = this;
  self.tweets = [];
  console.log(self)
  socket.on('tweets', function (data) {
    console.log(self)
      self.tweets = self.tweets.concat(data);
      console.log(self)
  });


}