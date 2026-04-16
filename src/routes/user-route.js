import express from 'express';
import * as userController from '../controllers/user-controller.js';
import * as authMiddleware from '../middlewares/auth-middleware.js';

const router = express.Router();

router.get('/profile', authMiddleware.verifyToken, userController.getProfile);

router.get('/admin-dashboard', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.getAdminDashboard);

export default router;