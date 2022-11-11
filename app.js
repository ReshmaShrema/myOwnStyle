// importing express module
const express = require('express');

// importing express-session module
const session = require('express-session');

// importing file-store module
const filestore = require('session-file-store')(session);

//view engine setup npm i express-handlebars
const hbs = require("express-handlebars");

//setting up the server app,init express app
const app =express();

// creating session
app.use(
  session({
    name: "session-id",
    secret: "GFGEnter", // Secret key,
    saveUninitialized: false,
    resave: false,
    store: new filestore(),
  })
);


// Asking for the authorization
function auth(req, res, next) {
    // Checking for the session
    console.log(req.session)
  
// Checking for the authorization
    if (!req.session.user) {
        var authHeader = req.headers.authorization;
        console.log(authHeader);
        var err = new Error("You are not authenticated")
        res.setHeader("WWW-Authenticate", "Basic")
        err.status = 401
        next(err)
  
        var auth = new Buffer.from(authHeader.split(' ')[1],
            "base64").toString().split(":")
  
        // Reading username and password
        var username = auth[0]
        var password = auth[1]
        if (username == "admin2" && password == "password") {
            req.session.user = "admin2"
            next()
        }
        else {
            // Retry incase of incorrect credentials
            var err = new Error('You are not authenticated!');
            res.setHeader("WWW-Authenticate", "Basic")
            err.status = 401;
            return next(err);
        }
    }
    else {
        if (req.session.user === "admin2") {
            next()
        }
        else {
            var err = new Error('You are not authenticated!');
            res.setHeader("WWW-Authenticate", "Basic")
            err.status = 401;
            return next(err);
        }
    }
}
  
// Middlewares
app.use(auth)
//Middleware for parsing data
app.use(express.json());

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