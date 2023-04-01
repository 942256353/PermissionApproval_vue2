<template>
     <el-menu :default-active="$route.path" exact class="el-menu-vertical-demo" :collapse="isCollapse" router>
        <SideItem v-for="item in get_routes" :key="item.url" :item="item"  :collapse="isCollapse"/>
     </el-menu>
</template>
<script>
import SideItem from './sideItem.vue';
import {mapGetters} from 'vuex'
export default {
    components: { SideItem },
    props:{
        isCollapse:{
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
        }
    },
    created() {
    },
    computed: {
        ...mapGetters(['get_routes'])
    },
    methods: {
    },
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
