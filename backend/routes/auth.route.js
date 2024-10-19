import express from "express";
import { login, logout, signup, getCurrentUser, resetPassword, forgotPassword } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { protectRoute2 } from "../middleware/admin.user.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protectRoute2, getCurrentUser);


router.post("/forgot-password",forgotPassword)
router.post("/reset-password",resetPassword)

export default router;
