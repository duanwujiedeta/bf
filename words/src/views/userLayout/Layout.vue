<template>
  <el-container class="layout">
    <el-header style="background-color:#171F26;">
      <Header />
    </el-header>
    <el-container style="overflow: auto;">
      <el-main style="overflow: auto;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from "@/views/layout/components/Header";
export default {
  components: {
    Header
  }
};
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
}
</style>