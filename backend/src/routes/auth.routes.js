import { Router } from "express";
import { registerUser, loginUser, confirmEmail, logoutUser } from "../controllers/auth.controllers.js";

const router = Router();

router.route("/signUp").post(registerUser);
router.route("/confirmEmail/:id").get(confirmEmail);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

export default router;
