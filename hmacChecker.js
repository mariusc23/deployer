var crypto = require('crypto');

module.exports = function(requestHmac, body, secret) {
  var generatedHmac = crypto.createHmac('sha1', secret).update(body.toString()).digest('hex');
  return generatedHmac === requestHmac;
};
