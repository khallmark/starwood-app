/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('contacts')
	.controller(
		'ContactCtrl',
		['$scope', '$routeParams','$filter', 'store', '$location',
		function ($scope, $routeParams, $filter, store, $location) {
		'use strict';


		var contacts = $scope.contacts = store.contacts;

		$scope.newContact = {};

		$scope.editedContact = null;

		$scope.addContact = function () {
			var newContact = {
				firstName: $scope.newContact.firstName.trim(),
				lastName: $scope.newContact.lastName.trim()
			};

			if (!newContact.firstName) {
				return;
			}

			if (!newContact.lastName) {
				return;
			}

			$scope.saving = true;
			store.insert(newContact)
				.then(function success() {
					$scope.newContact = {};
				})
				.finally(function () {
					$scope.saving = false;
					$location.path("/");
				});
		};

		$scope.cancelCreateContact = function() {
			$scope.newContact = {};
			$location.path("/");
		};

		$scope.editContact = function (contact) {
			$scope.editedContact = contact;
			// Clone the original todo to restore it on demand.
			$scope.originalContact = angular.extend({}, contact);

			$location.path("/edit");
		};

		$scope.saveEdits = function (todo, event) {
			// Blur events are automatically triggered after the form submit event.
			// This does some unfortunate logic handling to prevent saving twice.
			if (event === 'blur' && $scope.saveEvent === 'submit') {
				$scope.saveEvent = null;
				return;
			}

			$scope.saveEvent = event;

			if ($scope.reverted) {
				// Contact edits were reverted-- don't save.
				$scope.reverted = null;
				return;
			}

			todo.title = todo.title.trim();

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

		$scope.removeContact = function (todo) {
			store.delete(todo);
		};

		$scope.saveContact = function (todo) {
			store.put(todo);
		};



	}]);
