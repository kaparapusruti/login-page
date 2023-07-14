const express = require("express");

const router = express.Router();
const homecontroller = require("../controllers/home_controllers");
 console.log("router loded");

 router.get("/",homecontroller.home);
 router.use("/user",require("./user"));

 module.exports = router;