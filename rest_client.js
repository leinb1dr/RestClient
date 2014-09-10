/*
 * Module dependencies
 */
var express = require('express'),
    stylus = require('stylus'),
    nib = require('nib'),
    https = require("https")

var app = express()

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}))
app.use(express.static(__dirname + '/public'))
app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})

app.post('/execute', function (req, res) {

  var options = {
    host: "api2.stg.covisint.com",
    port: 443,
    path: req.body.url,
    method: 'POST',
    requestCert: true,
    rejectUnauthorized: false
  };

  var httpReq = https.request(options, function(result) {
      var responseBody = "";
      result.on('data', function(chunk) {
          responseBody += chunk;
      }).on('end', function() {
          res.status(200).json(JSON.parse(responseBody));
      });
  }).on('error', function(e) {
      console.log("Got error: ");
      console.log(e);
      res.status(500).json(e);
  });

  for(key in req.body.headers){
    var header = req.body.headers[key];
    httpReq.setHeader(header.key, header.value);
  }
  // console.log(JSON.stringify(requestBody.body));

  httpReq.write(req.body.body);
  httpReq.end();
	console.log(req.body);

  console.log(httpReq);

})
app.listen(3000)
