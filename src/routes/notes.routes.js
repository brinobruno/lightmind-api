var express = require('express');
var router = express.Router();

const withAuth = require('../middlewares/auth')

//controllers
const createNote = require('../controllers/notes/createNote')

router.post('/', withAuth, createNote)

module.exports = router;