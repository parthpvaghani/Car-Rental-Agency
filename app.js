//3rd party packages
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//importing routes
const Carroute = require('./routes/Car');
const Userroute = require('./routes/User');


//middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(Carroute);
app.use(Userroute);

//connection with mongodb using mongoose ODM then it statrs the server
mongoose
  .connect(
    'mongodb+srv://parthvaghani:parth1414@cluster0-bbzjb.mongodb.net/CarRentalService'
  )
  .then(result=>{
      app.listen(3000,()=>{
        console.log('Server started on 3000')
      });
  })
  .catch(err => {
    console.log(err);
  });

