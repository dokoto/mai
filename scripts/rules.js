const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const eslintFormatter = require('eslint-friendly-formatter');
const defaults = require('./defaults');

function devRules() {
  return [
    {
      test: /\.(js)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          css: 'vue-style-loader!css-loader',
          scss: 'vue-style-loader!css-loader!sass-loader',
          sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
        },
      },
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [defaults.paths.source],
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
    },
    {
      test: /.*\.(woff2?|eot|ttf|otf)$/i,
      use: 'file-loader?hash=sha512&digest=hex&name=./assets/[hash].[ext]',
    },
    {
      test: /.*\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
      use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
    },
    {
      test: /\.css$/,
      use: ['style-loader?sourceMap', 'css-loader?sourceMap'],
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        'style-loader?sourceMap',
        'css-loader?sourceMap',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            plugins: () => {
              return [autoprefixer];
            },
          },
        },
        'sass-loader?sourceMap',
      ],
    },
  ];
}

function prodRules() {
  return [
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [defaults.paths.source],
      options: {
        formatter: eslintFormatter,
        emitWarning: true,
        fix: true,
        configFile: path.join(__dirname, '../.eslintrc.js'),
      },
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          css: ExtractTextPlugin.extract({
            use: [{ loader: 'css-loader', options: { sourceMap: true } }],
            fallback: 'vue-style-loader',
          }),
          postcss: ExtractTextPlugin.extract({
            use: [{ loader: 'css-loader', options: { sourceMap: true } }],
            fallback: 'vue-style-loader',
          }),
          sass: ExtractTextPlugin.extract({
            use: [
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'sass-loader', options: { indentedSyntax: true, sourceMap: true } },
            ],
            fallback: 'vue-style-loader',
          }),
          scss: ExtractTextPlugin.extract({
            use: [
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'sass-loader', options: { sourceMap: true } },
            ],
            fallback: 'vue-style-loader',
          }),
        },
        cssSourceMap: true,
        cacheBusting: true,
        transformToRequire: {
          video: ['src', 'poster'],
          source: 'src',
          img: 'src',
          image: 'xlink:href',
        },
      },
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [defaults.paths.source],
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'static/img/[name].[hash:7].[ext]',
      },
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'static/media/[name].[hash:7].[ext]',
      },
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'static/fonts/[name].[hash:7].[ext]',
      },
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        use: [
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
        fallback: 'vue-style-loader',
      }),
    },
    {
      test: /\.postcss$/,
      loader: ExtractTextPlugin.extract({
        use: [
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
        fallback: 'vue-style-loader',
      }),
    },
    {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract({
        use: [
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { indentedSyntax: true, sourceMap: true } },
        ],
        fallback: 'vue-style-loader',
      }),
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        use: [
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
        ],
        fallback: 'vue-style-loader',
      }),
    },
  ];
}

function rules(env) {
  return env === defaults.env.dev ? devRules() : prodRules();
}

module.exports = rules;
