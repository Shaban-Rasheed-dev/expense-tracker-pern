// Middleware for validation
export const validate = (schema) => (req, res, next) => {
  // Validate the request body against the schema
  const result = schema.safeParse(req.body);

  // If validation fails, respond with 400 and the first error message
  if (!result.success) {
    return res.status(400).json({ message: result.error.issues[0].message });
  }

  // Replace the body with sanitized data
  req.body = result.data;

  // Validation passed, move to the next handler (controller)
  next();
};
