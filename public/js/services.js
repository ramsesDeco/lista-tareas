(function () { 

angular.module('starter.services', [])

 .factory('tareaService', ['$q', function ($q) {
    var app = {       
        getTareas: function() {
          var deferred = $q.defer();
          if(localStorage.getItem('data')!==null){
            data = JSON.parse(localStorage.getItem('data'));
            deferred.resolve(data);
            return deferred.promise;
          }
        },      
        addTarea: function(newElement) {
          localStorage.setItem('data', JSON.stringify(newElement));
        },
        updateTarea: function(newElement) {
          localStorage.removeItem('data');
          localStorage.setItem('data', JSON.stringify(newElement));
        },       
    }
    return app; 
  }])


})();
