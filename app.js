const express = require('express');
const bodyParser = require('body-parser');

const event = require('./routes/event.route'); //import routes
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://bh_dev:GpjbKQEUu8cDzgFV@cluster0-hu2oi.mongodb.net/test?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/events', event);


let port = 1234;

app.listen(port, () => {
  console.log('Server is up and running on port ' + port);
});


