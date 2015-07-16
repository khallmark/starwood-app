
angular.module('contacts')
	.factory('contactStorage', function ($http, $injector) {
		'use strict';

		// Detect if an API backend is present. If so, return the API module, else
		// hand off the localStorage adapter
		return $http.get('/api')
			.then(function () {
				return $injector.get('api');
			}, function () {
				return $injector.get('localStorage');
			});
	})
	.factory('localStorage', function ($q) {
		'use strict';

		var STORAGE_ID = 'contacts-angularjs';

		function generateId() {
			var d = new Date();
			return d.getTime();
		}

		var store = {
			contacts: [],

			_getFromLocalStorage: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			_saveToLocalStorage: function (contacts) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(contacts));
			},

			delete: function (contact) {
				var deferred = $q.defer();

				store.contacts.splice(store.contacts.indexOf(contact), 1);

				store._saveToLocalStorage(store.contacts);
				deferred.resolve(store.contacts);

				return deferred.promise;
			},
			get: function () {
				var deferred = $q.defer();

				angular.copy(store._getFromLocalStorage(), store.contacts);
				deferred.resolve(store.contacts);

				return deferred.promise;
			},

			insert: function (contact) {

				contact.id = store.contacts.length + 1;

				var deferred = $q.defer();

				store.contacts.push(contact);

				store._saveToLocalStorage(store.contacts);
				deferred.resolve(store.contacts);

				return deferred.promise;
			},

			put: function (contact, index) {
				var deferred = $q.defer();

				store.contacts[index] = contact;

				store._saveToLocalStorage(store.contacts);
				deferred.resolve(store.contacts);

				return deferred.promise;
			}
		};

		return store;
	});
