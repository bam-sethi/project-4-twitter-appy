angular.module('tweetApp', ['chart.js'])
  .controller('tweetController', tweetController)

// tweetController.$inject = ['socket'];

function tweetController($scope, $http, $timeout) {

  var self = this;
  self.title = "Twitterappy";

  var socket = io('http://localhost:3000');

  $scope.data = []
  $scope.labels = []
  // $scope.positiveData = []
  // $scope.negativeData = []

  socket.on('tweet', function(tweet) {

    $scope.data.push(tweet.sentiment.score);    
    $scope.sentimentScore = $scope.data;
    // console.log(tweet.tweetText)
    $scope.twitterText = tweet.tweetText

    $scope.labels.push(tweet.sentiment.sentiment);
    $scope.sentimentAnalysis = $scope.labels;

    $scope.$apply()
  });
    // var sentimentScores = $scope.data

    // var average = 0
    // for(var i = 0; i < sentimentScores.length; i ++){
    //   average += (Math.abs(sentimentScores[i]) * 10)
    //   var av = average / sentimentScores.length
    //   console.log(av)
    // }




  //if the value of scope.data is neg push in to one array, if neg push in to other

  //need to basically do this, push the score in to the data array that chart js requires
  //and push the label in, can i do this as an object
  //can i make the data that chart recieves an object
  //where does chart js begin and where does angular-chart-js begin?

}

