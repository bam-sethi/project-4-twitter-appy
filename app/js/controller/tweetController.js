angular.module('tweetApp', ['chart.js'])
  .controller('tweetController', tweetController)

// tweetController.$inject = ['socket'];

function tweetController($scope, $http) {

  var self = this;
  self.title = "Twitterappy";

  var socket = io('http://localhost:3000');

  $scope.data = []

  socket.on('tweet', function(tweet) {
    $scope.data.push(tweet.sentiment.score)    
    var sentiment = $scope.data

    console.log(sentiment)
    for(var i = -1; i < sentiment.length; i ++ ){
      if(i < 0){
        $scope.labels = ["negative"]
        console.log($scope.labels)
      } else if( i > 0 ){
        $scope.labels = ["positive"]
        console.log($scope.labels)
      }
    }

  });
    // $scope.data = [10, 10]
    // $scope.labels = ["pos", "neg"]
  //if sentiment.score < 0 

  



}

