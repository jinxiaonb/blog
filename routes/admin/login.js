var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('admin/login', {
		title: 'Login'
	});
});

// /login/28
router.get('/login/:id', function(req, res, next) {
	res.render('admin/login', {
		title: req.params.id
	});
});


//这个必须是post请求哦，get请求不到滴
router.post('/test', function(req, res, next) {
	console.log("test");
	console.log(req.body);
	console.log(req.params);
	console.log(req.query.name);
	res.send({
		username: req.body.name,
		psd:req.body.psd
	});
});

module.exports = router;