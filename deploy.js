var exec = require('child_process').exec;

module.exports = function (req, res, next) {
  var shellCommand = 'sh ' + __dirname + '/scripts/' + req.params.site + '.sh';

  // Determine mode
  var condition;

  if (req.query.mode === 'master') {
    condition = req.body.ref == 'refs/heads/master';
  } else if (req.query.mode === 'branch' && req.query.branch.length > 0) {
    condition = req.body.ref == 'refs/heads/' + req.query.branch;
  } else if (req.query.mode === 'circle') {
    condition = req.body.payload.status === 'success' || req.body.payload.status === 'fixed';
  } else { // tags
    condition = req.body.ref.indexOf('refs/tags') >= 0;
  };

  // Start deployment process
  if (condition) {
    console.info('Beginning deploy script: ', shellCommand);

    // Execute our shell script
    exec(shellCommand,
      function (error, stdout, stderr) {
        console.info(stdout); // feedback

        if (stderr) console.info('stderr: ' + stderr); // oh noes

        if (error) {
          error.status = 500;
          return next(error);
        } else {
          req.deployResponse = stdout;
        };

        console.info('Deploy script complete.')

        return next();
      });
  } else {
    req.deployResponse = 'Nothing to do here.';
    return next();
  }
};
