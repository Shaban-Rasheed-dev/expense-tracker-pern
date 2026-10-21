import jwt from "jsonwebtoken";
// Verify the JWT from the Authorization header
export const authTokenMiddleware = (req, res, next) => {
  // Expected format: "Authorization: Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No provided token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    // Throws an error if the token is invalid or expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
