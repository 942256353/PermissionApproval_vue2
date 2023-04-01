//全局过滤器
/**
 * 审批状态过滤器
 * @param {number}
 * @return {string}
 */
export function statusFilter(val) {
    switch (val) {
        case 0:
            return "进阶初始";
        case 1:
            return "提交一审";
        case 2:
            return "一审通过";
        case 3:
            return "一审拒绝";
        case 4:
            return "提交二审";
        case 5:
            return "二审通过";
        case 6:
            return "二审拒绝";
        case 7:
            return "提交终审";
        case 8:
            return "终审通过";
        case 9:
            return "终审拒绝";
        case 10:
            return "审批完成";
        case 11:
            return "生成凭证";
        default:
            return val;
    }
}

/**
 * 审批状态样式
 * @param {number}
 * @return {string}
 */
export function statusStyle(val) {
    switch (val) {
        case 0:
            return "";
        case 1:
            return "";
        case 2:
            return "success";
        case 3:
            return "warning";
        case 4:
            return "";
        case 5:
            return "success";
        case 6:
            return "warning";
        case 7:
            return "";
        case 8:
            return "success";
        case 9:
            return "danger";
        case 10:
            return "success";
        case 11:
            return "info";
        default:
            return '';
    }
}

/**
 * 日期处理
 * @data {string Date}
 * @return {string} yyyy-MM-dd
 */
export function formatDate(data) {
    const date = new Date(data);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}

/**
 * 日期时间处理
 * @data {string Date}
 * @return {string} yyyy-MM-dd HH:mm:ss
 */
export function formatDateTime(data) {
    const date = new Date(data);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let HH = date.getHours();
    HH = HH < 10 ? ('0' + HH) : HH;
    let mm = date.getMinutes();
    mm = mm < 10 ? ('0' + mm) : mm;
    let ss = date.getSeconds();
    ss = ss < 10 ? ('0' + ss) : ss;
    return y + '-' + m + '-' + d + ' ' + HH + ':' + mm + ':' + ss;
}

/**
 * 编辑提交按钮过滤器
 * @param {number}
 * @return {boolean}
 */
export function btnController(val) {
    switch (val) {
        case 0: return false;
        case 3: return false;
        case 6: return false;
        case 9: return false;
        default: return true;
    }
}

/**
 * 删除按钮过滤器
 * @param {number}
 * @return {boolean}
 */
 export function btnDelController(val) {
    switch (val) {
        case 0: return false;
        case 3: return false;
        case 6: return false;
        case 9: return false;
        case 10: return false;
        case 11: return false;
        default: return true;
    }
}

/**
 * 申请类别
 * @param {number}
 * @return {string}
 */
 export function categoryFilter(val) {
    switch (val) {
        case 1:
            return "办公审批";
        case 2:
            return "差旅审批";
        case 3:
            return "请假审批";
        default:
            return val;
    }
}

/**
 * 申请类别 样式
 * @param {number}
 * @return {string}
 */
 export function categoryStyle(val) {
    switch (val) {
        case 1:
            return "success";
        case 2:
            return "warning";
        case 3:
            return "";
        default:
            return val;
    }
}

/**
 * 权限分配
 * @param {number}
 * @return {string}
 */
 export function role_nameFilter(val) {
    switch (val) {
        case 'input':
            return "员工";
        case "approve":
            return "审批管理员";
        case "administrator":
            return "超级管理员";
        default:
            return val;
    }
}

/**
 * 权限分配样式
 * @param {number}
 * @return {string}
 */
 export function role_nameStyle(val) {
    switch (val) {
        case 'input':
            return "";
        case "approve":
            return "warning";
        case "administrator":
            return "danger";
        default:
            return "";
    }
}
