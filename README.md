# vue2-project
这是一套基于vue2+element-ui搭建的一套流程审批权限管理系统，构建工具用的vue-cli，其中涉及到一些第三方插件或组件有vue-router、vuex、vuex-persistedstate、axios、echarts、md5、vue-count-to、vue-i18n等等，打包优化主要gzip代码压缩、代码拆分、内网打包等方法。

#1
项目介绍：流程审批权限系统为解决企业员工日常办公、差旅、请假等审批申请、管理而定制，企业员工提交申请
后，企业审批员拥有“一审”“二审”“终审”的权限；超级管理员可管理所有权限，不同角色所能看到和操作的页面不用。

#2
我们以常见的办公流程审批为例，向上级申请一台新电脑，
申请状态：登录员工信息，提交申请人-申请日期-申请商品-商品数量-申请原因等信息。
管理状态：申请管理中查看审批状态；可编辑、删除、提交申请数据；
审批状态：也就是我们从发起审批流程到上级审批再到最终通过或者驳回，一共分三等级“一审”“二审”
“终审”。
请假审批包含2天内只有一审，>2-5天需要二审，>5天需要终审
差旅审批报销金额<200元一审 ， >200-1000元二审， >1000元终审
办公审批只有一审；
审批状态：
- 0-进阶初始状态
- 1-提交一审状态
- 2-一审通过状态
- 3-一审拒绝状态
- 4-提交二审状态
- 5-二审通过状态
- 6-二审拒绝状态
- 7-提交终审状态
- 8-终审通过状态
- 9-终审拒绝状态
- 10-审批完成状态
- 11-生成凭证状态
#3
档案管理：申请成功，下载凭证；

#4
权限管理：创建员工与审批员；设置审批员权限，比如某审批员设置拥有”一审“”二审“，模块展示只有此选项
# 项目演示地址：http://121.43.36.101:9002/vue2/#/login      账号密码：admin admin@123
![image](https://github.com/942256353/PermissionApproval_vue2/commit/6f4e9690ce73cabd868cfea5668e5584ee20b1f1#diff-a808a9275d5921ee40c2fc824c336fb7742031b761ca58ada1b7c46178cc2eaa)
![image](https://github.com/942256353/PermissionApproval_vue2/commit/6f4e9690ce73cabd868cfea5668e5584ee20b1f1#diff-7e7705beb65671975d92b1273c7da997529a87c8b9962c47b593e7569be5b8ac)
![image](https://github.com/942256353/PermissionApproval_vue2/commit/6f4e9690ce73cabd868cfea5668e5584ee20b1f1#diff-90052537718bc7b520dd0f5b73e372777f244b6c923b7b7d2c1f5f858aa437e5)
![image](https://github.com/942256353/PermissionApproval_vue2/commit/6f4e9690ce73cabd868cfea5668e5584ee20b1f1#diff-409b06ee1c22e453003463dc404d875066f7ed371aefe21e3c57459f84f95e23)
![image](https://github.com/942256353/PermissionApproval_vue2/commit/6f4e9690ce73cabd868cfea5668e5584ee20b1f1#diff-32a1e3ced8f96e50e3ff506716347638a6b9065809102b52b77276e3f0dee5f1)
![image](https://github.com/942256353/PermissionApproval_vue2/commit/6f4e9690ce73cabd868cfea5668e5584ee20b1f1#diff-1da3ad1190b5b8246f10996f0da5f878de4c7847b488fa74604f908bf354c589)
![image](https://github.com/942256353/PermissionApproval_vue2/commit/6f4e9690ce73cabd868cfea5668e5584ee20b1f1#diff-8e93951b5825f4c164ae81e35c262b47a96067782733e8726654793620f36c63)
![image](https://github.com/942256353/PermissionApproval_vue2/commit/6f4e9690ce73cabd868cfea5668e5584ee20b1f1#diff-8273c147d995dc123595137cd266b25f39ae3108aa809ef77af915caadb2db76)
![image](https://github.com/942256353/PermissionApproval_vue2/commit/6f4e9690ce73cabd868cfea5668e5584ee20b1f1#diff-4109976143501a5ee9f905a5a1983eb467b247d0a8c27a306a47567e06397362)
![image](https://github.com/942256353/PermissionApproval_vue2/commit/6f4e9690ce73cabd868cfea5668e5584ee20b1f1#diff-7740476faf372fe47e3079a152d5f8e23e1cab7945962ec5f07710510039bf35)
![image](https://github.com/942256353/PermissionApproval_vue2/commit/6f4e9690ce73cabd868cfea5668e5584ee20b1f1#diff-7deff4bb557f4c2e7639230f98c9dc5d129008576eb4cea1040c15d82ffea275)
![image](https://github.com/942256353/PermissionApproval_vue2/commit/6f4e9690ce73cabd868cfea5668e5584ee20b1f1#diff-f0917bfbcccbdbf201e0fae1064c5f3ab5a79a5bc14b7e8997e4216beed8b15c)
![image](https://github.com/942256353/PermissionApproval_vue2/commit/6f4e9690ce73cabd868cfea5668e5584ee20b1f1#diff-fad9304526cdc14e7040f9201ce3b9f575d11bdabf5d187a8c2b32b6d31cba96)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
