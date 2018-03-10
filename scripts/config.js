const defaults = require('./defaults');

function prodEntries() {
  return ['babel-polyfill', './index.js'];
}

function devEntries() {
  return [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index.js',
  ];
}

function entries(env) {
  return env === defaults.env.prod ? prodEntries() : devEntries();
}

function devServer(env) {
  return {
    contentBase: env === defaults.env.prod ? '../build' : '../app',
    historyApiFallback: true,
    port: defaults.devServer.port,
    compress: env === defaults.env.prod,
    inline: env === defaults.env.dev,
    host: defaults.devServer.host,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  };
}

function extensions() {
  return ['.js', '.vue', '.json'];
}

function modules() {
  return ['node_modules', defaults.paths.source];
}

function output() {
  return {
    path: defaults.paths.build,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
  };
}

function devTool(env) {
  return env === defaults.env.prod ? '#source-map' : 'source-map';
}

function alias() {
  return {
    vue$: 'vue/dist/vue.esm.js',
    '@': defaults.paths.source,
  };
}

function node() {
  return {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  };
}

module.exports = {
  entries,
  alias,
  node,
  devServer,
  extensions,
  modules,
  output,
  devTool,
};
