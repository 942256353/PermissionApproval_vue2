 const approvalApply = {
    path: '/approvalApply',//申请类别
    name: 'approvalApply',
    component: () => import('@/views/Home/approvalApply/index.vue'),
    children: [
        {
            path: 'officeApply',//办公审批
            name: 'officeApply',
            component: () => import('@/views/Home/approvalApply/officeApply/index.vue')
        },
        {
            path: 'leaveApply',//请假审批
            name: 'leaveApply',
            component: () => import('@/views/Home/approvalApply/leaveApply/index.vue')
        },
    ]
}
export default approvalApply;