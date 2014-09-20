/*
 * Module dependencies
 */
var express = require('express'),
    stylus = require('stylus'),
    routes = require('./routes'),
    api = require('./routes/api'),
    nib = require('nib'),
    https = require("https")

var app = module.exports = express.createServer()

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib())
}

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'))
    app.set('view options', {
        layout: false
    });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(stylus.middleware({
        src: __dirname + '/public',
        compile: compile
    }))
    app.use(app.router);
});

app.post('/execute', api.executeApiCall);

app.get('/', routes.index);

app.get('/partials/:name', routes.partials);
app.get('/template/:directive/:name', routes.bootstrapTemplate)

app.listen(3000);
