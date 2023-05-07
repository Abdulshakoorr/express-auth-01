const express = require('express');
const router = express.Router();
const {homeController, registerController, loginController, createUser, loginVerification} = require('../controllers/userController.js');


router.get('/', homeController);
router.get('/register', registerController);
router.post('/register', createUser);
router.get('/login', loginController);
router.post('/login', loginVerification);
module.exports = router;

