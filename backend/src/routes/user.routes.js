import { Router } from "express";
import { getUser } from "../controllers/user.controllers.js";
import { validateToken } from "../middlewares/validateToken.js";

// Create a new router instance
const router = Router();

/**
 * @route   GET /api/user
 * @desc    Get user details
 * @access  Private (requires JWT token)
 */
router.route("/").get(validateToken, getUser);

// Export the router to be used in other parts of the application
export default router;
