const express = require('express');
const userController = require('../controllers/userControllers.js');
const userAuth = require('../middleware/auth.js');


const router = express.Router();

router.get('/user', userController.getUser);
router.get('/api/getUserById', userAuth.authonticate, userController.getUserById);
router.post('/api/postUser', userController.postUser);
router.post('/api/postAdminUser', userController.postAdminUser);
router.delete('/api/deleteUser/:UserId', userController.deleteUser);
router.patch('/api/editUser', userAuth.authonticate, userController.editUser);
router.post('/signin', userController.signin);
router.post('/api/adminSignin', userController.adminSignin);
router.patch('/api/postUserPass', userController.postUserPass);
module.exports = router;
