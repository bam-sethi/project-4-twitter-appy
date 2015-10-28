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

    $scope.labels.push(tweet.sentiment.sentiment);
    $scope.sentimentAnalysis = $scope.labels;

    $scope.$apply()
    console.log($scope.labels)

  });

    // $scope.labels = ['fuck', 'u']
    // $scope.data = [100, 200]





    // this is looping over the array x number of times so is duplicating entries
    // for(var i = 0; i < $scope.label.length; i++){
    //   if($scope.label[i] === "positive"){

    //     $scope.positiveData.push($scope.label[i])
    //     console.log($scope.positiveData)

    //   } else if($scope.label[i] === "negative"){

    //     $scope.negativeData.push($scope.label[i])
    //     console.log($scope.negativeData)
    //   }
    // }


  //if the value of scope.data is neg push in to one array, if neg push in to other

  //need to basically do this, push the score in to the data array that chart js requires
  //and push the label in, can i do this as an object
  //can i make the data that chart recieves an object
  //where does chart js begin and where does angular-chart-js begin?

}

