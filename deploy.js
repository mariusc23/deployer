var exec = require('child_process').exec;

module.exports = function (req, res, next) {
  var shellCommand = 'sh ' + __dirname + '/scripts/' + req.params.site + '.sh';

  // Determine mode
  var condition;

  if (req.query.mode === 'master') {
    condition = req.body.ref == 'refs/heads/master';
  } else {
    condition = req.body.ref.indexOf('refs/tags') >= 0;
  };

  // Start deployment process
  if (condition) {
    console.log('Beginning deploy script: ', shellCommand);

    // Execute our shell script
    exec(shellCommand,
      function (error, stdout, stderr) {
        console.log(stdout); // feedback

        if (stderr) console.log('stderr: ' + stderr); // oh noes

        if (error) {
          error.status = 500;
          return next(error);
        } else {
          req.deployResponse = stdout;
        };

        console.log('Deploy script complete.')

        return next();
      });
  } else {
    req.deployResponse = 'Nothing to do here.';
    return next();
  }
};
