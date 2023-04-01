export default [
    {
        title: "企业首页",
        url: "/index",
        icon: "el-icon-s-home",
        name: "index",
        component: "index",
        roles:['input','approve']
    },
    {
        title: "申请类型",
        url: "/approvalApply",
        icon: "el-icon-s-marketing",
        name: "approvalApply",
        component: "approvalApply",
        roles:['input'],
        children: [
            {
                title: "办公申请",
                url: "/approvalApply/officeApply",
                icon: "el-icon-office-building", name: "officeApply",
                component: "approvalApply/officeApply"
            },
            {
                title: "差旅申请",
                url: "/approvalApply/travelApply",
                icon: "el-icon-mobile", name: "travelApply",
                component: "approvalApply/travelApply"
            },
            {
                title: "请假申请",
                url: "/approvalApply/leaveApply",
                icon: "el-icon-files",
                name: "leaveApply",
                component: "approvalApply/leaveApply"
            },
        ]
    },
    {
        title: "申请管理",
        url: "/approvalManage",
        icon: "el-icon-s-finance",
        name: "approvalManage",
        component: "approvalManage",
        roles:['input'],
        children: [
            {
                title: "办公审批",
                url: "/approvalManage/officeManage",
                icon: "el-icon-film", name: "officeManage",
                component: "approvalManage/officeManage"
            },
            {
                title: "差旅审批",
                url: "/approvalManage/travelManage",
                icon: "el-icon-notebook-1", name: "travelManage",
                component: "approvalManage/travelManage"
            },
            {
                title: "请假审批",
                url: "/approvalManage/leaveManage",
                icon: "el-icon-notebook-2",
                name: "leaveManage",
                component: "approvalManage/leaveManage"
            },
        ]
    },
    {
        title: '审批流程',
        url: '/approvalProcess',
        icon: 'el-icon-s-order',
        name: 'approvalProcess', component: 'approvalProcess',
        roles:['approve'],
        permission:true,
        children: [
            { title: '一审', url: '/approvalProcess/firstInstance', icon: 'el-icon-s-check', name: 'firstInstance', component: 'approvalProcess/firstInstance',permission:'one'},
            { title: '二审', url: '/approvalProcess/secondInstance', icon: 'el-icon-s-check', name: 'secondInstance', component: 'approvalProcess/secondInstance',permission:'two' },
            { title: '终审', url: '/approvalProcess/lastInstance', icon: 'el-icon-s-check', name: 'lastInstance', component: 'approvalProcess/lastInstance',permission:'end' }
        ]
    },
    {
        title: "档案管理",
        url: "/fileManage",
        icon: "el-icon-s-management",
        name: "fileManage",
        component: "fileManage",
        roles:['input']
    },
    {
        title:'权限管理',
        url:'/powerManage',
        icon:'el-icon-s-promotion',
        name:'powerManage',component:'powerManage',
        children:[
          {title:'创建员工与审批员',url:'/powerManage/createUser',icon:'el-icon-sell',name:'createUser',component:'powerManage/createUser'},
          {title:'员工与审批员列表',url:'/powerManage/userLists',icon:'el-icon-bank-card',name:'userLists',component:'powerManage/userLists'},
          {title:'审批员权限',url:'/powerManage/modifyPower',icon:'el-icon-price-tag',name:'modifyPower',component:'powerManage/modifyPower'}
        ]
    },
    // {
    //     title: "全局组件",
    //     url: "/test",
    //     icon: "el-icon-menu",
    //     name: "test",
    //     component: "test"
    // },
]