const express = require('express');
const router =express.Router()

//Variable setting
const email = process.env.ADMIN_EMAIL_ID;
const password = process.env.ADMIN_PASSWORD;



//admin signin
router.get('/signin',(req,res)=>{
    (req.session.adminLoggin==true)?res.redirect('/admin/dashboard'):res.render('admin/signin',)
    res.render('admin/admin-login')
})

module.exports = router;