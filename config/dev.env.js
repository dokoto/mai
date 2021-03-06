'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: '"http://localhost:9000/api/v1"',
  MAPS_KEY: '"AIzaSyBT9R-F54ncHBqzM0LVxOCrpwdsXSZE9LM"',
  MAPS_GEOLOCAL_KEY: '"AIzaSyBnnYz5MN9EkxI-lmKNLE1GvxkqvrxPDvQ"',
  MASTER_API_KEY: '"W0sgNBbwsfoUfe5GXNQY36p1IOHA96Gb"'
})
