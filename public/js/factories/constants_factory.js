angular.module('app.factory.Constants', [])

.factory('Constants', function editorFactory() {

    var constants = {};

    constants.wysiwygChoices = ["javascript", "xml","plain_text"];
    constants.httpOptions = ["HTTP", "HTTPS"];
    constants.httpMethods = ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "TRACE", "CONNECT"];

    return constants;
});
