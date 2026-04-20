import express from 'express';
import * as authMsController from '../controllers/auth-ms-controller.js';
import * as middleware from '../middlewares/auth-ms-middleware.js'

const router = express.Router();

router.get('/microsoft', authMsController.loginWithMicrosoft);
router.get('/microsoft/callback', authMsController.microsoftCallback);

router.get('/secure-data', middleware.verifyToken, authMsController.getSecureData);

export default router;