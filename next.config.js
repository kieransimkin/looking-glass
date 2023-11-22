/** @type {import('next').NextConfig} */
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withTM = require('next-transpile-modules')(['three'])
const {join} = require('path');
const {access, symlink} = require('fs/promises')
const CopyPlugin = require("copy-webpack-plugin");
const nextConfig = {
  reactStrictMode: false,
  swcMinify:false,
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
  webpack: function (config, options) {
    
		config.experiments = { asyncWebAssembly: true, syncWebAssembly: true, layers: true,topLevelAwait: true };
    config.resolve.fallback = { fs: false, path: false, dns: false, net: false, tls: false };
/*
    if (!options.dev && options.isServer) { 
  config.optimization.moduleIds = 'named';
	    /*
	    for (var c of config.module.rules) { 
		c.exclude=[/\.wasm$/];
	    }	
      config.output.webassemblyModuleFilename = './../static/wasm/[modulehash].wasm';
	//config.plugins.push(new WasmChunksFixPlugin());
	    //
    }
	console.log(config.module.rules);
	  console.log(config.output)
    // Trying to hide annoying warnings from serialization lib, none of this works, but leaving it here so I know what I've tried:
   //*/ 
	  /*
	  config.plugins.push( new CopyPlugin({
          patterns: [
              { from: "node_modules/@emurgo/cardano-serialization-lib-nodejs/cardano_serialization_lib_bg.wasm",
                to: ".next/chunks/cardano_serialization_lib_bg.wasm" },
          ],
      }))
      */
      patchWasmModuleImport(config, options.isServer);
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
config.module.defaultRules = [ {
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
	  type: 'asset/resource'
  });

  // TODO: improve this function -> track https://github.com/vercel/next.js/issues/25852
  if (isServer) {
      config.output.webassemblyModuleFilename = './../static/wasm/[modulehash].wasm';
  } else {
      config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';
  }
}
class WasmChunksFixPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("WasmChunksFixPlugin", (compilation) => {
      compilation.hooks.processAssets.tap(
        { name: "WasmChunksFixPlugin" },
        (assets) =>
          Object.entries(assets).forEach(([pathname, source]) => {
            if (!pathname.match(/\.wasm$/)) return;
            compilation.deleteAsset(pathname);

            const name = pathname.split("/")[1];
            const info = compilation.assetsInfo.get(pathname);
            compilation.emitAsset(name, source, info);
          })
      );
    });
  }
}
module.exports = withTM(nextConfig)

