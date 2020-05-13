var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
//日志处理
//const log4js = require('log4js');
//const Logger = require('./config/logger');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var alarmRouter = require('./routes/alarm');
var tableSpaceRouter = require('./routes/tableSpace');
var sectionSpaceRouter = require('./routes/section');
var sqlReportRouter = require('./routes/sqlReport');
var sqlBindRouter = require('./routes/sqlBind');
var tricMetricRouter = require('./routes/tricMetric');
var sessionHistoryRouter = require('./routes/sessionHistory');
var snapshotRouter = require('./routes/snapshot');
var sqlSummayRouter = require('./routes/sqlsummary');
var quoteReportRouter = require('./routes/quoteReport');
var orderReportRouter = require('./routes/orderReport');
var dataDictionaryRouter = require('./routes/dataDictionary');
var hostRouter = require('./routes/host');
var templatesRouter = require('./routes/templates');
var loginRouter = require('./routes/login');

var app = express();

app.use(session({
  secret: 'aegis',
  name: 'sid',
  cookie: ('username', 'aegis',
    {
      path: '/',
      httpOnly: true,
      secure: false,
       maxAge: 12 * 60 * 60 * 1000 
    }),
  resave: true,
  saveUninitialized: false,
 }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
//对urlencoded请求体解析中间件,extended:true 高级模式 false:普通 没有区别
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(log4js.connectLogger(Logger.info,  {level:'auto', format: (req, res, format) =>format(`:method :url  :status  :response-time ms ${res.reqUserId}`)}));
app.use('/',function(req,res, next){
  if (!req.session.sid) {
    if(req.url === '/api/login') {
      next();
    }else {
      res.status(401);
      res.send({
        status: 401,
        error_code: 401,
        data: '用户已过期',
        message: '用户已过期'
      })
    }
  } else if (req.session.sid) {
    next();
  }
});

app.use('/', indexRouter);
app.use('/api/alarm', alarmRouter);
app.use('/api/tabspace', tableSpaceRouter);
app.use('/api/segspace', sectionSpaceRouter);
app.use('/api/sql-report', sqlReportRouter);
app.use('/api/sql-bind', sqlBindRouter);
app.use('/api/curves', tricMetricRouter);
app.use('/api/oracle/session-history', sessionHistoryRouter);
app.use('/api/oracle/awr-snapshot', snapshotRouter);
app.use('/api/oracle/sql-quote/',sqlSummayRouter);
app.use('/api/oracle/quote-report', quoteReportRouter);
app.use('/api/oracle/order-report', orderReportRouter);
app.use('/api/oracle/data-dict', dataDictionaryRouter);
app.use('/api/config/user', usersRouter);
app.use('/api/config/host', hostRouter);
app.use('/api/config/template',templatesRouter);
app.use('/api', loginRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//设置请求头防止cross跨域
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
