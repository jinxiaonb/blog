define([], function() {

	var initAjax = function(para, callback) {
		ajaxCommont(para, callback);
	}

	function ajaxCommont(para, callback) {
		$.ajax({
			type: "post",
			url: para.url,
			data: para,
			dataType: "json",
			success: function(data) {
				callback(data);
			}
		});
	}
	return {
		initAjax: initAjax
	}
});