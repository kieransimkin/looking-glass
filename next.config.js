/** @type {import('next').NextConfig} */
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const {join} = require('path');
const {access, symlink} = require('fs/promises')

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  //output:'standalone',
  webpack: function (config, options) {
    /*
    config.rules= [
      // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
      { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },

      // addition - add source-map support
      { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" }
    ]
    */
    config.resolve.fallback = { fs: false, path: false };
    config.experiments = { asyncWebAssembly: true, layers: true };
		return config;
	},
  experimental: {
    forceSwcTransforms: true,
  }
}
module.exports = nextConfig
