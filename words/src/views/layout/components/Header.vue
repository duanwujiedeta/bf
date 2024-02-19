<template>
  <div class="header">
    <!-- 需要加一个prop属性来设置当前active状态 -->
    <el-menu
      :router="true"
      :default-active="menuActive"
      class="el-menu-ym"
      mode="horizontal"
      background-color="#171F26"
      text-color="#fff"
      active-text-color="#8870FF"
    >
      <li
        class="el-menu-item doc-link ym-center"
        @click="$router.push({name:'admin'},onComplete => {},
onAbort => {})"
      ><span>XShoppy开发者中心</span></li>
      <el-menu-item index="/admin">开发者后台</el-menu-item>
      <li class="el-menu-item doc-link">
        <a
          href="https://docs.xshoppy.com/"
          target="_blank"
        >文档中心</a>
      </li>
      <el-submenu
        index="2"
        class="fr user-center"
      >
        <!-- 
            :style="{backgroundImage:'url(' + scope.row.default_image.file_preview + '?x-oss-process=image/resize,m_lfit,h_50,w_50)'}" -->
        <template slot="title"><span
            class="user-header"
            :style="userInfo&&userInfo.file_key?{backgroundImage:'url('+ $fileCdn + userInfo.file_key + ')'}:''"
          ></span>{{userInfo&&userInfo.email}}</template>
        <li
          class="el-menu-item"
          @click="$router.push({name:'userInfo'},onComplete => {},
onAbort => {})"
        >账号资料</li>
        <li
          class="el-menu-item"
          @click="$router.push({name:'changepwd'},onComplete => {},
onAbort => {})"
        >修改密码</li>
        <li
          class="el-menu-item"
          @click="loginOut"
        >退出登陆</li>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  methods: {
    loginOut() {
      //清除本地缓存
      window.localStorage.removeItem("login_token");
      this.set_userInfo({ name: "expired" });
      this.set_login(false);
      this.$message.success("退出成功");
      setTimeout(() => {
        this.$router.push({ name: "login" });
      }, 1000);
    },
    ...mapMutations({
      set_userInfo: "SET_USERINFO",
      set_login: "SET_LOGIN"
    })
  },
  computed: {
    menuActive() {
      //导航高亮
      let path = this.$route.path;
      let rootPath = this.$route.path.split("/");
      return "/" + rootPath[1];
    },
    ...mapGetters(["userInfo"])
  }
};
</script>
<style lang="less" scoped>
.header {
  .el-menu-ym {
    padding-left: 40px;
    /deep/.user-center {
      .el-submenu__title {
        padding-left: 46px;
        position: relative;
        .user-header {
          position: absolute;
          left: 0px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          top: 50%;
          transform: translateY(-50%);
          background: url(~@/assets/images/header.svg) 0px center/36px 36px
            no-repeat;
        }
      }
      .el-submenu__title {
        background-color: rgb(23, 31, 38) !important;
        i {
          color: #fff;
        }
      }
    }
  }
  /deep/.el-menu-item {
    padding: 0 0;
    margin-right: 45px;
  }
  .el-menu--horizontal > .el-menu-item a {
    display: inline-block;
    height: 100%;
  }
  .doc-link {
    //自定义菜单
    color: #fff;
    background-color: rgb(23, 31, 38);
    &:hover,
    &:active,
    &:focus {
      // background-color: rgb(18, 25, 30) !important;
      background-color: rgb(23, 31, 38) !important;
      color: #ffffff !important;
    }
    &.ym-center {
      padding-left: 42px;
      padding-right: 0px;
      background: url(~@/assets/logo.svg) 0px center/32px 32px no-repeat;
      margin-right: 100px;
      &:hover,
      &:active,
      &:focus {
        color: #fff;
        background-color: rgb(23, 31, 38) !important;
      }
    }
  }
}
.el-menu--horizontal .el-menu .el-menu-item {
  /* 下拉选项 */
  color: rgb(255, 255, 255);
  background-color: rgb(23, 31, 38);
  &:hover {
    background-color: #373d42;
    color: #8870ff;
  }
}
</style>
<style lang="less">
/* .el-menu--popup-bottom-start {
  margin-top: 0px;
  border-radius: 0px !important;
} */
</style>
