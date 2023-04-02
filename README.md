# vue2-project
这是一套基于vue2+element-ui搭建的一套流程审批权限管理系统，构建工具用的vue-cli，其中涉及到一些第三方插件或组件有vue-router、vuex、vuex-persistedstate、axios、echarts、md5、vue-count-to、vue-i18n等等，打包优化主要gzip代码压缩、代码拆分、内网打包等方法。


项目介绍：流程审批权限系统为解决企业员工日常办公、差旅、请假等审批申请、管理而定制，企业员工提交申请
后，企业审批员拥有“一审”“二审”“终审”的权限；超级管理员可管理所有权限；
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
档案管理：申请成功，下载凭证；
权限管理：创建员工与审批员；设置审批员权限，比如某审批员设置拥有”一审“”二审“，模块展示只有此
选项

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
