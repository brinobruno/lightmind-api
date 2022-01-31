var express = require('express');
var path = require('path');
var logger = require('morgan');

require('./src/models/db/database.config')

var usersRouter = require('./src/routes/users.routes');
var notesRouter = require('./src/routes/notes.routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/users', usersRouter);
app.use('/notes', notesRouter);

module.exports = app;