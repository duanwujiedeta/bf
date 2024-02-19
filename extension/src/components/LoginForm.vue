<template>
  <el-dialog
    :close-on-click-modal="false"
    width="480px"
    :visible.sync="showLogin"
    :before-close="handleClose"
    class="customer-dialog"
  >
    <el-form
      ref="loginForm"
      class="customer-form"
      :model="formData"
      label-position="top"
    >
      <el-form-item>
        <p class="start-jz">登录账号</p>
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
        label="密码"
        prop="password"
        :class="
          formData.password || inputFocusState.password ? 'focused-input' : ''
        "
        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
      >
        <el-input
          minlength="6"
          maxlength="20"
          :type="pwdType ? 'password' : 'text'"
          v-model="formData.password"
          @focus="focusFn('password')"
          @blur="blurFn('password')"
          @change="
            (val) => {
              formData.password = val.trim();
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
          >
          </i>
        </el-input>
      </el-form-item>
      <el-form-item prop="checked">
        <p class="yimai-xieyi">
          <el-checkbox
            v-model="formData.checked"
            style="margin-right: 10px"
          ></el-checkbox>
          七天内免登录
          <el-button
            type="text"
            class="textBtn"
            style="float: right"
            @click="closeAndShowchangePwd"
            >忘记密码</el-button
          >
        </p>
      </el-form-item>
      <el-form-item>
        <el-button
          class="sub-btn"
          style="width: 100%"
          @click="subLogin"
          type="primary"
          :disabled="loadingRegister"
          >立即登录</el-button
        >
        <p
          style="
            font-size: 16px;
            font-weight: bold;
            color: #434343;
            text-align: center;
          "
        >
          <el-button type="text" class="textBtn" @click="closeAndShowRegister"
            >立即注册</el-button
          >
        </p>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { checkPassword } from "@/util/common";
export default {
  props: {
    showLogin: {
      type: Boolean,
      default: false,
    },
    getAccountInfo: {
      type: Function,
    },
  },
  data() {
    return {
      checkPassword: checkPassword,
      pwdType: true,
      loadingRegister: false,
      formData: {
        email: "",
        password: "",
        checked: "",
      },
      inputFocusState: {
        email: false,
        password: false,
        checked: false,
      },
    };
  },
  methods: {
    subLogin() {
      let _this = this;
      this.loadingRegister = true;
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          _this.login();
        } else {
          _this.loadingRegister = false;
          return false;
        }
      });
    },
    async login() {
      let res = await this.$http.post("account/login", this.formData);
      if (res.code == 0) {
        let res1 = await this.getAccountInfo(false, true);
        if (res1.code == 0) {
          this.$message.success("登录成功");
          this.handleClose();
          //显示注册成功页面
          // this.$emit("shoSuccess", this.formData);
        }
      }
      this.loadingRegister = false;
    },
    focusFn(inputName) {
      this.inputFocusState[inputName] = true;
    },
    blurFn(inputName) {
      this.inputFocusState[inputName] = false;
    },
    handleClose(done) {
      this.handleUrl();
      this.$emit("close");
      this.$refs["loginForm"].resetFields();
    },
    closeAndShowRegister() {
      this.handleUrl();
      this.$emit("close");
      this.$refs["loginForm"].resetFields();
      this.$emit("showRegister");
    },
    closeAndShowchangePwd() {
      this.handleUrl();
      this.$emit("close");
      this.$refs["loginForm"].resetFields();
      this.$set(this.$store.state, "showResetPwd", true);
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
