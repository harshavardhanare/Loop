import express from "express";
import { login, logout, signup, getCurrentUser } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { protectRoute2 } from "../middleware/admin.user.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protectRoute2, getCurrentUser);

export default router;
