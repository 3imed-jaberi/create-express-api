const createApiRoutePath =
  (prefixPath = undefined) =>
  (routePath) =>
    [prefixPath, routePath].filter(Boolean).join('');

module.exports.createApiRoute =
  (prefixPath = undefined) =>
  (router) => [createApiRoutePath(prefixPath)(router.prefixRouterPath), router];

module.exports.createDefinedRoutesList =
  (prefixPath = undefined) =>
  (routes) =>
    Object.keys(routes).map((routeKey) =>
      createApiRoutePath(prefixPath)(routes[routeKey].prefixRouterPath),
    );
