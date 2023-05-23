/** @type {import('next').NextConfig} */
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const {join} = require('path');
const {access, symlink} = require('fs/promises')
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: function (config, options) {
    
		config.experiments = { asyncWebAssembly: true, syncWebAssembly: true, layers: true,topLevelAwait: true };
    config.resolve.fallback = { fs: false, path: false };

    patchWasmModuleImport(config, options.isServer);
    // Trying to hide annoying warnings from serialization lib, none of this works, but leaving it here so I know what I've tried:
    config.stats={};
    config.stats.warningsFilter =[/emurgo/i]
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /emurgo/
      })
    );

    // There is some weird bug with dynamic wasm imports (again, triggered by serialization lib), this workaround is from github:
    // https://github.com/vercel/next.js/issues/25852
    /*
    config.plugins.push(
      new (class {
        apply(compiler) {
          compiler.hooks.afterEmit.tapPromise(
            'SymlinkWebpackPlugin',
            async (compiler) => {
              if (isServer) {
                const from = join(compiler.options.output.path, '../static');
                const to = join(compiler.options.output.path, 'static');
                
                try {
                  await access(from);
                  console.log(`${from} already exists`);
                  return;
                } catch (error) {
                  if (error.code === 'ENOENT') {
                    // No link exists
                  } else {
                    throw error;
                  }
                }
    
                
                await symlink(to, from, 'junction');
                console.log(`created symlink ${from} -> ${to}`);
              }
            },
          );
        }
      })(),
    );
    */
  // Important: return the modified config
    //return newconfig
		return config;
	},
}
function patchWasmModuleImport(config, isServer) {
  config.experiments = Object.assign(config.experiments || {}, {
      asyncWebAssembly: true,
  });

  config.optimization.moduleIds = 'named';

  config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
  });

  // TODO: improve this function -> track https://github.com/vercel/next.js/issues/25852
  if (isServer) {
      config.output.webassemblyModuleFilename = './../static/wasm/[modulehash].wasm';
  } else {
      config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';
  }
}
module.exports = nextConfig
