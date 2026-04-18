import express from 'express';
import { testThirdPartyAPI } from '../../controllers/practice/integrationController.js';

const router = express.Router();

// ลูกค้าต้องยิง POST มาที่เส้นนี้ พร้อมแนบ token
router.post('/test-3rd-party', testThirdPartyAPI);

export default router;