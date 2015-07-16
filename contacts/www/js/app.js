/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
	}
};

app.initialize();

angular.module('contacts', ['ngRoute', 'ui.bootstrap'])
	.config(function ($routeProvider) {
		'use strict';

		var resolve =  {
			store: function (contactStorage) {
				// Get the correct module (API or localStorage).
				return contactStorage.then(function (module) {
					module.get();
					return module;
				});
			}
		};

		$routeProvider
			.when('/', {
				controller: 'ContactCtrl',
				templateUrl: 'partials/contact-list.html',
				resolve: resolve
			})
			.when('/create', {
				controller: 'ContactDetailCtrl',
				templateUrl: 'partials/contact-edit.html',
				resolve: resolve
			})
			.when('/edit/:id', {
				controller: 'ContactDetailCtrl',
				templateUrl: 'partials/contact-edit.html',
				resolve: resolve
			})
			.otherwise({
				redirectTo: '/'
			});
	}
);
