var crypto = require('crypto');

module.exports = function(requestHmac, body, secret) {
  var generatedHmac = crypto.createHmac('sha1', secret).update(new Buffer(JSON.stringify(body), 'utf-8')).digest('hex');
  return generatedHmac === requestHmac;
};
