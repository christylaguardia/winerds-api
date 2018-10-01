// eslint-disable-next-line
function createErrorHandler(log = console.log) {
  return (err, req, res, next) => {
    let showLog = process.env.NODE_ENV !== 'production';
    let code = 500;
    let error = 'Internal Server Error';

    if (err.codePrefix) { // firebase-auth error
      code = 400;
      error = err.message;
    }
    else if (err.code) {
      code = err.code;
      error = err.error;
    }
    else if (err.name === 'CastError') {
      code = 400;
      error = err.message;
    }
    else if (err.name === 'ValidationError') {
      code = 400;
      error = Object.values(err.errors).map(e => e.message);
    }
    else {
      showLog = true;
      log(err);
    }

    if (showLog) log(code, error);
    log(err);
    res.status(code).json({ error });
  };
};

module.exports = createErrorHandler;
