import {userInfo,logout} from '@/api/api'

const state = {
    roles:[],//角色
}
const getters ={
    roles:state=>state.roles
}
const mutations={
    SETROLES:(state,data)=>{
        state.roles = data; //设置state.roles
    }
}
const actions={
    USERROLES({commit}){//获取用户信息
        return new Promise((resolve,reject)=>{
            userInfo().then(res=>{
                let {data} = res.data;
                commit('SETROLES',data.roles); //获取数据缓存起来
                resolve(data.roles)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    LOGOUT({commit}){//清除用户信息
        return new Promise((resolve,reject)=>{
            logout().then(res=>{
                commit('SETROLES',[]); //角色清空
                resolve()
            }).catch(err=>{
                reject(err)
            })
        })
    }
}
export default{
    state,
    getters,
    mutations,
    actions
}
