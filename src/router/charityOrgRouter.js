const express = require('express');
const charityOrgControllers = require('../controllers/charityOrgControllers.js');


const router = express.Router();

router.get('/charityOrgs', charityOrgControllers.getCharityOrgs);
router.get('/charityOrgById/:charityOrgId', charityOrgControllers.getCharityOrgById);
router.post('/charityOrg', charityOrgControllers.postCharityOrg);
router.delete('/charityOrg/:CharityOrgId', charityOrgControllers.deleteCharityOrg);
router.patch('/charityOrg/:CharityOrgId', charityOrgControllers.editCharityOrg);

router.post('/charityOrgVerified/:charityOrgId', charityOrgControllers.postCharityOrgVerified);
module.exports = router;
