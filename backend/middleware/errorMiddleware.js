const errorHandler = (err, req, res, next) => {
  //return statusCode else return code 500
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.statusCode(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
