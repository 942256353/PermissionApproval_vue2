<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <span>{{$t('currentlLocation')}}:</span>
        <el-breadcrumb-item v-for="item in items" :to="{ path:item.parent?'':item.path }"
            :key="item.url">{{$t(`${item.name}`)}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    data() {
        return {
            items:[]
        }
    },
    mounted() {
        this.getItems(this.$route.matched);
    },
    watch:{
        $route(newValue,oldValue){   
            this.getItems(newValue.matched);
        }
    },
    computed: {
    },
    methods: {
        getItems(val){
            if(val?.[1].name==='index'){ //?.链操作符 val?.[1] === val&&val[1].name
                val = [{path:'/home',name:'home',meta:{title:'企业首页'}}]
            }
            this.items = val;
        }
    },
}
</script>
<style scoped></style>


<!-- if(obj?.id) //链操作符   ??===||-->