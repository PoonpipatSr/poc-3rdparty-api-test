import express from 'express';
import * as authTestController from '../../controllers/practice/auth-test-controller.js';

const router = express.Router();

router.get('/login-oauth', authTestController.loginRedirect);
router.get('/callback', authTestController.handleCallback);
router.post('/login', authTestController.login);
router.post('/refresh', authTestController.refreshToken);
router.post('/logout', authTestController.logout);

export default router;