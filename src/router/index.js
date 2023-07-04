import Vue from 'vue'
import VueRouter from 'vue-router'
import approvalApply from './modules/approvalApply'

Vue.use(VueRouter)

/* 解决导航重复报错问题 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export const routes = [
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',//布局
    name: 'home',
    redirect: "/index",
    meta:{title:"企业首页"},
    component: () => import('../layout/index.vue'),
    // children: [
    //   {
    //     path: '/index',//企业首页
    //     name: 'index',
    //     component: () => import('../views/Home/index/index.vue')
    //   },
    //   approvalApply
    // ]
  }
]

// let HomeRoutes = routes.filter(v=>v.path==="/home")[0];
// HomeRoutes.children = [];
// initRoutes(items,HomeRoutes.children);

const router = new VueRouter({
  // mode:'history',
  // base:'/vue2/',
  routes
})

export default router
