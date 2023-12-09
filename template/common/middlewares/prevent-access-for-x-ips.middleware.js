const { ResponseException } = require('../exceptions');

module.exports.preventAccessForXIpsHandler = (blacklist) => (request, response, next) => {
  if (!Array.isArray(blacklist))
    throw new Error('[preventAccessForXIpsHandler]: blacklist argument should be an array.');

  // !whitelist.includes(request.socket.remoteAddress)
  if (blacklist.includes(request.socket.remoteAddress))
    return next(new ResponseException('Forbidden', 403));

  return next();
};
