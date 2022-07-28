const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const fs = require('fs');
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const https = require('https');
const helpers = require('./hbshelpers')
const cors = require('cors');
const { workModeChecker } = require('./controllers/utils');

let ALLOWED_ORIGINS = ['https://lsdrugs.pl'];

app.use(cors({
  origin: 'https://lsdrugs.pl'
}))

global.__basedir = __dirname;

// ROUTES 
const admin = require("./routes/admin.routes");
const client = require("./routes/client.routes");

app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use(
  session({
    secret: "sss",
    resave: true,
    saveUninitialized: false,
    secure: true,
    httpOnly: true
  })
);

app.engine("hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    helpers: helpers
  })
);


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use("/admin", admin);

app.use("/", workModeChecker, client);


app.listen(3000);

