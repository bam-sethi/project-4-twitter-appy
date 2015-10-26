angular.module('tweetApp')

.factory('socket', function ($rootScope, $http) {
  // var socket = io.connect('localhost:8080', {transports:['websocket']});
  var socket = io.connect();
  console.log(socket)
  return {
    on: function (tweets, callback) {
      socket.on(tweets, function () {  
        console.log('hi')
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (tweets, data, callback) {
      socket.emit(tweets, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  }
})
