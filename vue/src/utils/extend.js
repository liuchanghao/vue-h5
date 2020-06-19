const getSessionStorage = async (key, _default) => {
	// _default = typeof _default !== 'undefined' ? _default : '{}';
	var obj = window.sessionStorage.getItem(key);
	try {
		obj = JSON.parse(obj);
	} catch(e) {
		obj = null;
	}
	// return obj || _default
	return obj;
};

const setSessionStorage = async (key, info) => {
	return window.sessionStorage.setItem(key, JSON.stringify(info));
};

/**
 * 验证车牌号（新能源+非新能源） 
 */
const isLicensePlateNumber = value => /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/g.test(value);

/** 
 * 验证电子邮箱 
 */
const isEmail = value => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g.test(value);

//获取url参数， name 参数名称
const getUrlParam = (name, origin = null) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = null;
    if (origin == null) {
        r = window.location.search.substr(1).match(reg);
    } else {
        r = origin.substr(1).match(reg);
    }
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

export default {
    install(Vue) {
        Vue.prototype.$getSessionStorage = getSessionStorage;
		Vue.prototype.$setSessionStorage = setSessionStorage;
		Vue.prototype.$isLicensePlateNumber = isLicensePlateNumber;
		Vue.prototype.$isEmail = isEmail;
		Vue.prototype.$getUrlParam = getUrlParam;
    },
    getSessionStorage,
	setSessionStorage,
}