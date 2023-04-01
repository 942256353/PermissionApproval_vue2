import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from './modules/permission'
import tag from './modules/tag'
import createPersistedstate from 'vuex-persistedstate'
import socket from './modules/socket'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,//用户管理
    permission,//权限管理
    socket,//socket管理
    tag //tag管理
  },
  plugins: [
    createPersistedstate({
      key: 'tagList',
      storage: sessionStorage,
      paths: ['tag.tagList']
    })
  ]
})
