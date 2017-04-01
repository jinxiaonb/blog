require.config({
	baseUrl: "/admin",
	paths: {
		"jquery": "lib/jquery",

		"CLogin": "controller/CLogin",

		"reqAjax": "util/reqAjax",

		"md5": "plugin/md5", //md5加密
		"blueimp": "plugin/md5.min" //md5加密
	},
	waitSeconds: 10,
	map: {
		'*': {
			'css': 'lib/css'
		}
	},
	shim: {
		'md5': {
			exports: "md5"
		},
		'blueimp': {
			deps: ['jquery'],
			exports: "blueimp"
		}
	}
});