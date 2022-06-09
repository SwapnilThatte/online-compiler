const { exec } = require("child_process");
const path = require("path");

const executeC = filepath => {

  const jobId = path.basename(filepath).split(".")[0];
  return new Promise((resolve, reject) => {
    // Pipelining the commands to execute C file
    exec(
      `cd ${__dirname}/code & g++ -o ${jobId} ${jobId}.c & ${jobId}.exe` ,
      (error, stdout, stderr) => {
        //Returning the error as JSON object while rejecting the promise
        error && reject({'error': error, 'stderr': stderr });
        stderr && reject(stderr);
        // Returning the output as JSON object
        resolve({'stdout':stdout, 'error':error})
      }
    );
  });
};

module.exports = {
  executeC
};