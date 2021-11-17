require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const peopleRoutes = require('./routes/PersonRouter')

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/', peopleRoutes);

mongoose.connect('mongodb://localhost/people-list',{
    useNewUrlParser: true
},
    (err, res) => {
      err && console.log(`ERROR: Connecting to DB ${err}`);
      app.listen(3000, () =>
        console.log("Connected to DB")
      );
    }
  );