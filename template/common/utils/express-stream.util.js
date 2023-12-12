const { finished } = require('node:stream');

function streamHandler(stream, response, next) {
  stream.pipe(response, { end: false });

  return finished(stream, (error) => {
    if (error) return next(error);
    return response.end();
  });
}

module.exports = { streamHandler };
