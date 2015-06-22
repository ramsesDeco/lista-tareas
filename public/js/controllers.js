(function () {

  angular.module('starter.controllers', [])

  /*********************************************************************************************************/
  .controller('myCtrl', ['$scope', '$rootScope', '$http', 'tareaService', function ($scope, $rootScope, $http,tareaService) {
    $scope.tareas = [];
    $scope.addNewTarea = false;

    $scope.getTareas = function(){
      tareaService.getTareas().then(function (data) { 
        //poner en formato la fecha, porque el input no acepta si no es new Date
        angular.forEach(data, function(eachData) {
          eachData.fecha_cierre = new Date(eachData.fecha_cierre);
        });        
        $scope.tareas = data;    
      });
    }

    //EDITAR
    $scope.editTarea = function(oldtarea,newTarea){
      index = ($scope.tareas.indexOf(oldtarea));
      $scope.tareas[index] = angular.copy(newTarea);
      tareaService.updateTarea($scope.tareas);
    }

    $scope.copy = function(newTarea,tarea){
      //this.newTarea = tarea;  --> hace referencia y si cambias newTarea cambia todo
      this.newTarea = angular.copy(tarea);
    }

    //AGREGAR
    $scope.addTareaPregunta = function(){
      pregunta = confirm("Esta seguro de agregar una tarea?");
      if(pregunta){  
        this.newTarea = {nombre: '', descripcion: '', responsable: '', fecha_cierre: '', colaboradores: [{nombre:''}], comentarios: [{txt:''}]};
        this.newTarea.colaboradores.splice(0,1);
        this.newTarea.comentarios.splice(0,1);
        $scope.addNewTarea = true;
      }        
    }

    $scope.addTarea = function(newT){
      $scope.tareas.push(newT);
      tareaService.addTarea($scope.tareas);
    }
    $scope.addColaborador = function(newTarea){
      this.newTarea.colaboradores.push({nombre: ""});
    }
    $scope.addComentario = function(newTarea){
      this.newTarea.comentarios.push({txt: ""});
    }

    //BORRAR
    $scope.delTarea = function(tarea){
    pregunta = confirm("Esta seguro de borrar esta tarea?");
      if(pregunta){
        $scope.tareas.splice($scope.tareas.indexOf(tarea),1);
        tareaService.updateTarea($scope.tareas);
      }
    }
    $scope.delColaborador = function(newTarea,colaborador){
      this.newTarea.colaboradores.splice(this.newTarea.colaboradores.indexOf(colaborador),1);
    }
    $scope.delComentario = function(newTarea,comentario){
      this.newTarea.comentarios.splice(this.newTarea.comentarios.indexOf(comentario),1);
    }
    }])//Fin Controller
/*********************************************************************************************************/


})();