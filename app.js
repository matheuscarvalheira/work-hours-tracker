var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session"); // Adicionado

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var hoursRouter = require("./routes/hours");
var loginRouter = require("./routes/login"); // Adicionado

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware para verificar se o usuário está logado
function isAuthenticated(req, res, next) {
  if (req.session.username) {
    return next();
  } else {
    res.redirect("/login");
  }
}

// Definindo as rotas
app.use("/login", loginRouter);
app.use("/", isAuthenticated, indexRouter);
app.use("/users", isAuthenticated, usersRouter);
app.use("/hours", isAuthenticated, hoursRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
