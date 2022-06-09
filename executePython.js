const { exec } = require("child_process");
const path = require("path");

const executePython = filepath => {
  const jobId = path.basename(filepath).split(".")[0];
 return new Promise((resolve, reject) => {
 
    exec(
      // Pipelining the commands to execute python file
      `cd ${__dirname}/code & python ${jobId}.py` ,
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
  executePython
}