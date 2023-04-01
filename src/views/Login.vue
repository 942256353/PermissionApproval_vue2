<template>
    <div class="login-head">
        <div class="login-img">
        </div>
        <div class="about">
            <h2>权限管理流程审批系统</h2>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="account">
                    <el-input v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {login} from '@/api/api';
import md5 from 'md5'
import {setToken} from '@/utils/auth'
export default {
    data() {
        // const validatePhone = (rule, value, callback) => {
        //     //正则
        //     let regx = /^1[34578]\d{9}$/;
        //     if (!value) {
        //         return callback(new Error("请输入手机号！"));
        //     }
        //     if (!regx.test(value)) {
        //         return callback(new Error("手机号错误！"));
        //     }
        // }
        return {
            ruleForm: {
                account: "admin",
                password: "admin@123"
            },
            rules: {
                //基本校验
                account: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur' }
                ],
                //函数校验
                // account: [
                //     { validator: validatePhone, trigger: 'blur' }
                // ]
            }


        }
    },
    created() {
    },
    computed: {
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(async(valid) => {
                if (valid) {
                    // alert('submit!');
                    //加密密码
                    this.ruleForm.password = md5(this.ruleForm.password);
                    //请求发送
                    const res = await login(this.ruleForm);
                    let {code,data} = res.data;
                    if(code===20000){
                        setToken(data.token);
                        sessionStorage.setItem('role',JSON.stringify(data.account));
                        this.$router.push('/home');
                    }
                } else {
                    return false;
                }
            });
        },
    },
}
</script>
<style scoped></style>
