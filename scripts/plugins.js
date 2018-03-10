const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

const defaults = require('./defaults');

function devPlugins(env) {
  return [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash].js',
      minChunks(module) {
        const { context } = module;
        return context && context.indexOf('node_modules') >= 0;
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: path.join(defaults.paths.source, 'index.html'),
      path: defaults.paths.build,
      filename: 'index.html',
      title: defaults.title,
    }),
    new webpack.EnvironmentPlugin({
      VERSION: env.version,
      API: defaults.api[env.env],
      PLATFORM: env.platform,
      ENV: env.env,
      MAPS_KEY: defaults.GOOGLE.MAPS_KEY,
      MAPS_GEOLOCAL_KEY: defaults.GOOGLE.MAPS_GEOLOCAL_KEY,
    }),
  ];
}

function prodPlugins(env) {
  return [
    new CleanWebpackPlugin([path.join(defaults.paths.build, '*.*')], {
      root: defaults.paths.root,
      verbose: true,
      dry: false,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' },
    }),
    new webpack.EnvironmentPlugin({
      VERSION: env.version,
      API: defaults.api[env.env],
      PLATFORM: env.platform,
      ENV: env.env,
      MAPS_KEY: defaults.GOOGLE.MAPS_KEY,
      MAPS_GEOLOCAL_KEY: defaults.GOOGLE.MAPS_GEOLOCAL_KEY,
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
      sourceMap: true,
      parallel: true,
    }),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash].css',
      allChunks: false,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true, map: { inline: false } },
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      excludeChunks: [],
      filename: path.join(defaults.paths.build, 'index.html'),
      title: defaults.title,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseInlineTagWhitespace: true,
        removeRedundantAttributes: true,
      },
      chunksSortMode: 'dependency',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
        );
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3,
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: defaults.paths.statics,
        to: 'static',
        ignore: ['.*'],
      },
    ]),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ];
}

function plugins(env) {
  return env.env === defaults.env.dev ? devPlugins(env) : prodPlugins(env);
}

module.exports = plugins;
