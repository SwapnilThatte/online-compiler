const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJS = filepath => {
  const jobId = path.basename(filepath).split(".")[0];

  return new Promise((resolve, reject) => {
    exec(
      // Pipelining the commands to execute javascript file
      `cd ${__dirname}/code & node ${jobId}.js` ,
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
  executeJS,
};