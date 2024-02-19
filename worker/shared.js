var data = '';

var ajax = (function () {

	function getParams(data) {
		if (typeof data == 'string') {
			return data;
		}
		var params = [];
		for (var key in data) {
			params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
		}
		return params.join('&');
	}

	/* 封装ajax函数
	 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
	 * @param {string}opt.url 发送请求的url
	 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
	 * @param {object}opt.data 发送的参数，格式为对象类型
	 * @param {function}opt.success ajax发送并接收成功调用的回调函数
	 */
	return function (opt) {
		opt = opt || {};
		opt.type = opt.type.toUpperCase() || 'GET';
		opt.url = opt.url || '';
		opt.async = opt.async || true;
		opt.data = opt.data || null;
		opt.success = opt.success || function () {
		};
		var xmlHttp = null;
		if (self.XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();
		}
		else {
			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		}
		xmlHttp.withCredentials = true;
		var postData = getParams(opt.data);
		if (opt.type === 'POST') {
			xmlHttp.open(opt.type, opt.url, opt.async);
			xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
			xmlHttp.send(postData);
		}
		else {
			xmlHttp.open('GET', opt.url + (opt.url.indexOf('?') >= 0 ? '&' : '?') + postData, opt.async);
			xmlHttp.send(null);
		}
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4) {
				opt.complete && opt.complete();
				if (xmlHttp.status == 200) {
					try {
						var rs;
						if (opt.dataType == 'json') {
							rs = JSON.parse(xmlHttp.responseText);
						} else {
							rs = xmlHttp.responseText;
						}
					} catch (e) {
					}
					opt.success && opt.success(rs);
				} else {
					opt.error && opt.error();
				}
			}
		};
		xmlHttp.onerror = function () {
			opt.error && opt.error();
		}
	}
}());

onconnect = function (e) {
	var port = e.ports[0];

	port.addEventListener("message", function (e) {
		if (e.data == 'get') {
			port.postMessage(data);
		} else {
			data = e.data;
		}
	}, false);

	port.start();
}

ajax({
	url: '//yunmsg.115.com/msg/api/1.0/web/1.0/1/im/get_websocket_host',
	dataType: 'json',
	type: 'get',
	complete: function () {
		getWebSocketHost.doing = false;
	},
	success: function (json) {
		if (json.state) {
			getWebSocketHost.retry = 0;
			callback(json.data)
		} else {
			if (json.code == '601') {
				//未登录
			} else {
				_();
			}
		}
	},
	error: function () {
		_();
	}
})