const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path || error.param,
        message: error.msg,
      })),
    });
  }

  next();
};

const validateAllowedFields = (allowedFields = []) => {
  return (req, res, next) => {
    const bodyFields = Object.keys(req.body || {});

    const invalidFields = bodyFields.filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid fields provided",
        errors: invalidFields.map((field) => ({
          field,
          message: `${field} is not allowed`,
        })),
      });
    }

    next();
  };
};

module.exports = {
  validateRequest,
  validateAllowedFields,
};