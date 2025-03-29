const express = require('express');
const userController = require('../controllers/userControllers.js');
const userAuth = require('../middleware/auth.js');


const router = express.Router();

router.get('/api/getUser', userController.getUser);
router.get('/api/getUserById', userAuth.authonticate, userController.getUserById);
router.post('/api/postUser', userController.postUser);
router.delete('/api/deleteUser/:UserId', userController.deleteUser);
router.patch('/api/editUser', userAuth.authonticate, userController.editUser);
router.post('/api/signin', userController.signin);

module.exports = router;
