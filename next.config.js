/** @type {import('next').NextConfig} */
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const webpack = require('webpack');
const path = require('path')
const {access, symlink} = require('fs/promises');
const configOverrides = require('./config-overrides');
var {WebpackManifestPlugin }= require('webpack-manifest-plugin');
const nextConfig = {
  reactStrictMode: false,
  distDir:'./build/',
  basePath:'/foo',
  swcMinify: true,
  generateBuildId: async () => {
    // Return custom build ID, like the latest git commit hash
    return 'my-build-id'
  },
  //output:'standalone',
  webpack: function (config,  { env, paths, isServer }) {
    config.optimization.moduleIds = 'named';  
    config.name="foo"
    config.context=path.resolve(__dirname, './build');
    config.output={
      path: path.resolve(__dirname, './build/'),
      filename: '[name].[hash:8].js',
      sourceMapFilename: '[name].[hash:8].map',
      chunkFilename: '[id].[hash:8].js'
    }
    if (isServer) {
      config.output.webassemblyModuleFilename = './../../static/wasm/[modulehash].wasm';
  } else {
      config.output.webassemblyModuleFilename = './static/wasm/[modulehash].wasm';
  }
  //const paths = config.paths;
  //config.output.path = path.resolve('build');
  const aliases = {'node_modules': path.resolve(__dirname, './node_modules'),'./node_modules': path.resolve(__dirname, './node_modules')};
  aliases[path.resolve(__dirname,'./build/server')]=path.resolve(__dirname, './build');
  
  config.plugins.push(
  new WebpackManifestPlugin ({
    basePath: path.resolve(__dirname, './build'),
    publicPath: '/assets/',appDirEnabled: false
  }));
  config.plugins.push( 
  
    new webpack.LoaderOptionsPlugin({
        options: {
          resolve: { 
            'fallback':{fs: false, path: false},
            'symlinks':true,
            "alias":aliases
          },
          basePath:'/foo',
          //context: path.resolve(__dirname, './build/'), 
          name:"foo",
          output:{
            webassemblyModuleFilename: config.output.webassemblyModuleFilename,
            path:path.resolve(__dirname, './build/'),
            filename: '[name].[hash:8].js',
            sourceMapFilename: '[name].[hash:8].map',
            chunkFilename: '[id].[hash:8].js'
          },
            experiments: { 
            asyncWebAssembly: true, syncWebAssembly: true, layers: true,topLevelAwait: true }}}));

//config.entry= "pages/index.js";

config.plugins.push(new webpack.IgnorePlugin({
  resourceRegExp: /^pg$|^cloudflare:sockets$/,
}))
  //config.entry= 'pages/index.js'
  config.plugins.push( 
    new webpack.LoaderOptionsPlugin({
        test: /\.wasm$/,
        options: { 
            
            type: 'webassembly/async',
        }
    }))
    /*
    config.plugins.push( 
      new webpack.LoaderOptionsPlugin({
          options: {
              rules: [
      // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
      { test: /\.(t|j)sx?$/, use: { loader: 'next-swc-loader',  options: {
        configFile: "tsconfig.json"
    } }, exclude: /node_modules/ },
      { test: /\.(t|j)s?$/, use: { loader: 'next-swc-loader',  options: {
        configFile: "tsconfig.json"
    } }, exclude: /node_modules/ },
      { test: /\.json?$/, use: { loader: 'next-swc-loader',  options: {
        configFile: "tsconfig.json"
    } }, exclude: /node_modules/ },

      // addition - add source-map support
      
      
              ]
          }
      
      }));
    //*/
    
    config.resolve.fallback = { fs: false, path: false };
    config.resolve.symlinks = true
    const old = path.resolve(__dirname, './build/server')
    config.resolve.alias={...config.resolve.alias, 
      'node_modules': path.resolve(__dirname, './node_modules'),
      './node_modules': path.resolve(__dirname, './node_modules')}
      config.resolve.alias[old]=path.resolve(__dirname,'./build');
    config.context = path.resolve(__dirname, './build')
    config.experiments = { asyncWebAssembly: true,  layers: true,topLevelAwait: true,syncWebAssembly: true };
    //config.entry= "pages/index.js";
    console.log(config);
		return config;
	},
  experimental: { 
      typedRoutes: false,
      // scrollRestoration: true,
    
    forceSwcTransforms: false,
  }
}

module.exports = nextConfig
