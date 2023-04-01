//权限处理
import router from './router'
import store from './store'

router.beforeEach(async(to,from,next)=>{
    if(to.path=="/login"){
        next()
    }else{
        let R = store?.getters.roles?.length>0;
        if(R){//用户有角色 
            next()
        }else{
            //1.发送请求 获取角色信息
            let roles = await store.dispatch('USERROLES');
            //2.vuex过滤和处理数据
            let filterRoutes = await  store.dispatch('CHANGEROUTES',roles);
            router.addRoutes(filterRoutes); // vue3 router.addRoute()
            if(roles){
                next({path:to.path});//解决页面刷新的跳转
            }else{
                next({path:'/login'});//没有角色返回登录
            }
        }
    }
})