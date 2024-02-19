<template>
  <el-dialog
    :close-on-click-modal="false"
    width="480px"
    :visible.sync="$store.state.showResetPwd"
    :before-close="handleClose"
    class="customer-dialog"
  >
    <el-form
      ref="registerForm"
      class="customer-form"
      :model="formData"
      label-position="top"
    >
      <el-form-item>
        <p class="start-jz">忘记密码</p>
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
        :class="formData.email || inputFocusState.email ? 'focused-input' : ''"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '邮箱地址不正确',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input
          v-model="formData.email"
          @focus="focusFn('email')"
          @blur="blurFn('email')"
          @change="
            (val) => {
              formData.email = val.trim();
            }
          "
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机号码"
        prop="phone"
        :class="formData.phone || inputFocusState.phone ? 'focused-input' : ''"
        :rules="[
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ]"
        style="margin-bottom: 22px"
      >
        <el-input
          maxlength="11"
          v-model="formData.phone"
          @focus="focusFn('phone')"
          @blur="blurFn('phone')"
          @input="
            (val) => {
              formData.phone = val.trim().replace(/\D/g, '');
            }
          "
        ></el-input>
      </el-form-item>
      <el-form-item
        label="验证码"
        prop="validate_code"
        :class="
          formData.validate_code || inputFocusState.validate_code
            ? 'focused-input'
            : ''
        "
        :rules="[
          {
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change'],
          },
          {
            min: 6,
            max: 6,
            message: '验证码不正确',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input
          maxlength="6"
          v-model="formData.validate_code"
          @focus="focusFn('validate_code')"
          @blur="blurFn('validate_code')"
          style="width: 284px"
          @input="
            (val) => {
              formData.validate_code = val.trim().replace(/\D/g, '');
            }
          "
        ></el-input>
        <el-button
          type="primary"
          style="float: right; min-width: 95px; height: 50px"
          @click="getCode"
          :disabled="codeTimer != 60 || disableSend"
          ><span v-if="codeTimer == 60">发送</span>
          <span v-else>重新获取 {{ codeTimer }}s</span></el-button
        >
      </el-form-item>
      <el-form-item
        label="新密码"
        prop="new_password"
        :class="
          formData.new_password || inputFocusState.new_password
            ? 'focused-input'
            : ''
        "
        :rules="[
          {
            required: true,
            message: '密码格式有误，需包含6到20位数字和字母，请修改',
            trigger: 'blur',
            min: 6,
            max: 20,
          },
          { validator: checkPassword, trigger: 'blur' },
        ]"
      >
        <el-input
          minlength="6"
          maxlength="20"
          :type="pwdType ? 'password' : 'text'"
          v-model="formData.new_password"
          @focus="focusFn('new_password')"
          @blur="blurFn('new_password')"
          @change="
            (val) => {
              formData.new_password = val.trim();
            }
          "
        >
          <i
            :class="pwdType ? 'iconyincang' : 'el-icon-view'"
            style="
              cursor: pointer;
              position: relative;
              width: 14px;
              height: 14px;
              top: 5px;
              display: inline-block;
            "
            slot="suffix"
            @click="pwdType = !pwdType"
          ></i
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="sub-btn"
          style="width: 100%"
          @click="subRegister"
          v-loading="loadingRegister"
          :disabled="loadingRegister"
          type="primary"
          ><span style="font-size: 18px">修改密码</span></el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { checkPassword, checkPhone } from "@/util/common";
export default {
  props: {
    showChangePassword: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkPhone,
      checkPassword: checkPassword,
      pwdType: true,
      codeTimer: 60,
      disableSend: false,
      loadingRegister: false,
      formData: {
        email: "",
        new_password: "",
        validate_code: "",
        phone: "",
      },
      inputFocusState: {
        email: false,
        new_password: false,
        validate_code: false,
        phone: false,
      },
    };
  },
  methods: {
    async getCode() {
      this.disableSend = true;
      let that = this;
      this.$refs.registerForm.validateField("phone", (valRes) => {
        if (valRes) {
          this.disableSend = false;
          return;
        }
        that.subGetcode();
      });
    },
    async subGetcode() {
      //loading Btn
      //判断邮箱地址正确与否

      let res = await this.$http.get("account/send-sms", {
        phone: this.formData.phone,
        type: "find_password",
      });
      //判断状态
      if (res.code != 0) {
        this.disableSend = false; //禁用验证码按钮
        return;
      }
      let that = this;
      let codeInter = setInterval(() => {
        that.codeTimer = parseInt(that.codeTimer, 10) - 1;
        if (that.codeTimer == 0) {
          clearInterval(codeInter);
          that.codeTimer = 60;
          this.disableSend = false;
        }
      }, 1000);
    },
    subRegister() {
      let _this = this;
      this.loadingRegister = true;
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          _this.register();
        } else {
          _this.loadingRegister = false;
          return false;
        }
        _this.loadingRegister = false;
      });
    },
    async register() {
      let res = await this.$http.post("account/find-password", this.formData);
      if (res.code == 0) {
        this.loginOut();
      }
    },
    async loginOut() {
      let res = await this.$http.get("account/logout", {});
      if (res.code == 0) {
        this.loginOutShop();
        localStorage.clear();
        this.$message.success("修改成功");
        this.handleClose();
        this.$set(this.$store.state, "accountInfo", {});
        this.$store.state.showsLogin = true;
      }
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
    focusFn(inputName) {
      this.inputFocusState[inputName] = true;
    },
    blurFn(inputName) {
      this.inputFocusState[inputName] = false;
    },
    handleClose(done) {
      this.$store.state.showResetPwd = false;
      this.handleUrl();
    },
    handleUrl() {
      let url = window.location.origin + window.location.pathname;
      window.history.replaceState({}, 0, url);
    },
  },
};
</script>

<style lang="less" scoped>
.start-jz {
  font-size: 26px;
  font-weight: 400;
  color: #000000;
  text-align: center;
}
.sub-btn {
  height: 50px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  span {
    font-size: 18px;
  }
}
</style>