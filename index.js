const express = require('express');
const path = require("path");
const flash = require('express-flash')
const methodOverride = require('method-override')
const cookieParser= require("cookie-parser")
const session = require("express-session")
const bodyParser = require('body-parser')
const app = express();
app.use(methodOverride('_method'))
const moment = require("moment");
require("dotenv").config();
const port = process.env.PORT; 
const route = require("./routes/client/index.route")
const routeAdmin = require("./routes/admin/index.route")
const database = require("./config/database");
database.connect();
app.use(bodyParser.urlencoded({extended:false}))
//flash 
 app.use(cookieParser('keyboard cat'));
  app.use(session({ cookie: { maxAge: 60000 }}));
  app.use(flash());
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, 'public')));
//format time 
app.locals.moment= moment;
//Tinymce 
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
route(app);
routeAdmin(app);
app.use((req, res) => {
  res.status(404).render("client/pages/error/404", {
    pageTitle: "Not Found"
  });
});

app.listen(port, ()=>{
    console.log(`The server is running at ${port}`)
})