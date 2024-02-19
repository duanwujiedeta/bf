<template>
  <el-container class="layout">
    <el-header style="background-color:#171F26;overflow: hidden;">
      <Header />
    </el-header>
    <el-container style="overflow: auto;">
      <el-aside
        width="230px"
        style="display:flex;flex-direction:column;"
      >
        <Menu />
      </el-aside>
      <el-main
        style="overflow: auto;"
        v-scrollShow
      >
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from "./components/Header";
import Menu from "./components/Menu";
import { mapMutations } from "vuex";
export default {
  components: {
    Header,
    Menu
  },
  methods: {
    ...mapMutations({
      set_scrolling: "SET_SCROLLING"
    })
  },
  directives: {
    scrollShow: {
      inserted: function(el, binding, vnode) {
        let vm = vnode.context;
        el.onscroll = e => {
          let scrollTop = e.target.scrollTop;
          if (scrollTop > 0) {
            vm.set_scrolling(true);
          } else {
            vm.set_scrolling(false);
          }
        };
      }
    }
  }
};
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
}
</style>