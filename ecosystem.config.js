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
      cron_restart: '0 0 * * *',
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
        /*
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
            name:'generateThumbnails',
            env: getEnvVariables()
        },
        
        {
          script:'npm run aiDesignateTitles',
          instances:'1',
          args:'scripts/aiDesignateTitles.mjs',
          name:'aiDesignateTitles',
          env: getEnvVariables()
      },
      
      {
        script:'npm run aiDescribePolicies',
        instances:'1',
        args:'scripts/aiDescribePolicies.mjs',
        name:'aiDescribePolicies',
        env: getEnvVariables()
    },
      //*/
        {
          script:'npm run queryAdaHandles',
          instances:'1',
          args:'scripts/queryAdaHandles.mjs',
          name:'queryAdaHandles',
          env: getEnvVariables()
      },
      {
        script:'npm run queryTokenHolders',
        instances:'1',
        args:'scripts/queryTokenHolders.mjs',
        name:'queryTokenHolders',
        env: getEnvVariables()
    },
    {
      script:'npm run queryPolicyProfile',
      instances:'1',
      args:'scripts/queryPolicyProfile.mjs',
      name:'queryPolicyProfile',
      env: getEnvVariables()
  },
    
        {
          script:'npm run socket',
          instances:'1',
          args:'scripts/socket.mjs',
          name:'socket',
          env: getEnvVariables()
        }
	],
}