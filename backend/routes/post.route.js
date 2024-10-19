import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
	createPost,
	getFeedPosts,
	deletePost,
	getPostById,
	createComment,
	likePost,
} from "../controllers/post.controller.js";
import multer from "multer";
import path from 'path';
const router = express.Router();


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, "./temp");
	},
	filename: (req, file, cb) => {
	  cb(
		null,
		file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]
	  );
	},
  });
  
  const upload = multer({ storage: storage });
router.get("/", protectRoute, getFeedPosts);
// Set up multer storage engine

router.post(
	'/create',
	protectRoute, // Authenticate the user
	upload.fields([ // Handle image and video file uploads
	  { name: 'image', maxCount: 1 }, // Allow 1 image
	  { name: 'video', maxCount: 1 }, // Allow 1 video
	]),
	createPost // Post creation controller
  );
router.delete("/delete/:id", protectRoute, deletePost);
router.get("/:id", protectRoute, getPostById);
router.post("/:id/comment", protectRoute, createComment);
router.post("/:id/like", protectRoute, likePost);

export default router;