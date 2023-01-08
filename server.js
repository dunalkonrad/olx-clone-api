'use strict';

const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = 3001;
const HOST = '0.0.0.0';

const app = express();

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

app.use('/', routes);

app.listen(PORT, HOST, () => {
    console.log(`Running on https://${HOST}:${PORT}`);
});

module.exports = app;
