angular.module('tweetApp', [])
  .controller('tweetController', tweetController)

tweetController.$inject = ['$http', tweetFactory]

function tweetController($http, tweetFactory){
  self = this;
  self.tweets = [];
   
  socket.on('tweets', function (data) {
      self.tweets = self.tweets.concat(data);
      console.log(self)
  });

}