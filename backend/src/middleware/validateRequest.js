const validateRequest = (requiredFields = []) => {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(
      (field) => !req.body[field] && req.body[field] !== 0
    );

    if (missingFields.length > 0) {
      res.status(400);
      return next(
        new Error(`Missing required field(s): ${missingFields.join(", ")}`)
      );
    }

    next();
  };
};

module.exports = validateRequest;