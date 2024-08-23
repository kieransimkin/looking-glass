const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
function calcPath(relativePath) {
    return path.join(__dirname, relativePath);
  }
  
  // this function will parce `.env` file but not set them to `process.env`
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