(function () {
    "use strict";
    angular.module('home.homeModule').factory("home.services.peopleService",
        [
            "$resource", 
            function ($resource) {
                return $resource("api/home/:id", null,
                {
                    'update': {
                        method: 'PUT'
                    }
                });
            }
        ]);
}());
