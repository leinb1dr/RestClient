angular.module('app.factory.NewProjectModal', [])

.factory('NewProjectModalFactory', function editorFactory() {

    var newProjectModal = {};

    newProjectModal.modalInstanceCtrl = function($scope, $modalInstance, environments) {

        $scope.environments = environments;

        $scope.project = {};

        $scope.ok = function() {
            $modalInstance.close($scope.project);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.addEnvironment = function(index) {
            $scope.environments.splice(index+1, 0,{})
        }

        $scope.removeEnvironment = function(index) {
            $scope.environments.splice(index, 1)
        }
    };

    

    return newProjectModal;
});
