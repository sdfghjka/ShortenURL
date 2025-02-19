require('dotenv').config();
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
app.set("view engine",".hbs");
app.set("views","./views");
const PORT = process.env.PORT || 3000;
const router = require('./routers');
const mongoose = require('mongoose');

app.engine(".hbs", engine({extname:".hbs"}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());


const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));
//
// mongoose.connect("mongodb+srv://kxnenao100:kxnenao100@cluster0.nlbzj.mongodb.net/URLs")
// .then(()=>{
//     console.log("database was successful connected")
// })
// .catch((err)=>{
//  console.log(err)
// })

app.use(router);


app.listen(PORT,()=>{
    console.log(`express server is running on http://localhost:${PORT}`);
})

