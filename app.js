var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors')

require('./src/models/db/database.config')

var usersRouter = require('./src/routes/users.routes');
var notesRouter = require('./src/routes/notes.routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

//routes
app.use('/users', usersRouter);
app.use('/notes', notesRouter);

module.exports = app;