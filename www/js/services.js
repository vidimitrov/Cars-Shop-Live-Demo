angular.module('app.services', [])

.factory('Auth', ['$q', function($q){
	var self = this;

	function login (userData) {
		var deferred = $q.defer();

		Parse.User.logIn(userData.username, userData.password, {
			success: function (user) {
				deferred.resolve(user);
			},
			error: function (obj, error) {
				deferred.reject(error);
			}
		});

		return deferred.promise;
	}

	function signup () {
		// TODO: Implement signup
	}

	function logout () {
		Parse.User.logOut();
	}

	function isLogged () {
		return getCurrentUser() !== null;
	}

	function getCurrentUser () {
		return Parse.User.current();
	}

	return {
		login: login,
		signup: signup,
		logout: logout,
		isLogged: isLogged,
		getCurrentUser: getCurrentUser
	};
}])
.service('OffersResource', function ($q) {

	function query (params) {
		var deferred = $q.defer();
		var Offer = Parse.Object.extend("Offer");
		var query = new Parse.Query(Offer);

		if (params.owner) {
			query.equalTo("owner", params.owner);
		}
		
		if (params.make) {
			query.equalTo("make", params.make);
		}
		
		if (params.model) {
			query.equalTo("model", params.model);
		}
		
		if (params.firstRegistration) {
			query.greaterThanOrEqualTo("year", params.firstRegistration);
		}
		
		if (params.priceUpTo) {
			query.greaterThanOrEqualTo("price", params.priceUpTo);
		}
		
		if (params.mileageUpTo) {
			query.greaterThanOrEqualTo("mileage", params.mileageUpTo);
		}
		
		if (params.fuel) {
			query.equalTo("fuel", params.fuel);
		}
		
		if (params.country) {
			query.equalTo("country", params.country);
		}
		
		query.find({
			success: function(results) {
				deferred.resolve(results);
			},
			error: function(error) {
				deferred.reject(error);				
			}
		});

		return deferred.promise;
	}

	function getById (id) {
		// TODO: Get offer by id
	}

	function create (offerData) {
		var deferred = $q.defer();
		var Offer = Parse.Object.extend("Offer");
		var offer = new Offer();

		offer.set('make', offerData.make);
		offer.set('model', offerData.model);
		offer.set('price', offerData.price);
		offer.set('title', offerData.title);
		offer.set('description', offerData.description);
		offer.set('year', offerData.year);
		offer.set('fuel', offerData.fuel);
		offer.set('owner', offerData.owner);

		offer.save(null, {
			success: function (offer) {
				deferred.resolve(offer);
			},
			error: function (obj, error) {
				deferred.reject(error);
			}
		});

		return deferred.promise;

	}

	return {
		query: query,
		getById: getById,
		create: create
	}
});

