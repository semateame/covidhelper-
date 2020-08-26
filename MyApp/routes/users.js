const express = require('express');
const router = express.Router();
const userController = require("../controller/user")
const auth = require("../auth/auth")
/* GET volunteers listing. */
router.get("/seach", auth, userController.searchVolunteers)

module.exports = router;
