/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('contacts')
	.controller(
	'ContactDetailCtrl',
	['$scope', '$routeParams','$filter', 'store', '$location',
		function ($scope, $routeParams, $filter, store, $location) {
			'use strict';

			var contacts = store.contacts;

			var id = $routeParams.id;

			$scope.contact = contacts[id-1];

			$scope.cancelCreateContact = function() {
				$scope.contact = {};
				$location.path("/");
			};

			$scope.save = function (contact, event) {
				// Blur events are automatically triggered after the form submit event.
				// This does some unfortunate logic handling to prevent saving twice.
				if (event === 'blur' && $scope.saveEvent === 'submit') {
					$scope.saveEvent = null;
					return;
				}

				$scope.saveEvent = event;

				contact.firstName = contact.firstName.trim();

				if (todo.title === $scope.originalContact.title) {
					$scope.editedContact = null;
					return;
				}

				store[todo.title ? 'put' : 'delete'](todo)
					.then(function success() {}, function error() {
						todo.title = $scope.originalContact.title;
					})
					.finally(function () {
						$scope.editedContact = null;
					});
			};

			$scope.revertEdits = function (todo) {
				todos[todos.indexOf(todo)] = $scope.originalContact;
				$scope.editedContact = null;
				$scope.originalContact = null;
				$scope.reverted = true;
			};

			$scope.removeContact = function (contact) {
				store.delete(contact);
			};

			$scope.saveContact = function (contact) {
				store.put(contact);
			};



		}]);
