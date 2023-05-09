const express = require("express");
const req = require("express/lib/request");
require('dotenv').config()
console.log(process.env)
const app = express();
const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, function () {
    console.log(`Express app listening at http://${hostname}:${port}/`);
});

const flickrRouter = require('./routes/flickr');
const indexRouter = require('./routes/index');

app.use(express.static(path.join(__dirname, "public")));
// engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use('/search',flickrRouter);
app.use('/', indexRouter);

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));


