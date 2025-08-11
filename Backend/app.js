const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors')
const app = express();
const connectToDB = require('./db/db.js');
const userRoutes = require('./routes/user.routes.js');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes.js')
connectToDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true }))
app.use(cookieParser());

app.get('/', (req, res)=> {
    res.send('hello world');
})
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;
