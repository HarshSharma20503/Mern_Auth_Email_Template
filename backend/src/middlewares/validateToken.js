import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

/**
 * @middleware validateToken
 * @desc    Middleware to validate JWT token and attach user to the request
 * @access  Private (used for routes requiring authentication)
 */
export const validateToken = AsyncHandler(async (req, res, next) => {
  try {
    // Retrieve token from cookies or authorization header
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    // Check if token is provided
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded token's ID and exclude the password field
    const user = await User.findById(decodedToken?._id).select("-password");

    // Check if user exists
    if (!user) {
      throw new ApiError(401, "Invalid JWT Token");
    }

    // Attach user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    throw new ApiError(401, error?.message || "Invalid JWT Token");
  }
});
