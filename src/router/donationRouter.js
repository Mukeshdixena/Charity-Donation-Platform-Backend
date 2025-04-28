const express = require('express');
const donationControllers = require('../controllers/donationControllers.js');
const userAuth = require('../middleware/auth.js');


const router = express.Router();

router.get('/donations', donationControllers.getDonations);
router.get('/donationById', donationControllers.getDonationById);
router.get('/donationByUser', userAuth.authonticate, donationControllers.getDonationByUser);
router.get('/donationByCharityOrg', donationControllers.getDonationByCharityOrg);
router.post('/donation', userAuth.authonticate, donationControllers.postDonation);

router.get('/donationFile', userAuth.authonticate, donationControllers.getDonationFile);
module.exports = router;
