var socket = io.connect();
var myApp = angular.module('chatapp',[]);

myApp.controller('messageController', ['$scope', '$http', function($scope, $http) { 
	$scope.loggedIn = false;
	$scope.invalidUser = false;
	$scope.messages = [];
	$scope.loggedInUser = "";
	$scope.selectedUserName = "";
	$scope.selectedUserMessages = "";

	$scope.sendMessage = function(user){
		console.log(user.message);
		socket.emit('message', {text: user.message, user: $scope.loggedInUser});
		user.message = "";
	};		

	$scope.onMessage = function(message){
		$scope.messages.push(message);
		$scope.$apply();
	};

	$scope.onSelectUser = function(){
		url = "/userMessages?user=" + $scope.selectedUserName;
		$http.get(url).then(function(response){
			console.log(response.data);
			if(response.data.notext){
				$scope.invalidUser = true;
				$scope.selectedUserName = "";
				$scope.selectedUserMessages = "";
			}else{
				$scope.selectedUserMessages = response.data.text;
			}
		}, function(err){console.log(err)});
	};

	function onSignIn(googleUser) {		
		var profile = googleUser.getBasicProfile();
		$scope.loggedInUser = profile.getName();
		$scope.avatarUrl = profile.getImageUrl();
		$scope.loggedIn = true;
		$scope.$apply();
	};
	window.onSignIn = onSignIn;
}]);

socket.on('message', function(message){ 
	var scope = angular.element(document.getElementById('user_message_div')).scope();
	scope.onMessage(message);
	scope.$apply();
});