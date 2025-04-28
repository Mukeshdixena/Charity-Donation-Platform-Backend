const express = require('express');
const userController = require('../controllers/userControllers.js');
const userAuth = require('../middleware/auth.js');


const router = express.Router();

router.get('/user', userController.getUser);
router.get('/userById', userAuth.authonticate, userController.getUserById);
router.post('/user', userController.postUser);
router.post('/adminUser', userController.postAdminUser);
router.delete('/user/:UserId', userController.deleteUser);
router.patch('/user', userAuth.authonticate, userController.editUser);
router.post('/signin', userController.signin);
router.post('/adminSignin', userController.adminSignin);
router.patch('/userPass', userController.postUserPass);
module.exports = router;
