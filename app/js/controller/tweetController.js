angular.module('tweetApp', [])
  .controller('tweetController', tweetController)

// tweetController.$inject = ['socket'];

function tweetController($scope, $http) {

  var self = this;
  self.title = "Twitterappy";

  var socket = io('http://localhost:3000');

  $scope.data = []
  $scope.label = []
  // $scope.positiveData = []
  // $scope.negativeData = []

  socket.on('tweet', function(tweet) {
    $scope.data.push(tweet.sentiment.score);    
    $scope.sentimentScore = $scope.data;

    $scope.label.push(tweet.sentiment.sentiment);
    $scope.sentimentAnalysis = $scope.label;

    $scope.$apply()
    // console.log($scope.negativeData)

    // var sentiment = tweet.sentiment.sentiment

    // if($scope.label === positive){
    //   console.log(sentiment)
    // }



  });

  //if the value of scope.data is neg push in to one array, if neg push in to other


    //or something like this?
  // $scope.data = {
  //   data: sentimentScore,
  //   label
  // }

  //need to basically do this, push the score in to the data array that chart js requires
  //and push the label in, can i do this as an object
  //can i make the data that chart recieves an object
  //where does chart js begin and where does angular-chart-js begin?




    // $scope.data = [10, 10]
    // $scope.labels = ["pos", "neg"]
  //if sentiment.score < 0 
    // console.log(sentiment)
    // for(var i = -1; i < sentiment.length; i ++ ){
    //   if(i < 0){
    //     $scope.labels = ["negative"]
    //     console.log($scope.labels)
    //   } else if( i > 0 ){
    //     $scope.labels = ["positive"]
    //     console.log($scope.labels)
    //   }
    // }
  



}

