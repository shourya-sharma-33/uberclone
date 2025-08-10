const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors')
const app = express();
const connectToDB = require('./db/db.js')
connectToDB();
app.use(cors());
app.get('/', (req, res)=> {
    res.send('hello world');
})

module.exports = app;
