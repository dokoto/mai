require('babel-core/register')
const path = require('path');
const dotenv = require('dotenv-safe');

dotenv.load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example')
});
exports = module.exports = require('./appointment/index.js')
