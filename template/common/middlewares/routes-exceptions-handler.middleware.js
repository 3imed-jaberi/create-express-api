const { ResponseException } = require('@app/common/exceptions');
const { createDefinedRoutesList } = require('@app/common/utils');

const routesExceptionsHandler =
  (options = { prefixPath: undefined, routes: {} }) =>
  (request, response, next) => {
    const { prefixPath, routes } = options;
    const definedRoutes = createDefinedRoutesList(prefixPath)(routes);

    if (!Array.isArray(definedRoutes))
      throw new Error('[routesPathAndMethodExceptionsHandler]: defined routes should be an array.');

    if (request.originalUrl === '/favicon.ico') return next();

    // 405 method not allowed
    const hasMethodNotAllowedError = definedRoutes.includes(request.originalUrl);
    if (hasMethodNotAllowedError) {
      return next(
        new ResponseException(
          `'${request.method}' method not allowed on '${request.originalUrl}' path.`,
          405,
        ),
      );
    }

    // 501 path not implemented
    return next(new ResponseException(`'${request.originalUrl}' path not implemented!`, 501));
  };

module.exports = { routesExceptionsHandler };
