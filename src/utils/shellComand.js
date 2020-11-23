
const exec = (cmd) => new Promise((resolve, reject) => {

  const exec = require('child_process').exec;
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      reject(new Error(error));
    }
    resolve(stdout ? stdout : stderr);
  });
}, []);

module.exports = { exec };