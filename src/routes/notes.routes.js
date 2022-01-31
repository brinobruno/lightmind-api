var express = require('express');
var router = express.Router();

const withAuth = require('../middlewares/auth')

//controllers
const createNote = require('../controllers/notes/createNote')
const downloadNote = require('../controllers/notes/downloadNote')
const listNotes = require('../controllers/notes/listNotes')
const updateNote = require('../controllers/notes/updateNote')
const deleteNote = require('../controllers/notes/deleteNote')

router.post('/', withAuth, createNote)

router.get('/:id', withAuth, downloadNote)

router.get('/', withAuth, listNotes)

router.put('/:id', withAuth, updateNote)

router.delete('/:id', withAuth, deleteNote)

module.exports = router;