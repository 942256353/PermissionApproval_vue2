import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/styles/index.scss"
import '@/filters'
import i18n from './i18n/i18n' //国际化
import socketApi from './webSocket/socket'//引入socket.js文件

import './auto-update'
Vue.prototype.socketApi = socketApi //设为全局对象
// import { Button, Select } from 'element-ui';
// Vue.use(Button)
// Vue.use(Select)
Vue.use(ElementUI);
Vue.config.productionTip = false

//按钮防抖 自定义全局指定 提交以后禁用按钮一段时间，防止重复提交
Vue.directive('noMoreClick', {
  inserted(el, binding) {
    el.addEventListener('click', e => {
      el.classList.add('is-loading')
      let i = document.createElement('i');
      i.classList.add('el-icon-loading');
      el.prepend(i)
      setTimeout(() => {
        i.remove();
        el.classList.remove('is-loading')
      }, 1000)//我这里设置的是2000毫秒也就是2秒
    })
  }
})

//全局组件定义
import '@/components/global'
//路由拦截
import './permission'

let app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
export default app;
