angular.module('app.factory.Editor', [])

.factory('Editor', function editorFactory() {

  	var editorFactory = {};

    function Editor(divId){
        var view = ace.edit(divId);
        view.setTheme("ace/theme/monokai");
        view.getSession().setMode("ace/mode/plain_text");

        this.setMode = function(mode){
        	view.getSession().setMode("ace/mode/" + mode);
        }

        this.getView = function(){
            return view;
        }
    }

    editorFactory.create = function(divId){
        return new Editor(divId);
    }

    return editorFactory;
});