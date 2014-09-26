var express = require('express'),
    bodyParser = require('body-parser'),
    deploy = require('./deploy'),
    validate = require('./validate'),
    app = express();

app.use(bodyParser.json());

// routes
app.post('/deploy/:site', validate, deploy, respond);

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status ? err.status : 500);
  res.send(err.message);
})

function respond(req, res, next) {
  res.status = 200;
  res.send(req.deployResponse);
}

var server = app.listen(9301, function() {
  console.log('Listening on port %d', server.address().port);
});
