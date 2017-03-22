const path = require('path');
const webpack = require('webpack');

const config = {
  module: {},
  resolve: {
    extensions: [ '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json' ]
  },
  devtool: 'eval-cheap-module-source-map'
};

config.entry = {
  main: path.resolve('./src/client/index.js'),
  hmr: 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
};

config.output = {
  path: path.join(__dirname, 'public'),
  filename: '[name].js',
  chunkFilename: '[id].js',
  publicPath: '/public/'
};

config.resolve.alias = {
  routes: path.join(__dirname, 'src', 'routes'),
  components: path.join(__dirname, 'src', 'components'),
  utils: path.join(__dirname, 'src', 'utils'),
  server: path.join(__dirname, 'src', 'server'),
  flux: path.join(__dirname, 'src', 'flux')
};

config.module.rules = [
  {
    test: /.(jsx|js)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: [
            'transform-object-rest-spread',
            'transform-runtime',
            'syntax-dynamic-import',
            'transform-async-to-generator',
            'transform-regenerator',
            'transform-runtime'
          ],
          presets: [
            [ 'es2015', { 'modules': false } ],
            'react'
          ],
          env: {
            development: {
              plugins: [
                [ 'react-transform', {
                  transforms: [ {
                    transform: 'react-transform-hmr',
                    imports: [ 'react' ],
                    locals: [ 'module' ]
                  }, {
                    transform: 'react-transform-catch-errors',
                    imports: [ 'react', 'redbox-react' ]
                  } ]
                } ]
              ]
            }
          }
        }
      }
    ]
  },
  {
    test: /\.styl$/,
    use: [
      'style-loader',
      path.resolve('./css-module-flow-type-generator-loader.js'),
      {
        loader: 'css-loader',
        options: {
          modules: true,
          camelCase: true,
          localIdentName: '[name]__[local]___[hash:base64:5]'
        }
      },
      'postcss-loader',
      'stylus-loader',
      {
        loader: 'prepend-style-loader',
        options: {
          prepend: [
            path.resolve('./src/styles/global/variables'),
            path.resolve('./src/styles/global/mixins')
          ]
        }
      }
    ]
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      }
    ]
  }
];

config.plugins = [
  new webpack.HotModuleReplacementPlugin(), // enable HMR globally
  new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function(module) {
      // This assumes your vendor imports exist in the node_modules directory
      return module.context && module.context.indexOf('node_modules') !== -1;
    }
  })
];

module.exports = config;
