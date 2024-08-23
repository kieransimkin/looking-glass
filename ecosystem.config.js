const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
/**
 * @description Concatenates the `__dirname`, which represents the directory name of
 * the current module, with a given `relativePath`. It returns a unified path that
 * is fully resolved to an absolute path.
 *
 * @param {string} relativePath - Used as a path reference.
 *
 * @returns {string} A resolved path resulting from joining the directory name of the
 * current module (`__dirname`) with the given relative path.
 */
function calcPath(relativePath) {
    return path.join(__dirname, relativePath);
  }
  
  // this function will parce `.env` file but not set them to `process.env`
  /**
   * @description Reads environment variables from a file named 'clg.env' located in a
   * path relative to the current directory, and checks if certain required environment
   * variables are set. If any of them is not set, it throws an error; otherwise, it
   * returns the loaded environment variables.
   *
   * @returns {object} An environment configuration parsed from a file specified by the
   * dotenv package, where each property represents an environment variable and its
   * corresponding value.
   */
  const getEnvVariables = () => {
    const envConfig = dotenv.parse(fs.readFileSync(calcPath('../clg.env')));
  
    const requiredEnvVariables = ['DATABASE_URI'];
  
    for (envVariable of requiredEnvVariables) {
      if (!envConfig[envVariable]) {
        throw new Error(`Environment variable "${envVariable}" is not set`);
      }
    }
  
    return envConfig;
  };
module.exports = {
	apps: [
		{
      script: 'node_modules/.bin/next',
      instances: "16",
      args: "start",
      "exec_mode": "cluster",
      name: 'clg',
      env: getEnvVariables()
		},
        {
            script:'bin/oura',
            instances:'1',
            args:'daemon --config oura.toml',
            name: 'oura'
        },
        {
            script:'npm run refreshWallet',
            instances:'1',
            args:'scripts/refreshWallet.mjs',
            name:'refreshWallet'
        },
        /*
        {
            script:'npm run precache',
            instances:'1',
            args:'scripts/precache.mjs',
            name:'precache'
        },
        //*/
        /*
        {
            script:'npm run runHits',
            instances:'1',
            args:'scripts/runHits.mjs',
            name:'runHits'
        },
        //*/
        /*
        {
            script:'npm run generateThumbnails',
            instances:'1',
            args:'scripts/generateThumbnails.mjs',
            name:'generateThumbnails'
        },
        //*/
        {
          script:'npm run socket',
          instances:'1',
          args:'scripts/socket.mjs',
          name:'socket',
          env: getEnvVariables()
        }
	],
}