const path = require('path');

module.exports = {
  title: 'M.A.I.',
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  env: {
    dev: 'dev',
    prod: 'prod',
  },
  api: {
    dev: {
      base: 'http://localhost:4000',
    },
    prod: {
      base: 'http://localhost:4000',
    },
  },
  paths: {
    source: path.resolve(__dirname, '../src'),
    build: path.resolve(__dirname, '../build'),
    root: path.resolve(__dirname, '../'),
    statics: path.resolve(__dirname, '../static'),
  },
  GOOGLE: {
    MAPS_KEY: 'AIzaSyBT9R-F54ncHBqzM0LVxOCrpwdsXSZE9LM',
    MAPS_GEOLOCAL_KEY: 'AIzaSyBnnYz5MN9EkxI-lmKNLE1GvxkqvrxPDvQ',
  },
};
