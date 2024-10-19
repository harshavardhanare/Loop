import express from "express";
import {
  adminLogin,
  deletePost,
  freezeUser,
  getAllUsers,
  getUserPosts,
} from "../controllers/admin.controller.js";
import { protectRoute3 } from "../middleware/adminauth.middleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/getAllUsers", protectRoute3, getAllUsers);
router.get("/getUserPosts/:userId", protectRoute3, getUserPosts);
router.delete("/deleteUserPost/:postId", protectRoute3, deletePost);
router.post("/freezeUser/:userId", protectRoute3, freezeUser);
export default router;
