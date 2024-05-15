import { Router } from "express";
import { registerUser, loginUser, confirmEmail, logoutUser } from "../controllers/auth.controllers.js";

// Create a new router instance
const router = Router();

/**
 * @route   POST /api/auth/signUp
 * @desc    Register a new user
 * @access  Public
 */
router.route("/signUp").post(registerUser);

/**
 * @route   GET /api/auth/confirmEmail/:id
 * @desc    Confirm user's email
 * @access  Public
 */
router.route("/confirmEmail/:id").get(confirmEmail);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return a JWT token
 * @access  Public
 */
router.route("/login").post(loginUser);

/**
 * @route   GET /api/auth/logout
 * @desc    Logout user by clearing the JWT token
 * @access  Public
 */
router.route("/logout").get(logoutUser);

// Export the router to be used in other parts of the application
export default router;
