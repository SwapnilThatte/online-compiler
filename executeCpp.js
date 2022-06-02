const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
 // console.log(filepath);
  const jobId = path.basename(filepath).split(".")[0];
  //const outPath = path.join(outputPath, `${jobId}.py`);
  //console.log(outPath);

 //console.log(__dirname);
  return new Promise((resolve, reject) => {
    exec(
      `cd ${__dirname}/code & g++ -o ${jobId} ${jobId}.cpp & ${jobId}.exe` ,
      (error, stdout, stderr) => {
        error && reject({'error': error, 'stderr': stderr });
        console.log(`ERR: ${error}\nSTDERR: ${stderr}`);
        stderr && reject(stderr);
        resolve({'stdout':stdout, 'error':error})
      }
    );
  });
};

module.exports = {
  executeCpp,
};