var express = require('express');
var router = express.Router();

const withAuth = require('../middlewares/auth')

//controllers
const createNote = require('../controllers/notes/createNote')
const downloadNote = require('../controllers/notes/downloadNote')
const listNotes = require('../controllers/notes/listNotes')

router.post('/', withAuth, createNote)

router.get('/:id', withAuth, downloadNote)

router.get('/', withAuth, listNotes)

module.exports = router;