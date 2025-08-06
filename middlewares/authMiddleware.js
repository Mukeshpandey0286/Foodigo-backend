import JWT from "jsonwebtoken";

const authMiddelware = async (req, res, next) => {
  try {
    // console.log("Running auth middleware...");
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // console.log("Token missing or invalid format");
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided or format incorrect.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.body = req.body || {};
    req.body.id = decoded.id;

    // console.log("Token verified successfully");
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid Token",
      error: error.message,
    });
  }
};

export { authMiddelware };
