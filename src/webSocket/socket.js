import store from '@/store';
import app from '@/main'
let wsConnectionOrder = {
  $wsOrder: null,
  lockReturn: false,
  timeout: 60 * 1000 * 5,
  timeoutObj: null,
  timeoutNum: null,
  //初始化webSocket长连接
  initWebSocket: function () {
    this.$wsOrder = new WebSocket("ws://121.43.36.101:8080");
    this.$wsOrder.onopen = this.wsOpen;
    this.$wsOrder.onclose = this.wsClose;
    this.$wsOrder.onmessage = this.wsMsg;
    this.$wsOrder.onerror = this.wsError;
  },
  //打开websocket
  wsOpen: function (e) {
    //开始websocket心跳
    wsConnectionOrder.startWsHeartbeat();
    app.$message.success("WebSocket连接成功");
  },
  wsClose: function (e) {
    // wsConnectionOrder.reconnect()
    app.$message.error("WebSocket连接断开");
  },
  wsMsg: function (e) {
  //服务端发送来的消息存到vuex（先存储消息再重置心跳）
    let res = JSON.parse(e.data);
    store.commit('web_socket_msg', res)
    //每次接收到服务端消息后 重置websocket心跳
    wsConnectionOrder.resetHeartbeat();
  },
//   wsError: function (err) {
//     wsConnectionOrder.reconnect()
//   },
  //重启websocket
  reconnect: function () {
    console.log('重启函数')
    let _this = this;
    if (_this.lockReturn) {
      return;
    }
    _this.lockReturn = true;
    _this.timeoutNum && clearTimeout(_this.timeoutNum);
    _this.timeoutNum = setTimeout(function () {
      //_this.wsClose();
      _this.initWebSocket();
      _this.lockReturn = false;
    }, 1000);
  },
  //开启websocket
  startWsHeartbeat: function () {
    let _this = this;
    _this.timeoutObj && clearInterval(_this.timeoutObj);
    _this.timeoutObj = setInterval(function () {
    //发送消息给服务端
    _this.$wsOrder.send('');
      //判断websocket当前状态
      if (_this.$wsOrder.readyState != 1) {
        _this.reconnect()
      }
    }, _this.timeout);
  },
  //重置websocket心跳
  resetHeartbeat: function () {
    let _this = this;
    clearInterval(_this.timeoutObj);
    _this.startWsHeartbeat()
  }
};

//抛出websocket对象
export default {
  wsConnectionOrder
}
