//接口统一地址
import http from '.' //./index

//登录
export const login = data => http.post("user/login", data);

//退出
export const logout = data => http.post("user/logout", data);

//用户信息
export const userInfo = () => http.get("user/info");

//地图数据 员工分布
export const getMap = () => http.get("user/employ-map");

//查询所有员工
export const getEmployee = () => http.get("user/employee");

//创建办公申请
export const  submitOfficeApply= (data) => http.post("apply/office/createOrUpd",data);

//获取省市数据
export const getArea = () => http.get("user/area");

//创建差旅申请
export const  submitTravelApply= (data) => http.upload("apply/travel/createOrUpd",data);

//创建请假申请
export const  submitLeaveApply= (data) => http.post("apply/leave/createOrUpd",data);

//办公审批-列表分页查询
export const officeList = (data)=>http.get("apply/office/list",data);

//差旅审批-列表分页查询
export const travelList = (data)=>http.get("apply/travel/list",data);

//请假审批-列表分页查询
export const leaveList = (data)=>http.get("apply/leave/list",data);

//办公审批-提交
export const submitOfficeManage = (data)=>http.post("apply/office/submitToApprove",data);

//差旅审批--提交
export const submitTravelManage = (data)=>http.post("apply/travel/submitToApprove",data);

//请假审批--提交
export const submitLeaveManage = (data)=>http.post("apply/leave/submitToApprove",data);

//办公审批-删除
export const delOfficeManage = (id)=>http.delete(`apply/office/delete/${id}`);

//差旅审批-删除
export const delTravelManage = (id)=>http.delete(`apply/travel/delete/${id}`);

//请假审批-删除
export const delLeaveManage = (id)=>http.delete(`apply/leave/delete/${id}`);

//审批流程  一审
export const oneList = data => http.get(`approve/one/list`,data); 

//审批流程  一审通过
export const onePass = data => http.post(`approve/one/pass`,data); 

//审批流程  一审驳回
export const oneReject = data => http.post(`approve/one/reject`,data); 

//审批流程  二审
export const twoList = data => http.get(`approve/two/list`,data); 

//审批流程  二审通过
export const twoPass = data => http.post(`approve/two/pass`,data); 

//审批流程  二审驳回
export const twoReject = data => http.post(`approve/two/reject`,data); 

//审批流程  终审
export const endList = data => http.get(`approve/end/list`,data); 

//审批流程  终审通过
export const endPass = data => http.post(`approve/end/pass`,data); 

//审批流程  终审驳回
export const endReject = data => http.post(`approve/end/reject`,data); 

//档案管理  查询
export const docList = data => http.get(`doc/list`,data); 

//档案管理 生成凭证
export const createFile = data => http.post(`doc/createFile`,data); 

//档案管理 下载凭证
export const docDownload = data => http.get(`doc/download`,data);

//权限管理 创建员工与审批员
export const createPermission = data => http.post(`permission/createUser`,data); 

//权限管理 查询员工与审批员列表
export const userList= data => http.get(`user/list`,data);

//权限管理 查询员工与审批员列表 删除
export const permissionRemove = (id)=>http.delete(`permission/removeUser/${id}`);

//权限管理-查询审批员权限
export const permissionList = () => http.get(`permission/list`);

//权限管理-修改审批员权限
export const updatePermission = data => http.post(`permission/create-or-upd`,data); 