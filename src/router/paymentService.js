const express = require('express');
const cashfreeService = require('../service/cashfreeService');
const userAuth = require('../middleware/auth.js');

const router = express.Router();

router.post('/service/createOrder', cashfreeService.createOrder);
router.get('/payment/paymentStatus/:orderId', cashfreeService.paymentStatus);
router.post('/forgetPassword/postOtpMail', cashfreeService.postOtpMail);
router.post('/forgetPassword/verifyOtp', cashfreeService.verifyOtp);
router.post('/donation/confirmation', userAuth.authonticate, cashfreeService.confirmation);

module.exports = router;
