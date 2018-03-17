'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: '"http://localhost:4000"',
  MAPS_KEY: '"AIzaSyBT9R-F54ncHBqzM0LVxOCrpwdsXSZE9LM"',
  MAPS_GEOLOCAL_KEY: '"AIzaSyBnnYz5MN9EkxI-lmKNLE1GvxkqvrxPDvQ"',
})
