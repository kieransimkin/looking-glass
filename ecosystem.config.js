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
      instances: "max",
      args: "start",
      "exec_mode": "cluster",
      name: 'clg',
      env: getEnvVariables()
		},
	],
}