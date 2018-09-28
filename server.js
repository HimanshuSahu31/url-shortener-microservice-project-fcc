'use strict';

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const shorturlRoutes = require('./routes/shorturl');

// Basic Configuration 
const port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGOLAB_URI, { 'useNewUrlParser' : true });

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

// your first API endpoint... 
app.use('/api/shorturl', shorturlRoutes);

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Start Server
app.listen(port, function () {
  console.log('Node.js listening ...');
});