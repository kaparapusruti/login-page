const express = require('express');
const router = express.Router();
const passport = require("passport");
const usersConrtoller = require('../controllers/users_controllers');

router.get('/profile',passport.checkAuthentication, usersConrtoller.profile);
router.get('/sign-up',usersConrtoller.signup);
router.get('/sign-in',usersConrtoller.signin);
router.post("/create",usersConrtoller.create);
//router.post("/create-session",usersConrtoller.createSession);
//use passport as a middleware to authenticate
router.post("/create-session",passport.authenticate(
    "local",
    {failureRedirect:"user/sign-in"},
),usersConrtoller.createSession);

router.get('/sign-out',usersConrtoller.destroySession);

module.exports = router;