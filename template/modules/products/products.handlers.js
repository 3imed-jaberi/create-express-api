const { ResponseException } = require('@app/common/exceptions');
const { asyncHandler } = require('@app/common/middlewares');
const { zodValidator, parseURL, httpProxy } = require('@app/common/utils');

const { createProductDTOSchema } = require('./products.dtos');

/**
 * @desc     Get all products
 * @route    GET /api/v1/products
 * @access   Public
 */
module.exports.getProducts = asyncHandler(async (request, response) => {
  response.status(200).json({ ok: true });
});

/**
 * @desc     Get single product
 * @route    GET /api/v1/products/:id
 * @access   Public
 */
module.exports.getProduct = asyncHandler(async (request, response, next) => {
  if (!request.query.q)
    return next(new ResponseException(`product not found with id of ${request.params.id}`, 404));

  response.status(200).json({ ok: true });
});

/**
 * @desc     Create product
 * @route    POST /api/v1/products/:id
 * @access   Public
 */
module.exports.createProduct = asyncHandler(async (request, response, next) => {
  const result = zodValidator(request.body, createProductDTOSchema);
  if (!result.success) return next(new ResponseException('ZodValidatorError', 400, result.errors));
  if (result.data.price === 30) return next(new ResponseException('product not found !', 404));
  return response.status(200).json({ ok: true, data: result.data });
});

/**
 * @desc     Update product
 * @route    PUT /api/v1/products/:id
 * @access   Public
 */
module.exports.updateProduct = asyncHandler(async (request, response, next) => {
  response.status(200).json({ ok: true });
});

/**
 * @desc     Delete product
 * @route    DELETE /api/v1/products/:id
 * @access   Public
 */
module.exports.deleteProduct = asyncHandler(async (request, response, next) => {
  response.status(200).json({ ok: true });
});

/**
 * @desc     Proxy handler to display
 * @route    GET /api/v1/products/proxy-path
 * @access   Public
 */
module.exports.proxyProduct = asyncHandler(async (request, response, next) => {
  const toURL = request.query?.to;
  if (!toURL) return next(new ResponseException('`to` query param not found!', 400));
  parseURL(toURL);

  const httpProxyHandler = httpProxy.createProxyMiddleware({
    target: toURL,
    changeOrigin: true,
    pathRewrite: {
      '^/the-full-path-for-this-handler': '',
    },
  });

  // const httpProxyHandler = httpProxy.createProxyMiddleware({
  //   target: 'https://jsonplaceholder.typicode.com/',
  //   changeOrigin: true,
  //   // Remove the '/jsonplaceholder' path from the request
  //   pathRewrite: {
  //     '^/jsonplaceholder': '',
  //   },
  // });

  return httpProxyHandler(request, response, next);
});
