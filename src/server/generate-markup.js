import React from 'react';
import { RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import config from '../config';
import store from '../flux/store';

export default renderProps => (
  <html>
    <head>
      <title>
        { config.TITLE }
      </title>

      <meta charSet='utf-8' />

      <meta
        name={ config.TITLE }
        content={ config.DESCRIPTION }
      />

      <meta
        name='viewport'
        content='width=device-width, minimum-scale=1.0'
      />

      { process.env.NODE_ENV === 'production' && (
        <link rel='stylesheet' type='text/css' href={ `${config.FILES.PUBLIC_PATH}${config.FILES.STYLE_BUNDLE}` } />
      ) }

      <link href='https://fonts.googleapis.com/css?family=Noto+Sans' rel='stylesheet' />
    </head>

    <body>
      <div
        id={ `${config.MOUNTING_POINT}` }
        dangerouslySetInnerHTML={ { __html: renderToString(
          <Provider store={ store }>
            <RouterContext { ...renderProps } />
          </Provider>
        ) } }
      />

      <script dangerouslySetInnerHTML={ { __html: `
        console.info('Server-side rendered.')
      ` } } />
      <script src={ `/public/vendor.js` } />
      <script src={ `/public/hmr.js` } />
      <script src={ `/public/main.js` } />
    </body>
  </html>
);
