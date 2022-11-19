const express = require('express');
const router =express.Router()
const adminController =require('../controller/admin')

//admin signin
router.get('/signin',adminController.getAdminSignin);
router.post("/signin", adminController.postAdminSignin);

// admin dashboard
router.get('/dashboard',adminController.verifyLogin,adminController.getAdminDashboard)


// admin usermangement
router.get('/usermanagement',adminController.verifyLogin,adminController.getAdminUsermanagement);

// admin productmanagement
router.get("/productmanagement",adminController.verifyLogin,adminController.getAdminProductmangement
);

// admin ordermanagement
router.get("/ordermanagement",adminController.verifyLogin,adminController.getAdminOrdermanagement
);
module.exports = router;