<template>
  <div class="menu">
    <el-menu
      :default-active="menuActive"
      class="el-menu-vertical-left"
      :router="true"
    >
      <el-menu-item index="/admin/apps">
        <i class="iconfont iconyingyong"></i>
        <span slot="title">应用</span>
      </el-menu-item>
      <!--   <el-menu-item index="/admin/stores">
        <i class="iconfont icondianpu"></i>
        <span slot="title">店铺</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>
<script>
export default {
  created() {
    // console.log("store");
    // console.log(this.$store);
    // console.log(this.$route);
  },
  computed: {
    menuActive() {
      let path = this.$route.path;
      let rootPath = this.$route.path.split("/");
      let routeName = this.$route.name;
      return "/admin/" + rootPath[2];
    }
  }
};
</script>
<style lang="less" scoped>
.menu {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: #fff;
  overflow: auto;
  padding-top: 20px;
  /deep/.el-menu-vertical-left {
    border-right: none;
  }
  /deep/.el-menu-item,
  .el-submenu__title {
    height: 50px;
    line-height: 50px;
  }
  .el-menu-item {
    i {
      padding-right: 12px;
    }
    &.is-active {
      background: #f4f0ff;
      border-right: 4px solid #6a52fa;
    }
  }
}
</style>
