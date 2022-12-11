const express = require('express');
const path = require('path');
const homeRoute =require('./routes/home');
const authRoute = require('./routes/auth');
const database = require('./config/database');


// Handling Uncaught Error
process.on('uncaughtException',(err) =>{
    console.log(`error is: ${err.message}`);
    console.log('shutting down server');
    process.exit(1);
})

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// database configuration
const mongoDbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/flower';
database(mongoDbUrl);

const app = express();

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use('/home',homeRoute);
app.use('/auth',authRoute);



const port = process.env.PORT || 3000;

app.use((err,req,res,next) =>{
    const status = err.status || 500;
    const message = err.message || 'something went wrong';
    return res.status(status).render('error',{
        success:false,
        status,
        message,
        stack: err.stack
    })
})

const server = app.listen(port,() =>{
    console.log(`server running on ${port}`);
});


// Unhandled Promise Error
process.on('unhandledRejection',(err) =>{
    console.log(`error is: ${err.message}`);
    console.log('shutting down server');

    server.close(() =>{
        process.exit(1)
    })
})