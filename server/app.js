const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routeManager = require("./routes");

mongoose.Promise = global.Promise;

require("dotenv").config({ path: "variables.env" });

//mongoose.connect(process.env.DEV_DB,options);
mongoose
  .connect(process.env.DATABASE)
  .then(result => {
    console.log(
      `connection successfully to database ${process.env.DATABASENAME}`
    );
  })
  .catch(err => {
    console.log("ERROR:", err.message);
  });
// mongoose.connection.on('error', (err) => {
//   console.log('ERROR:',err.message);
// });

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));

const UserRouter = require("./routes//users");

app.use("/", routeManager);
app.use("/api/v1/users", UserRouter);

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,authorization"
  );
  next();
});

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      success: false,
      data: err.data,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    success: false,
    data: err.data,
    error: {}
  });
});

//Start server
app.listen(process.env.PORT, function () {
  console.log("Server is running at port:" + process.env.PORT);
});
