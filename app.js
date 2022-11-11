// importing express module
const express = require('express');

// importing express-session module
const session = require('express-session');
const cookieParser = require('cookie-parser');



//view engine setup npm i express-handlebars
const hbs = require("express-handlebars");

//setting up the server app,init express app
const app =express();

// creating session
app.use(cookieParser());
const oneHour = 1000 * 60 * 60;
app.use(
  session({
    name: "session-id",
    secret: "myowndesign", // Secret key,
    saveUninitialized: true,
    cookie:{maxAge:oneHour},
    resave: false,
  })
);



  

//Middleware for parsing data
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// static file managing
const path = require('path');
app.use(express.static(path.join(__dirname,'public')))

// view engine
app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')

//setting partial and layout folder
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials'}))

// router setting
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
app.use('/user',userRouter);
app.use('/admin',adminRouter);


if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}

    
// port setting
const port = process.env.PORT || 3000;
app.listen(port,(error)=>{
    if(!error)
        console.log(`Server is Successfully Running, and app is listening on Port ${port}`);
    else
    console.log("Error occured,server can't start",error);
});