import {initRoutes} from '@/utils/routesFn' //将数据转化为路由数据
import menuData from '@/utils/menu.js' //全部菜单数据
import {routes} from '@/router'
import {deepClone} from '@/utils/function'

const state = {
    routeData: [],//路由数据
}
const getters = {
    get_routes:state=>state.routeData
}
const mutations = {
    SET_ROUTES(state,data){
        state.routeData = data;
    }
}
const actions = {
    CHANGEROUTES({ commit }, roleArr) { //roleArr [{id：1,name:"input"}]
        return new Promise((resolve, reject) => {
            //1.取出角色 权限
            let roleName = roleArr.map(v => v.name);
            let rolePermission = roleArr.map(v => v.permission)[0]?.split(',');
            //2.选出home路由对象
            let HomeRoutes = routes.filter(v => v.path === "/home")[0];
            //3.为选出home路由对象添加children子级
            HomeRoutes.children = [];
            //4.动态生成路由数据
            let filterData = [];
            if (roleName.includes('administrator')) {//是否是管理员
                filterData = menuData;
            } else {
                let data = deepClone(menuData)
                filterData = data.filter(v=>v.roles && roleName.some(d=>v.roles.includes(d)));
                if(rolePermission?.length>0){
                    filterData.filter(v=>v.permission).forEach(d=>d.children?.length>0&&(d.children = d.children.filter(h=>rolePermission.indexOf(h.permission)>-1)));
                }
            }   
            initRoutes(filterData, HomeRoutes.children);//将数据转化为路由数据
            //vuex缓存 并返回供导航菜单使用
            commit('SET_ROUTES',filterData);
            resolve(routes);
        })
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}

//['input'].some(v=>['input','approve'].includes(v));
