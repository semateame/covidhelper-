const express = require('express');
const router = express.Router();
const volunteersController = require('../controller/user')
const auth = require("../auth/auth")
/* GET home page. */
router.patch('/location', auth, volunteersController.updatelocation)
router.patch('/unsetlocation', auth, volunteersController.removelocation)

module.exports = router;
