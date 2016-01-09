angular.module('app.controllers', [])
     
.controller('myOffersCtrl', function($scope, Auth, OffersResource) {
	var self = this;
	self.offers = [];

	this.refresh = function () {
		var query = {
			owner: Auth.getCurrentUser() 
		};

		OffersResource.query(query)
			.then(function (offers) {
				self.offers = offers.map(function (offer) {
					console.log(offer)
					var data = offer._serverData;
					data.owner = offer.owner;
					return data;
				});
				$scope.$broadcast('scroll.refreshComplete');
			});
	}

	this.refresh();
})

.controller('createOfferCtrl', function ($state, Auth, OffersResource) {
	var self = this;
	this.offer = {
		title: '',
		description: '',
		make: '',
		model: '',
		year: 0,
		price: 0,
		fuel: '',
		owner: Auth.getCurrentUser()
	};

	this.makes = ['Audi', 'BMW', 'Citroen', 'Peugeot'];
	this.models = ['Model1', 'Model2', 'Model3'];
	this.years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
	this.fuelTypes = ['Diesel', 'Petrol', 'Electric', 'Hybrid'];

	this.create = function () {
		OffersResource.create(self.offer)
			.then(function (offer) {
				console.log('Successfully created offer: ', offer);
				$state.go('app.offers');
			});
	}
})
   
.controller('loginCtrl', function($state, Auth) {
	var self = this;
	this.userData = {
		username: '',
		password: ''
	};

	this.login = function () {
		Auth.login(self.userData)
			.then(function (user) {
				console.log('Successfully logged in: ', user);
				$state.go('app.search');
			});
	}
})
   
.controller('signupCtrl', function($scope) {

})
   
.controller('searchCtrl', function($scope) {

})
   
.controller('resultsCtrl', function($scope) {

})

.controller('sidemenuCtrl', function ($state, Auth) {
	this.currentUser = Auth.getCurrentUser();
	this.isLogged = Auth.isLogged;

	this.logout = function () {
		Auth.logout();
		$state.go('app.search');
	}
});
 