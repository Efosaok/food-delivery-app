const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");

const routes = require("./routes/index");

app.use(express.static("public"));
app.use("/",routes)
app.use(bodyparser.urlencoded({extended : false}));

app.set("port",(process.env.PORT || 3000));

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');


app.listen(app.get("port"),()=>{
	console.log("app running on port"+" "+app.get("port"));
});
