const express = require('express');
const app =express();
//Middleware setting 
app.use(express.json());

//root setting
app.get('/',(req,res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
})
app.post('/',(req,res)=>{
    const {name}=req.body;
    res.send(`welcome ${name}`);

})
app.get('/hello',(req,res)=>{
    res.set('Content-Type','text/html');
    res.status(200).send('<h1>Dello</h1>');
});
// port setting
app.listen(3000,(error)=>{
    if(!error)
        console.log("Server is Successfully Running, and app is listening on Port 3000");
    else
    console.log("Error occured,server can't start",error);
});