const ExpressRouter = require('express').Router;

const productsHandlers = require('./products.handlers');

const productsRouter = ExpressRouter();

productsRouter.prefixRouterPath = '/products';

productsRouter.route('/').get(productsHandlers.getProducts).post(productsHandlers.createProduct);

productsRouter.route('/proxy-path').get(productsHandlers.proxyProduct);

productsRouter
  .route('/:id')
  .get(productsHandlers.getProduct)
  .put(productsHandlers.updateProduct)
  .delete(productsHandlers.deleteProduct);

module.exports = { productsRouter };
