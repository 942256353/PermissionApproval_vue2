<template>
  <div>
    <el-scrollbar class="scrollbar-container">
      <el-tag
        v-for="(tag, i) in tags"
        :key="tag.url"
        class="mx-2"
        :closable="tag.url !== '/index'"
        :type="defaultUrl === tag.url ? 'warning' : 'primary'"
        @click="handleJump(tag)"
        @close="handleClose(tag, i)"
        size="small"
      >
        {{ $t(`${tag.name}`) }}
      </el-tag>
    </el-scrollbar> 
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      defaultUrl: "",
    };
  },
  computed: {
    tags() {
      return this.$store.state.tag.tagList;
    },
  },
  mounted() {
    this.defaultUrl = this.$route.path || "/index";
  },
  watch: {
    $route(newValue, oldValue) {
      this.defaultUrl = newValue.path || "/index";
    },
  },
  methods: {
    handleJump(tag) {
      if (this.$route.path === tag.url) return;
      this.$router.push(tag.url);
    },
    handleClose(tag, i) {
      let tagList = this.$store.state.tag.tagList;
      tagList.forEach((item, index) => {
        if (item.url == tag.url) {
          this.$store.commit("delTag", index);
        }
      });
      if (this.$route.path !== tag.url) {
        return;
      } else {
        if (i == tagList.length) {
          this.$router.push(tagList[i - 1].url);
        } else {
          this.$router.push(tagList[i].url);
        }
      }
    },
  },
};
</script>
<style scoped>
.el-scrollbar{
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
}
</style>