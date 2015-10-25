angular.module('tweetApp', [])

  .factory('socket', function($rootScope){
    var socket = io.connect('http://localhost:3000');
    return {
        on: function (eventname, callback) {
            socket.on(eventname, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }
    };
  })