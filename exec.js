const { exec } = require('child_process');

module.exports = (bin, params) => new Promise((resolve, reject) => {
  const command = `${bin} ${params.join(' ')}`;
  console.log('$', command);

  exec(command, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log({ stderr });
      return reject(err);
    }
    // the *entire* stdout and stderr (buffered)
    // console.log({ stdout });
    resolve(stdout);
  });
});