/**
 * 【 provider列表 】
 */
const { java } = require('dubbo2.js');
const service = ( module.exports = {} );

service.partnerProvider = dubbo =>
	dubbo.proxyService({
		dubboInterface: 'com.xyb.gas.merchant.api.facade.MerchantService',
		version: '1.0',
		methods: {
			findUnique : (data) => {
				return [
					java.combine('com.xyb.gas.merchant.api.order.QueryMerchantOrder', data),
				];
			}
		},
	});