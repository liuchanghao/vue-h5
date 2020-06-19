const chalk = require('chalk');
const log = console.log;
const { customAlphabet } = require('nanoid');
const dayjs = require('dayjs');
const mapping = require('../dubbo/mapping');

module.exports = {
	//字符串参数去空格（前后中所有空格）
	paramsTrim: (str) => str.replace(/\s/g, ""),
	//日志输出格式
	log: {
		info () {
			log(chalk.green('['+dayjs().format('YYYY-MM-DD HH:mm:ss')+'] '+'[Info]'), ...arguments);
		},
		warn () {
			log(chalk.yellow('['+dayjs().format('YYYY-MM-DD HH:mm:ss')+'] '+'[Warn]'), ...arguments);
		},
		error () {
			log(chalk.red('['+dayjs().format('YYYY-MM-DD HH:mm:ss')+'] '+'[Error]'), ...arguments);
		}
	},
	//生成规则为gh5打头的32位随机字符串拼接为gid
	getGid() {
		const gid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 32);
		return `gh5${gid()}`;
	},
    //序列化java参数类型
	jsToJava: (type, value, className) => mapping[type](className, value)
}