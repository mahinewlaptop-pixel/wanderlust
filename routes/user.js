const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const password = require("passport");
const {isLoggedIn, saveRedirectUrl} = require("../middleware.js");
const userController = require("../controller/user.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, password.authenticate("local", {failureRedirect: "/login", failureFlash: true}), wrapAsync(userController.login));

router.route("/logout")
.get(isLoggedIn, userController.logout);

module.exports = router;