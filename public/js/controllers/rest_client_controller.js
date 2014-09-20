angular.module('app.controller.RestClientCtrl', [])

.controller('RestClientCtrl', ['$rootScope', '$http', '$modal', 'Editor', 'Constants', 'NewProjectModalFactory',
    function($scope, $http, $modal, editor, constants, newProjectModalFactory) {

        var input = editor.create('request');
        var output = editor.create('response');

        $scope.responseHeaders = {};
        $scope.constants = constants;
        $scope.requestMode = constants.wysiwygChoices[0];
        $scope.responseMode = constants.wysiwygChoices[0];
        $scope.url = ""
        $scope.httpType = constants.httpOptions[0]
        $scope.headers = [{
            key: "content-type",
            value: "application/json"
        }];
        $scope.queryParams = [{
            key: "search",
            value: "hello*"
        }];

        $scope.addHeader = function() {
            this.headers.push({
                key: "",
                value: ""
            });
        };

        $scope.removeHeader = function() {
            this.headers.pop();
        };

        $scope.addQueryParam = function() {
            this.queryParams.push({
                key: "",
                value: ""
            });
        };

        $scope.removeQueryParam = function() {
            this.queryParams.pop();
        };

        $scope.executeServiceCall = function(form) {
            var requestBody = {
                httpType: form.httpType,
                hostName: form.hostName,
                port: form.port,
                method: form.httpMethod,
                url: form.url,
                body: input.getView().getValue(),
                headers: $scope.headers
            };
            $http.post('/execute', requestBody).success(function(data, status, headers, config) {
                console.log(data);
                $scope.responseHeaders = data.headers;
                var val = data.headers["content-type"];
                var mode = "plain_text";
                switch (val) {
                    case "application/json":
                        mode = "javascript";
                        break;
                    case "text/xml":
                        mode = "xml";
                        break;
                    default:
                        mode = "plain_text";
                        break;
                }

                $scope.responseMode = mode;
                output.setMode(mode);
                output.getView().setValue(JSON.stringify(data, null, 2))
            });

        };

        $scope.updateRequestEditor = function() {
            input.setMode(this.requestMode);
        };

        $scope.updateResponseEditor = function() {
            output.setMode(this.responseMode);
        };

        $scope.open = function(size) {

            var modalInstance = $modal.open({
                templateUrl: 'template/modal/myModal',
                controller: newProjectModalFactory.modalInstanceCtrl,
                size: size,
                resolve: {
                    environments: function(){return [{envName:"test"}]}
                }
            });

            modalInstance.result.then(function(project) {
                $scope.projects.push(project)

            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });
        };

        $scope.item = {};

        $scope.projects = [

        ]


    }
]);
