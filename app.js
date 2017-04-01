var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var login = require('./routes/admin/login')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //模板目录
app.set('view engine', 'ejs'); //使用什么模板引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //加载日志中间件
app.use(bodyParser.json()); //加载解析json的中间件
app.use(bodyParser.urlencoded({ //加载解析urlencoded请求的中间件
	extended: true
}));
app.use(cookieParser());//加载解析cookie的中间件
app.use(session({
	secret: 'keyboard cat',
	name:"jinxiao",
	resave:false,
	saveUninitialized:true,
	cookie: {
		maxAge: 60000
	}
}));
app.use(express.static(path.join(__dirname, 'public')));//设置public文件夹为存放静态文件的目录



//路由控制器
app.use('/', index);
app.use('/users', users);

app.use('/admin',login)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
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