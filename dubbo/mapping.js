const jsToJava = require('js-to-java');

/** 
 * js-to-java业务参数转换
*/
module.exports = {
    long: (value) => {
        return jsToJava.revert({ $class: 'java.lang.Long', $: value });
    },
    enums: (className, value) => {
        return jsToJava.enum(className, value);
    },
    list: (className, value) => {
        return jsToJava.List([className, { name: value }]);
    },
    money: (className, value) => {
        return jsToJava.revert({ $class: className, $: { cent: value } });
    },
    date: (value) => {
        return jsToJava.revert({ $class: 'java.util.Date', $: value });
    },
    double: (value) => {
        return jsToJava.revert({ $class: 'java.lang.Double', $: value });
    },
    boolean: (value) => {
        return jsToJava.Boolean(value);
    },
    bigDecimal: (value) => {
        return jsToJava.BigDecimal(value);
    },
}