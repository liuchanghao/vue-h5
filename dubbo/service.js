/**
 * 【 provider列表 】
 */
const { java } = require('dubbo2.js');
const service = (module.exports = {});

service.userProvider = dubbo =>
    dubbo.proxyService({
        dubboInterface: 'this is dubbo service...', // 完整的包路径
        version: '1.0',
        methods: {
            // demo方法
            demo: (data) => {
                return [java.Long(data.userId)];
            }
        },
    });