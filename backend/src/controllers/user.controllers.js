import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

/* 
/api/user/
Get Request
*/
export const getUser = asyncHandler(async (req, res) => {
  console.log("************* Inside GetUser Controller *************");
  res.status(200).json(new ApiResponse(200, req.user));
});
