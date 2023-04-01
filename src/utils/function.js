import Vue from 'vue'
let vm = new Vue();
/**
 * 防抖
 * @callback {Function}
 * @delay {number}
 * @return {Function}
 */
export function debounce(callback, delay) {
    let timer;
    return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            callback.call(this)
        }, delay)
    }
}

/**
* 审批状态筛选
* @tableData {Array}
* @e {Object}  $vm
* @return {Array}
*/
export function filterStatus(tableData, e) {
    //去重
    let map = new Map();
    for (let item of tableData) {
        let v = { ...item };
        if (!map.has(v)) {
            v.text = e.$options.filters["statusFilter"](v.status);
            map.set(v.status, v);
        }
    }
    const data = [...map.values()];
    return data.map((item) => ({ text: item.text, value: item.status }));
}

/**
 * 日期筛选
 * @tableData {Array}
 * @e {Object}  $vm
 * @return {Array}
 */
export function filterDate(tableData, e) {
    //去重
    let map = new Map();
    for (let item of tableData) {
        let v = { ...item };
        if (!map.has(v)) {
            v.date = e.$options.filters["formatDate"](v.created);
            map.set(v.date, v);
        }
    }
    const data = [...map.values()];
    return data.map((item) => ({ text: item.date, value: item.date }));
}

/**
* 审批状态筛选
* @tableData {Array}
* @e {Object}  $vm
* @return {Array}
*/
export function filterCategory(tableData, e) {
    //去重
    let map = new Map();
    for (let item of tableData) {
        let v = { ...item };
        if (!map.has(v)) {
            v.text = e.$options.filters["categoryFilter"](v.app_type);
            map.set(v.app_type, v);
        }
    }
    const data = [...map.values()];
    return data.map((item) => ({ text: item.text, value: item.app_type }));
}

/**
*单页字段筛选功能
*/
export function filterHandler(value, row, column) {
    const property = column["property"];
    if (property === "created") {
        return vm.$options.filters["formatDate"](row[property]) === value;
    } else {
        return row[property] === value;
    }
}

/**
*表格斑马纹
*/
export function tableRowClassName({ row, rowIndex }) {
    if (rowIndex % 2 === 0) {
        return "warning-row";
    } else {
        return "success-row";
    }
}

/**
* 权限分配筛选
* @tableData {Array}
* @e {Object}  $vm
* @return {Array}
*/
export function filterRole_name(tableData, e) {
    //去重
    let map = new Map();
    for (let item of tableData) {
        let v = { ...item };
        if (!map.has(v)) {
            v.text = e.$options.filters["role_nameFilter"](v.role_name);
            map.set(v.role_name, v);
        }
    }
    const data = [...map.values()];
    return data.map((item) => ({ text: item.text, value: item.role_name }));
}

//深拷贝
//例
// let obj={
//     num:12,
//     str:"xxx",
//     fn:function(){console.log(6)},
//     map:new Map([['d',8],['e','9']]),
//     set:new Set([10,11]),
//     reg:/7/,
//     array:[1,2],
//     arrOfObj:[{a:3,b:4}],
//     obj:{c:5}
// }
//环形对象
// let obj2 ={
//     to:obj
// }
// obj.to = obj2
//缓存 判断对象是否处理过  WeakMap性能优化，Map对数据的引用是一种强引用，
//会在gc垃圾回收的算法中作为一次引用计数的增加，所以需要弱（虚）引用
//会增加最终释放引用计数为0的复杂的
let cached = new WeakMap()
/**
*
* @param obj 原对象
* @returns 克隆对象
*/
export function deepClone(obj) {
    if (cached.has(obj)) {
        return cached.get(obj);
    }
    if (typeof obj !== 'object' || !obj) {

        return obj;
    }
    let tmp;
    if (obj instanceof Map) {
        tmp = new Map();
        cached.set(obj, tmp);
        for (let { key, val } of obj) {
            tmp.set(deepClone(key), deepClone(val))
        }
    } else if (obj instanceof Set) {
        tmp = new Set();
        cached.set(obj, tmp);
        for (let val of obj) {
            tmp.add(deepClone(val))
        }
    } else if (obj instanceof (RegExp)) {
        tmp = new RegExp(obj);
        cached.set(obj, tmp);
    } else {
        tmp = new obj.constructor();
        cached.set(obj, tmp);
        for (let key in obj) {
            tmp[key] = deepClone(obj[key]);
        }
    }
    return tmp;
}
