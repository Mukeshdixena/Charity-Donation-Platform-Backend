const express = require('express');
const charityOrgControllers = require('../controllers/charityOrgControllers.js');


const router = express.Router();

router.get('/api/getCharityOrgs', charityOrgControllers.getCharityOrgs);
router.get('/api/getCharityOrgById/:charityOrgId', charityOrgControllers.getCharityOrgById);
router.post('/api/postCharityOrg', charityOrgControllers.postCharityOrg);
router.delete('/api/deleteCharityOrg/:CharityOrgId', charityOrgControllers.deleteCharityOrg);
router.patch('/api/editCharityOrg/:CharityOrgId', charityOrgControllers.editCharityOrg);

module.exports = router;
