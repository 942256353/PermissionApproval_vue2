<template>
  <div>
    <!-- 无子级 -->
    <el-menu-item
      :index="item.url"
      v-if="!item.children"
      @click="handler(item)"
    >
      <i :class="item.icon"></i>
      <span slot="title">{{ $t(`${item.name}`) }}</span>
    </el-menu-item>
    <!-- 有子级 -->
    <el-submenu :index="item.url" v-else>
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title" v-show="!collapse">{{ $t(`${item.name}`) }}</span>
      </template>
      <sideItem v-for="sub in item.children" :key="sub.url" :item="sub" />
    </el-submenu>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "sideItem",
  props: {
    item: {
      type: Object,
      require: true,
    },
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  created() {  
  },
  computed: {
    ...mapGetters(['tagList'])
  },
  methods: {
    handler(item) {
      let repeat = this.$store.state.tag.tagList.some((v) => v.name === item.name);
      if (repeat) return;
      this.$store.commit("addTag", item);
    },
  },
};
</script>
<style scoped></style>
