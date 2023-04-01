
const state = {
    tagList: [{
        title: "企业首页",
        url: "/index",
        icon: "el-icon-s-home",
        name: "index",
        component: "index"
    },]
}
const getters = {
    tagList: tagList => state.tagList
}
const mutations = {
    addTag(state, data) {
        state.tagList.push(data);
    },
    delTag(state, i) {
        state.tagList.splice(i, 1);
    }
}

export default {
    state,
    mutations,
    getters
}
