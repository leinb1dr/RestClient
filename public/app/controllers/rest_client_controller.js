angular.module('app.controller.RestClientCtrl', [])

.controller('RestClientCtrl', ['$rootScope','$http',  'Editor', function ($scope, $http, editor) {
  
  var input = editor.create('request');
  var output = editor.create('response');
  $scope.wysiwygChoices=["javacript","xml"];
  $scope.httpOptions=["HTTP","HTTPS"];
  $scope.httpMethods=["GET","POST","PUT","DELETE","HEAD","OPTIONS","TRACE","CONNECT"];
  $scope.requestMode=$scope.wysiwygChoices[0];
  $scope.responseMode=$scope.wysiwygChoices[0];
  $scope.url=""
  $scope.httpType=$scope.httpOptions[0]
  $scope.headers=[{key:"content-type",value:"application/json"}];
  $scope.queryParams=[{key:"search",value:"hello*"}];

  $scope.addHeader = function(){
  	this.headers.push({key:"",value:""});
  };

  $scope.removeHeader = function(){
    this.headers.pop();
  };

  $scope.addQueryParam = function(){
    this.queryParams.push({key:"",value:""});
  };

  $scope.removeQueryParam = function(){
    this.queryParams.pop();
  };

  $scope.executeServiceCall = function(form){
    var requestBody = {url:form.url,
     body:input.getView().getValue(),
     headers:$scope.headers};
  	$http.post('/execute', requestBody).success(function(data,status,headers,config){
      console.log(data);
      output.getView().setValue(JSON.stringify(data,null,2))
    });
  	
  };

  $scope.updateRequestEditor = function() {
  	input.setMode(this.requestMode);
  };

  $scope.updateResponseEditor = function() {
    output.setMode(this.responseMode);
  };


}]);