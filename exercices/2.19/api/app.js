const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const filmRouter = require('./routes/films');
const requestStats = require('./utils/stats');
const textsRouter = require('./routes/texts');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(requestStats);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/texts', textsRouter);
app.use('/films', filmRouter);

module.exports = app;
