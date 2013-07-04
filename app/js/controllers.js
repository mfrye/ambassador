'use strict';

/* Controllers */

angular.module('ambassador.controllers', []).
  controller('MainCtrl', ['$scope', function($scope) {
		
		$scope.links = [];
		
		// Initial data
		var initialData = [
			{
				"name": "Kanye West",
				"slug": "kanye-west",
				"clicks": "200",
				"edit": false
			},
			{
				"name": "Bonobo",
				"slug": "bonobo",
				"clicks": "121",
				"edit": false
			},
			{
				"name": "Matt Zo",
				"slug": "matt-zo",
				"clicks": "3",
				"edit": false
			}
		];
		
		// Create new prototypes for storing / getting array
		Storage.prototype.setObject = function(key, value) {
			this.setItem(key, JSON.stringify(value));
		};
		Storage.prototype.getObject = function(key) {
			var value = this.getItem(key);
			return value && JSON.parse(value);
		};
		
		// Put the object into storage
		$scope.$on('save', function() {
			var linksArray = $scope.links;
			localStorage.setObject('linksArray', JSON.stringify(linksArray));
		});
		
		// Retrieve the object from storage
		$scope.retrieveStorage = function() {
			var retrievedArray = localStorage.getObject('linksArray');
			$scope.links = JSON.parse(retrievedArray);
		};
		
		// Checks if data in storage, otherwise load initial data
		if (localStorage.getObject('linksArray') === null) {
			$scope.links = initialData;
			$scope.$emit('save');
		} else {
			$scope.retrieveStorage();
		}		
		
  }])
	.controller('HomeCtrl', ['$scope', function($scope) {
				
		// Converts name to slug format
		function convertToSlug(name) {
			var slug = name;
			return slug
				.toLowerCase()
				.replace(/ /g,'-')
				.replace(/[^\w-]+/g,'');
		};
		
		// Show input box and save btn for editing
		$scope.editItem = function(l) {
			l.edit = true;
		};
		
		// Saves data and hides edit 
		$scope.saveItem = function(l) {
			var name = l.name;
			l.slug = convertToSlug(name);
			l.edit = false;
			$scope.$emit('save');
		};
		
		// Add new link
		$scope.addLink = function() {
			var name = $scope.newLink;
			
			// Pushes new link to links array
			function pushLink(slug) {
				var name = $scope.newLink;
				$scope.links.push({"name": name, "slug": slug, "clicks": "0"});
				$scope.$emit('save');
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
					$scope.$emit('save');
					return;
				}
			}
		};
		
		// Add click to counter
		$scope.addClick = function(l) {
			var currentClick = parseInt(l.clicks);
			currentClick += 1;
			l.clicks = currentClick;
			$scope.$emit('save');
		};

  }])
  .controller('LandingCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
		
		for(var i = 0; i < $scope.links.length; i++) {
			if($scope.links[i].slug === $routeParams.linkId) {
				$scope.link = $scope.links[i];
			}
		};

  }]);