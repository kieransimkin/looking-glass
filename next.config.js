/** @type {import('next').NextConfig} */
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withTM = require('next-transpile-modules')(['three'])
const {join, resolve} = require('path');
const {access, symlink} = require('fs/promises')

const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  env: { 
    'SOCKET_PORT':process.env.SOCKET_PORT
  },
  /**
   * @description Defines a rewrite rule that matches any URL pattern (`/:path*`) and
   * maps it to itself, essentially doing nothing with the requested URL. This no-op
   * rewrite is used to trigger checking all pages and static files before attempting
   * proxying.
   *
   * @returns {object[]} An array containing an object with two properties: `source`
   * and `destination`.
   */
  rewrites: () => { return[
    
      // we need to define a no-op rewrite to trigger checking
      // all pages/static files before we attempt proxying
      {
        source: '/:path*',
        destination: '/:path*',
      }
    ];},
  //output:'standalone',
  /**
   * @description Sets configuration options for the Webpack compiler. It enables
   * experimental features, disables built-in module resolutions, and filters warnings
   * from a serialization library by ignoring those related to "emurgo". The modified
   * configuration is then returned.
   *
   * @param {object} config - Used to configure Webpack.
   *
   * @param {object} options - Unused.
   *
   * @returns {object} A configuration for the Webpack module bundler.
   */
  webpack: function (config, options) {
    
		config.experiments = { layers: true,topLevelAwait: true };
    config.resolve.fallback = { fs: false, path: false, dns: false, net: false, tls: false };

    // Trying to hide annoying warnings from serialization lib, none of this works, but leaving it here so I know what I've tried:
    config.stats={};
    config.stats.warningsFilter =[/emurgo/i]
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /emurgo/
      })
    );

		return config;
	},
}
/**
 * @description Modifies a Webpack configuration object to support WebAssembly modules
 * by enabling experiments, configuring module rules, and setting output file names
 * for WASM files on server-side and client-side builds.
 *
 * @param {object} config - Used to store configuration settings for Webpack.
 *
 * @param {boolean} isServer - Used to determine whether it's a server-side or
 * client-side environment.
 */
function patchWasmModuleImport(config, isServer) {
  config.experiments = Object.assign(config.experiments || {}, {
    asyncWebAssembly: true,
    topLevelAwait: true
  });
  config.module.defaultRules = [
    {
      type: 'javascript/auto',
      resolve: { modules: ['node_modules']},
    },
    {
      test: /\.json$/i,
      type: 'json',
    },
  ];
  config.optimization.moduleIds = 'named';

  config.module.rules.push({
    test: /\.wasm$/,
    type: 'asset/resource',
  });

  // TODO: improve this function -> track https://github.com/vercel/next.js/issues/25852
  if (isServer) {
    config.output.webassemblyModuleFilename = './../static/wasm/[modulehash].wasm';
  } else {
    config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';
  }
}
module.exports = withTM(nextConfig)


