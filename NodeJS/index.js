// This is the "main method" of NodeJs and imports the libraries we need and defines our controller and what port to listen to requests on.

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');

var employeeController = require('./controllers/employeeController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000, () => console.log('Server started on port 3000'));


app.use('/employees', employeeController);
