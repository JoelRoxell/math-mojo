import React from 'react';

import { Router as expressRouter } from 'express';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

import store from '../flux/store';

const router = expressRouter();

import App from 'components/app';

router.get('*', function(req, res) {
  const context = {};

  const html = renderToString(
    <Provider store={ store }>
      <StaticRouter
        location={ req.url }
        context={ context }
      >
        <App />
      </StaticRouter>
    </Provider>
  );

  return res.status(context.status || 200).send(
    `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Math mojo</title>
        <link href='https://fonts.googleapis.com/css?family=Noto+Sans' rel='stylesheet' />
      </head>

      <body>
        <div class="app">${html}</div>
        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(store)}</script>
        <script src="/public/vendor.js"></script>
        <script src="/public/hmr.js"></script>
        <script src="/public/main.js"></script>
      </body>
    </html>
  `,
  );
});

export default router;
