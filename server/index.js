'use strict';

// Basic express setup:
const port = 9050;
const express = require('express');
const app = express();

// set the root path to public/ for static files
app.use(express.static('public'));



// Mount the routes at the '/battleship' path prefix:
const battleship = require('./routes/battleship');
app.use('/battleship', battleship);

app.listen(port, () =>{
  console.log(`Example app listening on port ${port}`);
});

