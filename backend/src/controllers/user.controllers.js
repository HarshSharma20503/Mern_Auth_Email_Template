import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

/**
 * @route   GET /api/user
 * @desc    Get user details
 * @access  Private (assuming user is authenticated)
 */
export const getUser = AsyncHandler(async (req, res) => {
  console.log("************* Inside GetUser Controller *************");

  // Assuming req.user is populated by an authentication middleware
  const user = req.user;

  // If user is not found in the request (for safety, though it should not happen if authenticated)
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Send response with user details
  res.status(200).json(new ApiResponse(200, user));
});
