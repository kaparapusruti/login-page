const express = require('express');
const router = express.Router();

const usersConrtoller = require('../controllers/users_controllers');

router.get('/profile',usersConrtoller.profile);
router.get('/sign-up',usersConrtoller.signup);
router.get('/sign-in',usersConrtoller.signin);
router.post("/create",usersConrtoller.create);
router.post("/create-session",usersConrtoller.createSession);
module.exports = router;