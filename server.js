'use strict';

const express = require('express');
const routes = require('./routes/index');

const PORT = 3001;
const HOST = '0.0.0.0';

const app = express();

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(express.json())
app.use('/', routes);

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
