const express = require("express");
const cookieparser = require("cookie-parser");
const expresslayouts = require("express-ejs-layouts");
const app = express();
const port = 8000;
const db = require("./config/mongoose");

// using for session cookie and auth using passport
const session = require('express-session');
const passport = require('passport');
const passportLocal = require("./config/passport-local");
//const MongoStore = new require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");

//setting u the cookies 
app.use(express.urlencoded());
app.use(cookieparser());

//setting a static file
app.use(express.static("./assets"));
// setting layouts
app.use(expresslayouts);
//setting css file to the header of the ejs auto for diff layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

//setting ejs file
app.set('view engine','ejs'); 
//setting views folder
app.set("views","./views");
//mongo session is used to store the session cookie in the db
app.use(session({

    name:"codeial",
    //to do change the secret before deployment in production none
    secret:"blashsomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    // store:new MongoStore(
    //     {
      
    //         mongooseConnection:db,
    //         autoRemove:"disabled"
 
    // },
    // function(err){
    //     console.log("connect-mongodb setup ok");
    // }
    // )
 }));
   
 app.use(passport.initialize());
 app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//setting routes
app.use("/",require("./routes"));
app.listen(port,function(err){
    if(err){
        console.log(`error in running the surver : ${err}`);
        return;
    }
    console.log(`server is running on a port : ${port} `);

});
 
