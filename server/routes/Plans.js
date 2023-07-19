import express from 'express'
import {user_plans, getOrder,checkandUpdateUser} from '../controllers/Plans.js'
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/get', auth,user_plans)
router.post('/payment/orders', auth,getOrder)
router.post('/payment/success', auth,checkandUpdateUser)
export default router