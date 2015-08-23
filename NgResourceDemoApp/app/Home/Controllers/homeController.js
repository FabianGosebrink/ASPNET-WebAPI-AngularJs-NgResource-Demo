(function () {
    "use strict";
    angular.module('home.homeModule').controller('home.controllers.homeController', [
        'home.services.peopleService', 'toastr', "common.services.arrayHelper",
        function (peopleService, toastr, arrayHelper) {

            var vm = this;
            
            vm.newPerson = {};

            var getPeople = function () {
                //cfpLoadingBar.start();
                peopleService.query({},
                    function (data) {
                        //Success
                        vm.allPeople = data;
                    },
                    function () {
                        //Error
                        toastr.error("An Error occured", "Error");
                    });
            };

            var _addPerson = function () {
                peopleService.save(vm.newPerson,
                    function (data) {
                        vm.allPeople.push(data);
                        vm.newPerson = null;
                        toastr.success('Person added', 'Success!');
                    },
                        function (response) {
                            //Error
                            var errors = [];
                            for (var key in response.data.ModelState) {
                                for (var i = 0; i < response.data.ModelState[key].length; i++) {
                                    errors += response.data.ModelState[key][i] + "\r\n";
                                }
                            }
                            toastr.error(errors, "Error");
                        });
            };

            var _deletePerson = function (personToDelete) {
                peopleService.delete({ id: personToDelete.Id }, function () {
                    arrayHelper.removeFromArray(vm.allPeople, personToDelete);
                    toastr.success('Person deleted', 'Success!');
                }, function () {
                    //Error
                    toastr.error("An Error occured", "Error");
                });
                
            };

            getPeople();

            vm.addPerson = _addPerson;
            vm.deletePerson = _deletePerson;
        }
    ]);

})();