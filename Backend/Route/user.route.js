const express = require('express');
const { register, login, updateProfile, logout } = require('../controller/User.Controller.js');
const middleware = require('../Middleware/isAuthentication.js')
const multer = require('../Middleware/multer.js')
const router = express.Router();

router.post("/register",multer, register)
router.post("/login", login)
router.get("/logout", logout)
router.post("/profile/update",middleware,multer, updateProfile)

module.exports = router