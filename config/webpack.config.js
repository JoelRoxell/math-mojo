import path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import poststylus from 'poststylus';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import config from './config';
import banner from './banner';

const webpackConfig = {
  module: {},
  name: 'client',
  target: 'web',
  devtool: 'source-map',
  resolve: {
    root: config.base_path,
    alias: {
      components: `${config.dir_src}/components`,
      containers: `${config.dir_src}/containers`,
      config: `${config.dir_src}/../config`,
      styles: `${config.dir_src}/styles`,
      services: `${config.dir_src}/services`,
      lang: `${config.dir_src}/lang`,
      flux: `${config.dir_src}/flux`,
      helpers: `${config.dir_src}/helpers`,
      routes: `${config.dir_src}/routes`
    },
    extensions: ['', '.js', '.jsx', '.json', '.styl'],
    modulesDirectories: ['node_modules', 'src']
  }
};

// Entry Points
webpackConfig.entry = [
  'webpack-hot-middleware/client?path=/__webpack_hmr',
  `${config.base_path}/${config.dir_src}/main.js`
];

// Bundle Output
webpackConfig.output = {
  path: path.join(config.base_path, 'build'),
  filename: 'bundle.js',
  publicPath: '/dist/',
  chunkFilename: '[id].js'
};

// Plugins
webpackConfig.plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html', // Load a custom template,
    hash: false,
    filename: 'index.html',
    inject: 'body', // Inject scripts into the body
    minify: {
      collapseWhitespace: false
    }
  }),
  new webpack.BannerPlugin(banner),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new ExtractTextPlugin('[name].css', {
    allChunks: true
  })
];

webpackConfig.eslint = {
  configFile: './.eslintrc',
  emitWarning: true
};

// Pre-Loaders
webpackConfig.module.preLoaders = [{
  test: /\.(js|jsx)$/,
  loader: 'eslint',
  exclude: /node_modules/
}];

webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  query: {
    cacheDirectory: '/tmp/',
    plugins: ['transform-runtime'],
    presets: ['es2015', 'react', 'stage-0'],
    env: {
      development: {
        plugins: [
          ['react-transform', {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            }, {
              transform: 'react-transform-catch-errors',
              imports: ['react', 'redbox-react']
            }]
          }]
        ]
      },
      production: {
        plugins: [
          'transform-react-remove-prop-types',
          'transform-react-constant-elements'
        ]
      }
    }
  }
},
{
  test: /\.json$/,
  loader: 'json-loader'
},
{
  test: /\.styl$/,
  exclude: /node_modules/,
  loader: 'style-loader!css-loader?camelCase&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!stylus-loader!prepend-style-loader?prepend=[src/styles/global/variables, src/styles/global/mixins]' //  eslint-disable-line
},
{
  test: /\.html$/,
  exclude: /node_modules/,
  loader: 'raw'
},
{
  test: /.(png|jpg|ttf|eot)$/,
  exclude: /node_modules/,
  loader: 'url-loader?limit=10000'
}];

// Define proccesses that should be run
webpackConfig.postcss = () => {
  return [precss, autoprefixer];
};

webpackConfig.stylus = {
  use: [
    poststylus(['autoprefixer'])
  ]
};

module.exports = webpackConfig;
