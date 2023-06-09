import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import app from '@/main'
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.interceptors.request.use(config => {
    config.headers['token'] = getToken();
    return config;
})

axios.interceptors.response.use(res => {
    let { code, msg } = res.data;
    if (code !== 20000) {
        Message({
            message: msg || "服务器不给力",
            type: 'warning',
            duration: 2000
        });
        if (code == 10000) {
            app.$router.push('./login');
        }
        return;
    }
    return res
}, err => {
    return Promise.reject(err)
})

export default axios