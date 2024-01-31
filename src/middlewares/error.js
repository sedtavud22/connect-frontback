module.exports = (error, req, res, next) => {
  error.statusCode = error.message.endsWith("found") ? 400 : error.statusCode;
  res.status(error.statusCode || 500).json({ error: error.message });
};
