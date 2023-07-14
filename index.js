const express = require("express");
const cookieparser = require("cookie-parser");
const expresslayouts = require("express-ejs-layouts");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
//setting u the cookies
app.use(cookieparser());
app.use(express.urlencoded());
//setting a static file
app.use(express.static("./assets"));
// setting layouts
app.use(expresslayouts);
//setting css file to the header of the ejs auto for diff layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);
//setting routes
app.use("/",require("./routes"));
//setting ejs file
app.set('view engine','ejs'); 
//setting views folder
app.set("views","./views");

 
   

app.listen(port,function(err){
    if(err){
        console.log(`error in running the surver : ${err}`);
        return;
    }
    console.log(`server is running on a port : ${port} `);

});
 
