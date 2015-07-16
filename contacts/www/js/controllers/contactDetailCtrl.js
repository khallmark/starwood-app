/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('contacts').controller(
	'ContactDetailCtrl',
	[
		'$scope', '$routeParams','$filter', 'store', '$location',
		function ($scope, $routeParams, $filter, store, $location) {
			'use strict';

			var contacts = store.contacts;

			if ($routeParams.id) {
				$scope.id = $routeParams.id;
				$scope.contact = contacts[$scope.id];
				$scope.originalContact = angular.extend({}, $scope.contact)
			} else {
				$scope.id = null;
				$scope.contact = {
					firstName: "",
					lastName: ""
				};
				$scope.originalContact = angular.extend({}, $scope.contact);
			}


			$scope.cancel = function() {
				$scope.contact = $scope.originalContact;
				$location.path("/");
			};

			//$scope.save = function (contact, event) {
			//	// Blur events are automatically triggered after the form submit event.
			//	// This does some unfortunate logic handling to prevent saving twice.
			//	if (event === 'blur' && $scope.saveEvent === 'submit') {
			//		$scope.saveEvent = null;
			//		return;
			//	}
			//
			//	if ($scope.id !== null) {
			//		store.put(contact, $scope.id);
			//	}
			//
			//	$scope.saveEvent = event;
			//
			//	contact.firstName = contact.firstName.trim();
			//
			//	if (todo.title === $scope.originalContact.title) {
			//		$scope.editedContact = null;
			//		return;
			//	}
			//
			//
			//	store[todo.title ? 'put' : 'delete'](todo)
			//		.then(function success() {}, function error() {
			//			todo.title = $scope.originalContact.title;
			//		})
			//		.finally(function () {
			//			$scope.editedContact = null;
			//		});
			//};

			$scope.save = function (contact) {
				if ($scope.id !== null) {
					store.put($scope.contact, $scope.id);
				} else {
					store.insert($scope.contact);
				}

				$location.path("/");
			};
		}
	]
);
