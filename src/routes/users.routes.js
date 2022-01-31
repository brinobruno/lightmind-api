var express = require('express');
var router = express.Router();

//controllers
const registerUser = require('../controllers/users/register')
const loginUser = require('../controllers/users/login')

router.post('/register', registerUser)

router.post('/login', loginUser)

module.exports = router;
