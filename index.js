const express = require('express');
const path = require('path');
const homeRoute =require('./routes/home');
const authRoute = require('./routes/auth');
const database = require('./config/database');
const flash = require('connect-flash');
const session = require('express-session');
const userRoute = require('./routes/user');





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

// request data handling
app.use(express.urlencoded({ extended: true }));

// session configuration
const sessionOptions = {secret:process.env.SESSION_SECRET,resave: false,
saveUninitialized: true}
app.use(session(sessionOptions));

// flash messages configuration
app.use(flash());
app.use((req,res,next) =>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use('/home',homeRoute);
app.use('/auth',authRoute);
app.use('/user',userRoute);



const port = process.env.PORT || 3000;


// custom error middleware
app.use((err,req,res,next) =>{
    const status = err.status || 500;
    const message = err.message || 'something went wrong';

    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
      }

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