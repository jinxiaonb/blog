var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
app.use(cookieParser()); //加载解析cookie的中间件
app.use(session({
	secret: 'keyboard cat',
	name:"jinxiao",
	resave:false,
	saveUninitialized:true,
	cookie: {
		maxAge: 60000
	}
}));
var router = express.Router();

var userDao = require('../dao/userDao');



/* GET users listing. */
router.get('/', function(req, res, next) {

	//cookie
	var cur_cookie = cookieParser.JSONCookies(req.cookies);
	//console.log(cur_cookie);
	//设置cookie
	if (cur_cookie.isVisit) {
		//console.log(cur_cookie.isVisit);
		cur_cookie.isVisit = ++cur_cookie.isVisit;
		res.cookie("isVisit", cur_cookie.isVisit); //设置cookie
		res.clearCookie("isVisit"); //清楚cookie
		//console.log(cur_cookie.isVisit);
	} else {
		res.cookie("isVisit", "1");
	}


	/**
	 * session
	 */
	console.log(req.session);
	//console.log(req.seesion.lastPage);
	//req.session.last = "/users";
	if(req.session.lastPage){
		console.log(req.session.lastPage);
	}else{
		req.session.lastPage = "/users";
	}



	res.render('users', {
		title: 'users'
	});
});

router.get('/list', function(req, res, next) {
	res.render('users', {
		title: 'list'
	});
});

router.get('/addUser', function(req, res, next) {
	userDao.add(req, res, next);
});

router.get('/queryById', function(req, res, next) {
	userDao.queryById(req, res, next);
});

router.get('/queryAll', function(req, res, next) {
	userDao.queryAll(req, res, next);
});

module.exports = router;