const prependStyleLoader = require('prepend-style-loader');
const hook = require('css-modules-require-hook');
const debug = require('debug');
const info = debug('lilith::require');

const stylus = require('stylus');
const path = require('path');

hook({
  extensions: [ '.styl' ],
  rootDir: path.join(__dirname, '..', '..'),
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  camelCase: true,
  preprocessCss: function(css, filename) {
    const variables = path.resolve(__dirname, '../styles/global/variables');
    const mixins = path.resolve(__dirname, '../styles/global/mixins');

    css = prependStyleLoader.apply({
      // TODO: get from config
      query: `?prepend[]=${variables}&prepend[]=${mixins}`,
      cacheable: function() {}
    }, [ css ]);

    return stylus(css)
      .set('filename', filename)
      .render();
  }
});

info('done');

const startServer = require('./server').default;

// Initiate server.
startServer(process.env.PORT || 3000);
