'use strict';

/* Controllers */

angular.module('ambassador.controllers', []).
  controller('MainCtrl', ['$scope', function($scope) {
		
		// Initial data
		$scope.links = [
			{
				name: "Kanye West",
				slug: "kanye-west",
				clicks: 200
			}
		];
  }])
	.controller('HomeCtrl', ['$scope', function($scope) {
				
		// Add new link
		$scope.addLink = function() {
			var name = $scope.newLink;
			// Converts name to slug format
			function convertToSlug(name) {
				var slug = name;
				return slug
					.toLowerCase()
					.replace(/ /g,'-')
					.replace(/[^\w-]+/g,'');
			};
			// Pushes new link to links array
			function pushLink(slug) {
				$scope.links.push({name: $scope.newLink, slug: slug, clicks: 0});
				$scope.newLink = "";
			};
			pushLink(convertToSlug(name));
		};
		
		// Delete link
		$scope.deleteLink = function(l) {
			var links = $scope.links;
			for(var i = 0; i < links.length; i++) {
				if(links[i] === l) {
					links.splice(i, 1);
					return;
				}
			}
		};
		
		// Add click to counter
		$scope.addClick = function(l) {
			l.clicks += 1;
		};

  }])
  .controller('LandingCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
		$scope.linkId = $routeParams.linkId;

  }]);