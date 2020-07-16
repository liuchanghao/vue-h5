/**
 * 【 provider列表 】
 */
const { java } = require('dubbo2.js');
const service = ( module.exports = {} );

service.userProvider = dubbo =>
	dubbo.proxyService({
		dubboInterface: 'com.zmn.ums.dubbo.interfaces.user.UserListRemoteService',
		version: '1.0',
		methods: {
			getUserByKey : (data) => {
				return [java.Long(data.userId)];
			}
		},
	});