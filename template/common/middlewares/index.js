module.exports = {
  ...require('./error-handler.middleware'),
  ...require('./async-handler.middleware'),
  ...require('./prevent-access-for-x-ips.middleware'),
  ...require('./routes-exceptions-handler.middleware'),
};
