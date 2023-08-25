var HtmlWebpackPlugin = require('html-webpack-plugin');
var InlineChunkHtmlPlugin = require('inline-chunk-html-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
var path = require('path');
var minimist =require('minimist');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const webpack = require('webpack');
var argv = minimist(process.argv.slice(2));
const isTemplate = argv?.template ? true:false
function patchWasmModuleImport(config, isServer) {
  config.experiments = Object.assign(config.experiments || {}, {
      asyncWebAssembly: true,
  });

  config.optimization.moduleIds = 'named';
  /*
  config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
  });
  */
  config.resolve.fallback = { fs: false, path: false };
  config.experiments = { asyncWebAssembly: true, layers: true };
  // TODO: improve this function -> track https://github.com/vercel/next.js/issues/25852
  if (isServer) {
      config.output.webassemblyModuleFilename = './../static/wasm/[modulehash].wasm';
  } else {
      config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';
  }
}
module.exports = {
  reactStrictMode: false,
  swcMinify: true,
    webpack: {
      entry: "build/pages/index.js",
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[hash:8].js',
            sourceMapFilename: '[name].[hash:8].map',
            chunkFilename: '[id].[hash:8].js'
          },
          
        plugins: [],
      configure: (webpackConfig, { env, paths, isServer }) => {
        paths.appBuild = webpackConfig.output.path = path.resolve(isTemplate?'template':'build');
        webpackConfig.experiments = { asyncWebAssembly: true, syncWebAssembly: true, layers: true,topLevelAwait: true };
        webpackConfig.resolve.fallback = { fs: false, path: false };
        webpackConfig.resolve.symlinks = true;
    
        patchWasmModuleImport(webpackConfig, isServer);
        // Trying to hide annoying warnings from serialization lib, none of this works, but leaving it here so I know what I've tried:
        webpackConfig.stats={};
        webpackConfig.stats.warningsFilter =[/emurgo/i]
        webpackConfig.plugins.push(
          new FilterWarningsPlugin({
            exclude: /emurgo/
          })
        );
        /*
        webpackConfig.rules= [
          // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
          { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
          { test: /\.(t|j)s?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
          { test: /\.json?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
    
          // addition - add source-map support
          { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" }
        ]
        */
        return webpackConfig;
      },
    },
  };