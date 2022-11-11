const express = require('express');

//view engine setup npm i express-handlebars
const hbs = require("express-handlebars");

//setting the server app,init express app
const app =express();

//Middleware for parsing data
app.use(express.json());

// static file managing
const path = require('path');
app.use(express.static(path.join(__dirname,'public')))

// view engin
app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')

//setting partial and layout folder
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials'}))

// router setting
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
app.use('/user',userRouter);
app.use('/admin',adminRouter);



    
// port setting
app.listen(3000,(error)=>{
    if(!error)
        console.log("Server is Successfully Running, and app is listening on Port 3000");
    else
    console.log("Error occured,server can't start",error);
});