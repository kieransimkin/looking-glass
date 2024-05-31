const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
/**
 * @description Takes a relative path as input and returns its absolute path by joining
 * the current directory with the relative path using the `path.join()` method.
 * 
 * @param { string } relativePath - path of a file or directory relative to the current
 * working directory.
 * 
 * @returns { string } a resolved absolute file path based on the provided relative
 * path.
 */
function calcPath(relativePath) {
    return path.join(__dirname, relativePath);
  }
  
  // this function will parce `.env` file but not set them to `process.env`
  /**
   * @description Parses a dotenv file and checks if required environment variables are
   * set. If any are missing, it throws an error message. It returns the parsed configuration.
   * 
   * @returns { object } an object containing the values of the required environment variables.
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
      instances: "max",
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