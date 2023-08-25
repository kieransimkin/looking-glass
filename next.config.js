/** @type {import('next').NextConfig} */
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const webpack = require('webpack');
const path = require('path')
const {access, symlink} = require('fs/promises')

const nextConfig = {
  reactStrictMode: false,
  //output:'standalone',
  webpack: function (config,  { env, paths, isServer }) {
    
    if (isServer) {
      config.output.webassemblyModuleFilename = './../../static/wasm/[modulehash].wasm';
  } else {
      config.output.webassemblyModuleFilename = './static/wasm/[modulehash].wasm';
  }
  //const paths = config.paths;
  //config.output.path = path.resolve('build');
  //config.entry= './build/pages/index.js'
  config.plugins.push( 
    new webpack.LoaderOptionsPlugin({
        test: /\.wasm$/,
        options: { 
            
            type: 'webassembly/async',
        }
    }))
    
    config.plugins.push( 
      new webpack.LoaderOptionsPlugin({
          options: {
              rules: [
      // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
      { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
      { test: /\.(t|j)s?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
      { test: /\.json?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },

      // addition - add source-map support
      { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" }
              ]
          }
      
      }));
    
    config.resolve.fallback = { fs: false, path: false };
    config.experiments = { asyncWebAssembly: true, layers: true, syncWebAssembly: true };
    config.entry= "pages/index.js";
		return config;
	},
  experimental: {
    forceSwcTransforms: false,
  }
}
module.exports = nextConfig
