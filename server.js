const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const app = express();
const DATA_BASE_URL = process.env.DATA_BASE_URL;
const connectDB = require('./database/connectDB');
const auth = require('./routes/auth.js');

connectDB(DATA_BASE_URL)
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}));
app.use('/', auth)


app.listen(PORT, () =>{
    console.log(`Server listening on port http://localhost:${PORT}`)
})