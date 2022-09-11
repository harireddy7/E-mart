const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  if (req.route.path === '/:productId') {
    message = 'Product not found';
  }
  res
    .status(statusCode)
    .json({ message, stack: process.env.NODE_ENV === 'production' ? null : err.stack });
};

export { notFound, errorHandler };
