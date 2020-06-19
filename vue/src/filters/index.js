/**
 * 金额转换,分转换为元,保留两位小数
 */
const filterMoney = (money = 0) => {
	if(typeof money === 'string') {
		money = parseInt(money);
	}
	return (money / 100).toFixed(2);
};

module.exports = {
    filterMoney
}