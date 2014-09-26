var crypto = require('crypto');

module.exports = function(requestHmac, body, secret) {
  var generatedHmac = crypto.createHmac('sha1', secret).update(JSON.stringify(body)).digest('hex');
  return generatedHmac === requestHmac;
};
