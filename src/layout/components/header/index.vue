<template>
  <div class="app-breadcrumb">
    <span class="fold">
      <i
        class="el-icon-s-unfold"
        v-show="isCollapse"
        @click="collapseChange"
      ></i>
      <i
        class="el-icon-s-fold"
        v-show="!isCollapse"
        @click="collapseChange"
      ></i>
    </span>
    <Breadcrumb />
    <div class="right-menu">
      <Lang />
      <el-button type="danger" class="exit" size="mini" @click="exit"
        ><i class="el-icon-switch-button"></i>{{ $t("exit") }}</el-button
      >
    </div>
    <div class="right-menu">
      <div class="fullscreen">
        <FullScreenVue
          slot="fullscreen"
          id="FullScreenVue"
        ></FullScreenVue>
      </div>
      <div class="username">
        <span>{{ username }}</span>
        <el-tag
          :type="roles[0]?.name | role_nameStyle"
          effect="light"
          size="mini"
        >
          {{ $t(`${roles[0]?.name}`)}}
        </el-tag>
      </div>
      <el-avatar
        shape="square"
        fit="fill"
        :size="30"
        :src="url"
        class="avatar"
      />
    </div>
    <Tag class="tag" />
  </div>
</template>
<script>
import Breadcrumb from "./breadcrumb.vue";
import { removeToken } from "@/utils/auth";
import Lang from "./Lang.vue";
import Tag from "./tag.vue";
import { mapGetters } from "vuex";
import FullScreenVue from "@/components/fullScreen";
export default {
  components: { Breadcrumb, Lang, Tag, FullScreenVue },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      username: "",
      url: require("@/assets/img/avatar.png"),
      fullscreen: false,
    };
  },
  mounted() {
    this.username = JSON.parse(sessionStorage.getItem("role"));
  },
  computed: {
    ...mapGetters(["roles"]),
  },
  methods: {
    async exit() {
      await this.$store.dispatch("LOGOUT");
      removeToken();
      sessionStorage.removeItem("role");
      this.$router.push("/login");
    },
    collapseChange() {
      this.$emit("update:isCollapse", !this.isCollapse);
    },
  },
};
</script>
<style scoped>
</style>
