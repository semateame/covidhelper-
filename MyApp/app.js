const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
//const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const mongoose = require("mongoose")
const userRouter = require('./routes/users');
const volunteerRouter = require('./routes/volenteer');
const authRouter = require("./routes/auth")
const config = require("config")

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(lessMiddleware(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));


app.use(authRouter)
app.use(userRouter)
app.use(volunteerRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const db = config.get('mongoURI');

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connecting to mongodb");
  }).catch(err => console.error(err));
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`listing on  ${port}`);
})

module.exports = app;
