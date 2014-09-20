exports.executeApiCall = function(req, res) {

    var options = {
        host: req.body.hostName,
        port: req.body.port,
        path: req.body.url,
        method: req.body.method,
        requestCert: true,
        rejectUnauthorized: false
    };

    var httpReq = https.request(options, function(result) {
        var responseBody = "";
        result.on('data', function(chunk) {
            responseBody += chunk;
        }).on('end', function() {
            console.log(result);

            res.status(200).json({
                body: responseBody,
                headers: result.headers
            });
        });
    }).on('error', function(e) {
        console.log("Got error: ");
        console.log(e);
        res.status(500).json(e);
    });

    for (key in req.body.headers) {
        var header = req.body.headers[key];
        httpReq.setHeader(header.key, header.value);
    }
    // console.log(JSON.stringify(requestBody.body));

    httpReq.write(req.body.body);
    httpReq.end();
    console.log(req.body);

    // console.log(httpReq);

};