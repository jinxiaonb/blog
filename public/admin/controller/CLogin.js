define(['reqAjax', 'md5', 'blueimp'], function(reqAjax, md5, blueimp) {
	var initData = function() {

	}

	var initEvent = function() {
		console.log(hex_md5);
		console.log(blueimp);
		var psd = hex_md5("123456"); //e10adc3949ba59abbe56e057f20f883e
		console.log(psd);
		var psd2 = blueimp("123456");
		console.log(psd);
		$(document).on("click", ".btn-login", function() {


			var para = {
				name: "jinxiao",
				psd: "123456"
			};
			$.ajax({
				type: "post",
				url: "/admin/test",
				data: para,
				dataType: "json",
				success: function(data) {
					console.log(data);
				}
			});
		});
	}

	return {
		initData: initData,
		initEvent: initEvent
	}
});