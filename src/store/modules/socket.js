const state = {
    orderWebSocketMsg: '',//存放的键值对就是所要管理的状态(全局可以访问的state对象)
}

const mutations = {
    web_socket_msg(state, msg) {//自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        state.orderWebSocketMsg = msg;
    }
}

export default {
    state,
    mutations,
}
