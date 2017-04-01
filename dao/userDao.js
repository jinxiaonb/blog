var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

//使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql));


var jsonWrite = function(res, ret) {
	if (typeof ret === 'undefined') {
		res.json({
			code: '1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function(req, res, next) {
		pool.getConnection(function(err, connection) {
			var param = req.query || req.params;

			connection.query($sql.insert, [param.name, param.age], function(err, result) {
				console.log("add:" + result);
				if (result) {
					result = {
						code: 200,
						msg: '增加成功'
					};
				}
				jsonWrite(res, result);

				connection.release();
			});
		});
	},
	queryById: function(req, res, next) {
		pool.getConnection(function(err, connection) {
			var param = req.query || req.params;
			var id = +req.query.id;
			connection.query($sql.queryById, [param.id], function(err, result) {
				console.log("queryById:" + result);
				if (result) {
					jsonWrite(res, result);
					// result = {
					// 	code: 200,
					// 	msg: '单用户查询成功'
					// };
				}
				//jsonWrite(res, result);

				connection.release();
			});
		});
	},
	queryAll: function(req, res, next) {
		pool.getConnection(function(err, connection) {
			var param = req.query || req.params;

			connection.query($sql.queryAll,  function(err, result) {
				console.log("queryAll:" + result);
				if (result) {
					jsonWrite(res, result);
					// result = {
					// 	code: 200,
					// 	msg: '单用户查询成功'
					// };
				}
				//jsonWrite(res, result);

				connection.release();
			});
		});
	}
};