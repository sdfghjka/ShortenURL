const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
app.set("view engine",".hbs");
app.set("views","./views");
const port = 3000;
const router = require('./routers');
const mongoose = require('mongoose');
//
app.engine(".hbs", engine({extname:".hbs"}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

//
mongoose.connect("mongodb+srv://kxnenao100:kxnenao100@cluster0.nlbzj.mongodb.net/URLs")
.then(()=>{
    console.log("database was successful connected")
})
.catch((err)=>{
 console.log(err)
})

app.use(router);


app.listen(port,()=>{
    console.log(`express server is running on http://localhost:${port}`);
})

