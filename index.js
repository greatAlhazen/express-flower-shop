const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const homeRoute =require('./routes/home');
const authRoute = require('./routes/auth');

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use('/home',homeRoute);
app.use('/auth',authRoute);



const port = process.env.PORT || 3000;

app.listen(port,() =>{
    console.log(`server running on ${port}`);
})