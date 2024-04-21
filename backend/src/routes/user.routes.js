import { Router } from "express";

import { getUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = Router();

router.route("/").get(verifyJWT, getUser);

export default router;
