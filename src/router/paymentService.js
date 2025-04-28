const express = require('express');
const cashfreeService = require('../service/cashfreeService');
const userAuth = require('../middleware/auth.js');

const router = express.Router();

router.post('/order', cashfreeService.createOrder);
router.get('/paymentStatus/:orderId', cashfreeService.paymentStatus);
router.post('/OtpMail', cashfreeService.postOtpMail);
router.post('/verifyOtp', cashfreeService.verifyOtp);
router.post('/donation/confirmation', userAuth.authonticate, cashfreeService.confirmation);

module.exports = router;
