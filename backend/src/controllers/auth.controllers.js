import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { UnverifiedUser } from "../models/unverifiedUser.model.js";
import { generateJWTToken } from "../utils/GenerateJWT.js";
import { sendConfirmationMail } from "../utils/SendMail.js";

/**
 * @route   POST /api/auth/signUp
 * @desc    Register a new user
 * @access  Public
 */
export const registerUser = AsyncHandler(async (req, res) => {
  console.log("******** registerUser Function ********");
  const { name, email, password } = req.body;
  console.log("User details", name, email, password);

  // Validate request body
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  // console.log("Existing User", existingUser);
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  // Check if there is an unverified user with the same email
  const existingUnverifiedUser = await UnverifiedUser.findOne({ email });
  // console.log("Existing Unverified User", existingUnverifiedUser);
  if (existingUnverifiedUser) {
    throw new ApiError(400, "Already registered. Please verify your email, check your mail to do so.");
  }

  // Create a new unverified user
  const unverifiedUser = await UnverifiedUser.create({ name, email, password });
  if (!unverifiedUser) {
    throw new ApiError(500, "Failed to create User");
  }

  // Send confirmation mail
  const confirmationMail = await sendConfirmationMail(email, unverifiedUser._id);
  if (!confirmationMail) {
    await UnverifiedUser.deleteOne({ _id: unverifiedUser._id });
    throw new ApiError(500, "Failed to send confirmation mail");
  }

  return res.json(
    new ApiResponse(
      200,
      {
        name: unverifiedUser.name,
        email: unverifiedUser.email,
      },
      "Please verify your email to continue"
    )
  );
});

/**
 * @route   GET /api/auth/confirmEmail/:id
 * @desc    Confirm email address
 * @access  Public
 */
export const confirmEmail = AsyncHandler(async (req, res) => {
  console.log("******** confirmEmail Function ********");
  const { id } = req.params;

  // Validate request parameters
  if (!id) {
    throw new ApiError(400, "Invalid request");
  }

  // Find the unverified user by ID
  const unverifiedUser = await UnverifiedUser.findById(id);
  if (!unverifiedUser) {
    throw new ApiError(404, "User not found");
  }

  // Create a new verified user
  const user = await User.create({
    name: unverifiedUser.name,
    email: unverifiedUser.email,
    password: unverifiedUser.password,
  });
  if (!user) {
    throw new ApiError(500, "Failed to create User");
  }

  // Delete the unverified user
  await UnverifiedUser.deleteOne({ _id: unverifiedUser._id });

  return res.status(200).send("Email confirmed. You can now login");
});

/**
 * @route   POST /api/auth/login
 * @desc    Log in a user
 * @access  Public
 */
export const loginUser = AsyncHandler(async (req, res) => {
  console.log("******** loginUser Function ********");
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    // Check if the user is an unverified user
    const unverifiedUser = await UnverifiedUser.findOne({ email });
    if (!unverifiedUser) throw new ApiError(400, "Invalid email or password");
    throw new ApiError(400, "Verify your email before logging in");
  }

  // Generate JWT token
  const jwtToken = generateJWTToken(user._id);
  const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Check if the password matches
  const checkPassword = await user.matchPassword(password);
  if (checkPassword) {
    // console.log("Inside match password");
    res.cookie("accessToken", jwtToken, {
      httpOnly: true,
      expires: expiryDate,
      secure: false,
    });
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: jwtToken,
        },
        "User logged in successfully"
      )
    );
  }

  throw new ApiError(401, "Invalid email or password");
});

/**
 * @route   POST /api/auth/logout
 * @desc    Log out a user
 * @access  Public
 */
export const logoutUser = AsyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
});
