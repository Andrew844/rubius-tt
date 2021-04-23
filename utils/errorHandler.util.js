module.exports = errorHandler = (
  res,
  message = "Что-то пошло не так.",
  status = 500
) => {
  return res.status(status).json(message);
};
