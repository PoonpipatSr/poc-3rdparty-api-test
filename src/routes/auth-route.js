import express from 'express';
import * as authController from '../controllers/auth-controller.js';

const router = express.Router();

router.get('/login-oauth', authController.loginRedirect);
router.get('/callback', authController.handleCallback);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

export default router;