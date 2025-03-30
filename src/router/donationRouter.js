const express = require('express');
const donationControllers = require('../controllers/donationControllers.js');


const router = express.Router();

router.get('/api/getDonations', donationControllers.getDonations);
router.get('/api/getDonationById', donationControllers.getDonationById);
router.get('/api/getDonationByUser', donationControllers.getDonationByUser);
router.get('/api/getDonationByCharityOrg', donationControllers.getDonationByCharityOrg);
router.post('/api/postDonation', donationControllers.postDonation);

module.exports = router;
