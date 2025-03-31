const express = require('express');
const donationControllers = require('../controllers/donationControllers.js');
const userAuth = require('../middleware/auth.js');


const router = express.Router();

router.get('/api/getDonations', donationControllers.getDonations);
router.get('/api/getDonationById', donationControllers.getDonationById);
router.get('/api/getDonationByUser', userAuth.authonticate, donationControllers.getDonationByUser);
router.get('/api/getDonationByCharityOrg', donationControllers.getDonationByCharityOrg);
router.post('/api/postDonation', userAuth.authonticate, donationControllers.postDonation);

router.get('/api/getDonationFile', userAuth.authonticate, donationControllers.getDonationFile);
module.exports = router;
