const express = require('express');
const router =express.Router()
const adminController =require('../controller/admin')

//admin signin
router.get('/signin',adminController.getAdminSignin);
router.post("/signin", adminController.postAdminSignin);

// admin dashboard
router.get('/dashboard',adminController.verifyLogin,adminController.getAdminDashboard)

module.exports = router;