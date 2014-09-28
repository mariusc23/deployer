var checkHmac = require('./hmacChecker'),
    fs = require('fs');

module.exports = function (req, res, next) {
  if (!req.headers['x-hub-signature'] || !req.headers['x-hub-signature'].length >= 5) {
    var err = new Error('You must include x-hub-signature header. See github docs.');
    err.status = 401;
    return next(err);
  };

  if (!process.env[req.params.site.toUpperCase() + '_KEY']) {
    var err = new Error('I do not have a secret for this site.');
    err.status = 404;
    return next(err);
  };

  var requestHmac = req.headers['x-hub-signature'].substring(5),
      secret = process.env[req.params.site.toUpperCase() + '_KEY'];

  if (!checkHmac(requestHmac, req.body, secret)) {
    var err = new Error('HMAC Failed!');
    err.status = 403;
    return next(err);
  }

  if (!fs.existsSync(__dirname + '/scripts/' + req.params.site + '.sh')) {
    var err = new Error('I do not have a deploy script for this site.');
    err.status = 404;
    return next(err);
  };

  next();
};
