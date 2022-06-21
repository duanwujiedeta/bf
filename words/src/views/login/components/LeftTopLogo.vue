<template>
  <div class="left-top-logo">
    <li class="el-menu-item doc-link ym-center">XShoppy开发者中心</li>
    <el-button
      type="text"
      class="doc-btn"
      @click="openDocs"
    >文档中心</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    openDocs() {
      //跳转到啊后台首页
      window.open("https://docs.xshoppy.com/", "_blank");
    }
  }
};
</script>
<style lang="less" scoped>
.left-top-logo {
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
  height: 90px;
  width: 365px;
  justify-content: center;
  align-items: center;
  padding-left: 60px;
  flex-direction: row;
  .ym-center {
    padding-left: 42px;
    padding-right: 0px;
    background: url(~@/assets/logo.png) 0px center/32px 32px no-repeat;
    font-size: 18px;
    font-weight: 500;
    color: #000000;
    cursor: context-menu;
    &::after {
      content: "";
      height: 38px;
      border-right: 1px solid #cccccc;
      margin: 0 20px;
    }
  }
  .doc-btn {
    color: #333333;
    font-size: 14px;
  }
}
</style>
