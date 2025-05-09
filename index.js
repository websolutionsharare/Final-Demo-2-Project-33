const { exec } = require("child_process");

// Function to start the CI/CD pipeline
function startPipeline() {
   console.log("Starting CI/CD pipeline...");

   exec("npm run build", (error, stdout, stderr) => {
      if (error) {
         console.error(`Build failed: ${error.message}`);
         return;
      }
      if (stderr) {
         console.error(`Build stderr: ${stderr}`);
         return;
      }
      console.log(`Build output: ${stdout}`);

      // Example: Run tests after build
      exec("npm test", (testError, testStdout, testStderr) => {
         if (testError) {
            console.error(`Tests failed: ${testError.message}`);
            return;
         }
         if (testStderr) {
            console.error(`Test stderr: ${testStderr}`);
            return;
         }
         console.log(`Test output: ${testStdout}`);

         // Example: Deploy after tests pass
         exec("npm run deploy", (deployError, deployStdout, deployStderr) => {
            if (deployError) {
               console.error(`Deployment failed: ${deployError.message}`);
               return;
            }
            if (deployStderr) {
               console.error(`Deployment stderr: ${deployStderr}`);
               return;
            }
            console.log(`Deployment output: ${deployStdout}`);
            console.log("CI/CD pipeline completed successfully!");
         });
      });
   });
}

// Start the pipeline
startPipeline();
