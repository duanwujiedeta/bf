<template>
  <el-dropdown
    @command="handleCommand1"
    style="line-height: 19px; margin-right: 20px; color: #fff"
  >
    <span class="el-dropdown-link" style="cursor: pointer">
      <span
        style="
          vertical-align: middle;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 150px;
          display: inline-block;
        "
        :style="isblack ? 'color: #141414;' : 'color: #fff;'"
        >{{ userObject.email }}</span
      >
      <i
        style="margin-left: 4px; vertical-align: middle"
        :style="isblack ? 'color: #141414;' : 'color: #fff;'"
        class="iconfont icon-_down"
      ></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="quit" style="color: #202323">
        <div
          style="padding: 0 20px; margin: 0 -20px"
          @click="showShopAndComList"
        >
          <i
            class="el-icon-office-building"
            style="
              vertical-align: baseline;
              margin-right: 8px;
              font-size: 20px;
              line-height: 20px;
              vertical-align: middle;
            "
          ></i
          >查看企业/店铺
        </div>
      </el-dropdown-item>
      <el-dropdown-item style="color: #202323">
        <div @click="showChangePwd">
          <i
            class="iconfont icon-_icon-lock"
            style="
              vertical-align: baseline;
              margin-right: 8px;
              font-size: 20px;
              line-height: 20px;
              vertical-align: middle;
            "
          ></i
          >修改密码
        </div>
      </el-dropdown-item>
      <el-dropdown-item style="color: #202323">
        <div @click="deregistration">
          <i
            class="el-icon-switch-button"
            style="
              vertical-align: baseline;
              margin-right: 8px;
              font-size: 20px;
              line-height: 20px;
              vertical-align: middle;
            "
          ></i
          >注销账号
        </div>
      </el-dropdown-item>
      <el-dropdown-item command="quit" style="color: #202323">
        <div style="padding: 0 20px; margin: 0 -20px" @click="open">
          <i
            class="iconfont icon-_quit"
            style="
              vertical-align: baseline;
              margin-right: 8px;
              font-size: 20px;
              line-height: 20px;
              vertical-align: middle;
            "
          ></i
          >退出登录
        </div>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    userObject: {
      type: Object,
      default: () => {},
    },
    clearInfo: {
      type: Function,
    },
    showShopAndComList: {
      type: Function,
    },
    isblack: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    deregistration() {
      this.$store.state.showDeregistration = true;
    },
    showChangePwd() {
      this.$set(this.$store.state, "showChangePwd", true);
    },
    handleCommand1(command) {
      // this.$message("click on item " + command);
    },
    open() {
      this.$confirm("是否退出该账号？", "退出账号", {
        distinguishCancelAndClose: false,
        lockScroll: false,
        confirmButtonText: "退出",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.loginOut();
        })
        .catch((action) => {});
    },
    async loginOut() {
      let res = await this.$http.get("account/logout", {});
      if (res.code == 0) {
        this.loginOutShop();
        localStorage.clear();
        this.clearInfo();
        this.$message.success("退出成功");
      }
      this.loadingRegister = false;
    },
    loginOutShop() {
      let config = {};
      if (process.env.NODE_ENV == "development") {
        config.baseURL = "/api";
      } else {
        config.baseURL = process.env.VUE_APP_SHOP_API_URL;
      }
      this.$http.post(
        "pw/seller/login-out",
        {
          $hideMsg: true,
        },
        config
      );
    },
  },
};
</script>

<style lang="less" scoped></style>
