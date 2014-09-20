angular.module('app.service.Project', [])

.service('Project', ['$rootScope', function projectService($scope) {

	this.createNewProject = function(form){
		console.log(form);
	}
    
  	
}]);