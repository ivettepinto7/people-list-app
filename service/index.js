require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const peopleRoutes = require('./routes/PersonRouter')

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/people', peopleRoutes);

mongoose.connect('mongodb://carolina:Z2dscAy2fpzjcBaH@localhost:27017/people-list?authSource=admin',{
    useNewUrlParser: true
},
    (err, res) => {
      err && console.log(`ERROR: Connecting to DB ${err}`);
      app.listen(3000, () =>
        console.log("Connected to DB")
      );
    }
  );