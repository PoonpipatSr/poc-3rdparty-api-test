// ไฟล์: src/routes/authRoutes.js
import express from 'express';
import * as authMsController from '../controllers/auth-ms-controller.js';

const router = express.Router();

router.get('/microsoft', authMsController.loginWithMicrosoft);
router.get('/microsoft/callback', authMsController.microsoftCallback); 

export default router;