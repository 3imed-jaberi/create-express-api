// const { ResponseException } = require("@app/common/exceptions");

const errorHandler = (exception, request, response, next) => {
  let error = { ...exception };

  error.message = exception.message;

  // log to console for dev
  console.error(exception.message);

  // TODO: add more logic here to handle erros ...

  response.status(error.statusCode || 500).json({
    status: 'failed',
    error: error.errors || error.message || 'Server Error',
  });
};

module.exports = { errorHandler };
