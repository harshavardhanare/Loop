import express from 'express';
import { getChatHistory, sendMessage} from '../controllers/chat.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/:recipientId', protectRoute, getChatHistory);
router.post('/send', protectRoute, sendMessage);

export default router;
