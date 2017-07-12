function connectYoutube(){
	window.location = "chatroom/"
}

var myApp = angular.module('chatapp',['ngWebSocket']);

myApp.factory('MyData', function($websocket) {
	    // Open a WebSocket connection
	    var dataStream = $websocket('ws://website.com/data');

	    var collection = [];

	    dataStream.onMessage(function(message) {
	        collection.push(JSON.parse(message.data));
	    });

	    var methods = {
	        collection: collection,
	        get: function() {
	          dataStream.send(JSON.stringify({ action: 'get' }));
	        }
        };

       return methods;
    }).
	controller('messageController', ['$scope',  function($scope, MyData) {
  
		$scope.loggedIn = true;
		$scope.sendMessage = function(user){
			console.log(user.message);
		}
		$scope.messages = MyData;
	}]);

