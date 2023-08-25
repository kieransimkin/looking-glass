
const webpack = require('webpack');
const path = require('path')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
var argv = process.argv.slice(2);
const isTemplate = argv?.template ? true:false
/**
 * @param {boolean} isServer
 * @param {import("webpack").Configuration} config
 */
function patchWasmModuleImport(config,isServer) {


  // TODO: cleanup -> track https://github.com/vercel/next.js/issues/25852
  /*
  if (isServer) {
    config.output.webassemblyModuleFilename =
      './../static/wasm/[modulehash].wasm';
  } else {
    config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';
  }*/

}
module.exports = function override(webpackConfig, env) {
    //do stuff with the webpack config...
    const paths = webpackConfig.paths;
    //paths?.appBuild = webpackConfig.output.path = path.resolve(isTemplate?'template':'build');
    webpackConfig.plugins.push( 
        new webpack.LoaderOptionsPlugin({
            options: {
                experiments: { 
                asyncWebAssembly: true, syncWebAssembly: true, layers: true,topLevelAwait: true }}}));
    
    webpackConfig.entry= "dist/pages/index.js";

    patchWasmModuleImport(webpackConfig,false);
    // Trying to hide annoying warnings from serialization lib, none of this works, but leaving it here so I know what I've tried:
    webpackConfig.stats={};
    webpackConfig.stats.warningsFilter =[/emurgo/i]
    webpackConfig.plugins.push( 
        new webpack.LoaderOptionsPlugin({
            test: /\.wasm$/,
            options: { 
                
                type: 'webassembly/async',
            }
        }))
    webpackConfig.plugins.push(
      new FilterWarningsPlugin({
        exclude: /emurgo/
      })
    );
    webpackConfig.plugins.push( 
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
    return webpackConfig;
  }