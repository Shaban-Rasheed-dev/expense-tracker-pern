// Middleware for validating request data
export const validate =
  (schema, source = "body") =>
  (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message,
      });
    }

    if (source === "query") {
      console.log("Result", result.data);
      req.validatedQuery = result.data;
    } else {
      req[source] = result.data;
    }

    next();
  };
