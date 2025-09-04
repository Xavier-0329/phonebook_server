const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((e) => e.message);
    return response.status(400).json({
      error: "Phonebook validation failed",
      details: errors,
    });
  }

  next(error);
};

module.exports = errorHandler;
