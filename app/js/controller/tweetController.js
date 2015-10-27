angular.module('tweetApp', ['chart.js'])
  .controller('tweetController', tweetController)

// tweetController.$inject = ['socket'];

function tweetController($scope, $http) {

  var self = this;
  self.title = "Twitterappy";

  var socket = io('http://localhost:3000');
  self.tweets = [];

  socket.on('tweet', function(tweet) {
    console.log(tweet);
    console.log(tweet.sentiment.score)
  });




  // self.labels = ["pos", "neg"]
  // self.data = [100, 400]


}



    // console.log(tweet)
    // console.log(tweet)
    // var tweetText = tweet.text.replace(/[^\w\s]/gi, '');
    // var sentimentAPI = "7f8e61099ff5c865cd5f736e57d76638905b9b0d";
    // // console.log(tweetText)
    // // var jsonData = JSON.stringify(tweetText)
    // var transformedTweet = encodeURI(tweetText);
    // // console.log(transformedTweet);
    // var url = "http://www.tweetsentimentapi.com/api/?key=" + sentimentAPI + "&text=" + transformedTweet
    // // console.log(jsonData)
    
    // $http.get(url)
    //   .success(function(response){
    //     console.log(response)
    //     // self.tweets.push(data);
    //     // $scope.$apply();
    //     }, function (response){
    //       console.log(response)
    // })