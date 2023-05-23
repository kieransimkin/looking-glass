/** @type {import('next').NextConfig} */
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack5: false,
  future: { 
    webpack5: false
  },
  webpack: function (config, options) {
		config.experiments = { asyncWebAssembly: false, syncWebAssembly: false, layers: true,topLevelAwait: true };
    config.resolve.fallback = { fs: false, path: false };

    // Trying to hide annoying warnings from serialization lib, none of this works, but leaving it here so I know what I've tried:
    config.stats={};
    config.stats.warningsFilter =[/emurgo/i]
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /emurgo/
      })
    );

  // Important: return the modified config
    //return newconfig
		return config;
	},
}

module.exports = nextConfig
