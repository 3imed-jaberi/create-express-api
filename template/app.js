require('module-alias/register');

const http = require('node:http');

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
// NOTE: if we need to use 'express-rate-limit' middleware
// don't forget to intall it first `npm i express-rate-limit`
// const rateLimit = require('express-rate-limit')

// NOTE: if we need more addition http errors utilites we can use `@hapi/boom`
// ---> `npm i @hapi/boom`

const {
  errorHandler,
  preventAccessForXIpsHandler,
  routesExceptionsHandler,
} = require('@app/common/middlewares');
const { createApiRoute } = require('@app/common/utils');
const Routers = require('@app/modules');

const app = express();

const DEFAULT_ROUTERS_PREFIX = '';
const mountApiRoute = createApiRoute(DEFAULT_ROUTERS_PREFIX);

app
  // logger
  .use(morgan('dev'))
  // prevent access for the passed ips (prevent ddos attack)
  .use(preventAccessForXIpsHandler(['111.34.55.211']))
  // body parser
  .use(express.json())
  // .use(express.urlencoded({ extended: false }));
  // set security headers
  .use(helmet())
  // prevent XSS attacks
  .use(xss())
  // prevent http param pollution
  .use(hpp())
  // // rate limiting
  // .use(
  //   rateLimit({
  //     windowMs: 10 * 60 * 1000, // 10 mins
  //     max: 100
  //   })
  // )
  // serve static files
  .use('/public', express.static(require('node:path').join(__dirname, 'public')))
  // mount routers
  .use(...mountApiRoute(Routers.productsRouter))
  // routes exceptions handler (501 path not impl / 405 method not allowed)
  .use(
    '*',
    routesExceptionsHandler({
      prefixPath: DEFAULT_ROUTERS_PREFIX,
      routes: Routers,
    }),
  )
  // error handler
  .use(errorHandler);

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(
  PORT,
  console.log(
    ` ⚡️ Http server running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`,
  ),
);

// handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`🛑 Error: ${err.message}`);
  // close server & exit process
  // server.close(() => process.exit(1))
});
