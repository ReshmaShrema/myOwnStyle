const express = require('express');
const router =express.Router()

// environment variable setting
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Variable setting
const email = process.env.ADMIN_EMAIL_ID;
const password = process.env.ADMIN_PASSWORD;
let session;
// session=req.session
// session.userid=req.body.udername;



//admin signin
router.get('/signin',(req,res)=>{
    (req.session.adminLogin==true)?res.redirect('/admin/dashboard'):res.render('admin/admin-signin',{
        adminLoginErr:req.session.adminLoginErr,
        message:req.session.message,
        admin:true,
        adminLoginPage:true,
        })
});
router.post('/signin',(req,res)=>{
    if(req.body.email == email){
        if(req.body.password == password){
            req.session.adminLogin=true;
            req.session.adminLoginErr=false;
            res.redirect('/admin/admin-dashboard');
        }
        else{
            req.session.adminLoginErr = true;
            req.session.adminLogin = false;
            req.session.message="Password does not exist";
            res.redirect('/admin/signin')
        }
    }
    else{
        req.session.adminLoginErr = true;
        req.session.adminLogin = false;
        req.session.message = "Email-id does not exist";
        res.redirect('/admin/signin')
        }
    });

module.exports = router;