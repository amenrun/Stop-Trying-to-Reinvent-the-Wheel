/*
 * create by amen2020 in April 24, 2016
 * 1.cookie.get(name);
 * 2.cookie.set({key: value});
 * 3.cookie.remove(name);
 */
var cookie = {
	get: function(name) {
		var nameIndex, valueStart, valueEnd;
		if(document.cookie.length > 0) {
			nameIndex = document.cookie.indexOf(name + '=');
			if(nameIndex !== -1) {
				valueStart = nameIndex + name.length + 1;
				valueEnd = document.cookie.indexOf(';', valueStart);
				if(valueEnd === -1) {
					valueEnd = document.cookie.length;
				}
				return decodeURIComponent(document.cookie.substring(valueStart, valueEnd));
			}
		}
		return '';
	},
	set: function(defaults) {
		var defaults = defaults || {},
		    date = new Date(),
		    dateStr;
		if(defaults.seconds) {
			date.setTime(date.getTime() + defaults.seconds * 1000); // 以秒设置cookie过期时间
		}else if(defaults.hours) {
			date.setTime(date.getTime() + defaults.hours * 60 * 60 * 1000); // 以小时设置cookie过期时间
		}else if(defaults.days) {
			date.setTime(date.getTime() + defaluts.days * 24 * 60 * 60 * 1000); // 以天数设置cookie过期时间
		}
		dateStr = date.toUTCString(); // 将Date对象转换为字符串
		document.cookie = encodeURIComponent(defaults.name) + '=' + encodeURIComponent(defaults.value) + ';expires=' + dateStr + ';path=/';
	},
	remove: function(name) {
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
	}
};