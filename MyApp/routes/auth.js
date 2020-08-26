const express = require("express")
const router= express.Router()
const authController = require("../controller/auth")

 router.post('/login', authController.Login);
// router.post('/logout', authController.Logout);
router.post('/signup', authController.Signup);


module.exports = router