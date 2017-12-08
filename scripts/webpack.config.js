const plugins = require('./plugins');
const rules = require('./rules');
const config = require('./config');

const defaults = require('./defaults');

module.exports = function (env) {
  console.log(`Building for ${env.env}`);
  const webpackConfig = {    
    context: defaults.paths.source,
    entry: config.entries(env.env),
    output: config.output(),
    resolve: {
      extensions: config.extensions(),
      alias: config.alias(),
    },    
    module: {
      rules: rules(env.env),
    },
    node: config.node(),
    devtool: config.devTool(env.env),
    plugins: plugins(env),
  };
  if (env.env === 'dev') {
    webpackConfig.devServer = config.devServer(env.env);
  }
  return webpackConfig;
};
