<template>
  <el-dialog
    :close-on-click-modal="false"
    width="480px"
    height="480px"
    :visible.sync="showRegSuccess"
    :before-close="handleClose"
    :showClose="false"
    class="customer-dialog no-padding"
  >
    <div class="reg-content">
      <div class="head-img">
        <img src="~@/assets/images/reg-success.png" />
      </div>
      <div class="head-word">注册成功</div>
      <p class="suc-desc">
        <span>感谢您注册， </span
        >我们为您创建了企业中心，您可以在企业中心管理您的店铺
      </p>
      <p>
        <el-button type="primary" class="login-qiye" @click="handleClose"
          >登录企业中心</el-button
        >
      </p>
      <p
        class="shop-address"
        v-if="successObject.shop_list && successObject.shop_list.length"
      >
        您新注册的店铺地址为：
      </p>
      <p class="shop-name">
        https://{{
          successObject.shop_list && successObject.shop_list.length && successObject.shop_list[0].name
        }}.{{ shopPre }}
      </p>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showRegSuccess: {
      type: Boolean,
      default: false,
    },
    successObject: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      shopPre: process.env.VUE_APP_SHOP_HOST_URL,
    };
  },
  methods: {
    jumpUrl() {
      let item = this.successObject.company_list[0];
      let url = process.env.VUE_APP_QIYE_HOST_URL;
      //去企业
      url =
        url + "?company_id=" + item.id + "&company_name=" + item.company_name;
      window.location.replace(url);
    },
    closeAndLogin() {
      this.$emit("closeSuccAndShowLogin");
    },
    focusFn(inputName) {
      this.inputFocusState[inputName] = true;
    },
    blurFn(inputName) {
      this.inputFocusState[inputName] = false;
    },
    handleClose(done) {
      this.$emit("closeSuccAndShowLogin");
    },
  },
};
</script>

<style lang="less" scoped>
.customer-dialog {
  border-radius: 6px;
  .reg-content {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    text-align: center;
    .head-img {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .head-word {
      text-align: center;
      margin: 40px 0px;
      font-weight: 300;
      color: #171619;
      font-size: 24px;
    }
    .suc-desc {
      // max-width: 287px;
      font-size: 18px;
      margin: 0 auto;
      text-align: left;
      margin-bottom: 20px;
      span {
        font-weight: bold;
        color: #434343;
        font-size: 18px;
      }
    }
    .login-qiye {
      margin-bottom: 28px;
      height: 48px;
    }
    .shop-address {
      color: #b3b1b1;
      font-size: 14px;
    }
    .shop-name {
      color: #187cd6;
      font-size: 14px;
      margin-bottom: 33px;
    }
  }
}
</style>
