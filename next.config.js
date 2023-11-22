/** @type {import('next').NextConfig} */
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withTM = require('next-transpile-modules')(['three'])
const {join} = require('path');
const {access, symlink} = require('fs/promises')

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: { 
    'SOCKET_PORT':process.env.SOCKET_PORT
  },
  rewrites: () => { return[
    
      // we need to define a no-op rewrite to trigger checking
      // all pages/static files before we attempt proxying
      {
        source: '/:path*',
        destination: '/:path*',
      }
    ];},
  //output:'standalone',
  webpack: function (config, options) {
    
		config.experiments = { asyncWebAssembly: true, syncWebAssembly: true, layers: true,topLevelAwait: true };
    config.resolve.fallback = { fs: false, path: false, dns: false, net: false, tls: false };

    patchWasmModuleImport(config, options.isServer);
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
function patchWasmModuleImport(config, isServer) {
  config.experiments = Object.assign(config.experiments || {}, {
    asyncWebAssembly: true,
  });
  config.module.defaultRules = [
    {
      type: 'javascript/auto',
      resolve: {},
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

