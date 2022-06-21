<template>
  <div class="login-form">
    <h1 class="login-title">重置密码</h1>
    <p class="redirect-regist">重置账户{{$route.query.email}}</p>
    <el-form
      ref="loginForm"
      :model="resetPwdForm"
      v-show="!resetSuccess"
      @keyup.enter.native="submitLogin"
    >
      <el-form-item
        prop="password"
        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度为6-20字符,可使用下划线', trigger: ['blur', 'change'] }]"
      >
        <el-input
          :type="pwdType?'password':'text'"
          placeholder="新密码"
          v-model="resetPwdForm.password"
          @change="(val)=>{resetPwdForm.password=val.trim()}"
        >
          <i
            :class="pwdType?'el-icon-view':'iconfont iconyincang'"
            style="cursor:pointer;"
            slot="suffix"
            @click="pwdType = !pwdType"
          >
          </i>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度为6-20字符,可使用下划线', trigger: ['blur', 'change'] }]"
      >
        <el-input
          :type="newPwdType?'password':'text'"
          placeholder="确认新密码"
          v-model="resetPwdForm.repassword"
          @change="(val)=>{resetPwdForm.repassword=val.trim()}"
        >
          <i
            :class="newPwdType?'el-icon-view':'iconfont iconyincang'"
            style="cursor:pointer;"
            slot="suffix"
            @click="newPwdType = !newPwdType"
          >
          </i>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      style="height:56px;margin-top:20px;font-size:18px;"
      @click="submitLogin"
      v-show="!resetSuccess"
      v-loading="resetLoading"
      :disabled="resetLoading"
    >重置密码</el-button>
    <!-- line -->
    <button
      type="button"
      class="el-button el-button--success is-circle"
      style="width:70px;height:70px;margin:0 auto;cursor: auto;margin-top: 60px;"
      v-show="resetSuccess"
    >
      <i
        class="el-icon-check"
        style="font-size: 35px;font-weight: 600;"
      ></i>
    </button>
    <p
      class="email-show"
      v-show="resetSuccess"
      style="margin-bottom:90px;"
    ><span>密码重置成功</span></p>
    <el-button
      type="primary"
      v-show="resetSuccess"
      style="height:56px;margin-top:20px;font-size:18px;"
      @click="$router.push({name:'login'})"
    >立即登录</el-button>
  </div>
</template>
<script>
import { resetPassword, checkURL } from "./api/register.js";
export default {
  data() {
    return {
      resetLoading: false, //重置按钮loading
      resetSuccess: false, //重置成功
      pwdType: true,
      newPwdType: true,
      resetPwdForm: {
        email: "",
        password: "",
        repassword: "",
        token: ""
      }
    };
  },
  mounted() {
    this.resetPwdForm.token = this.$route.query.token;
    this.resetPwdForm.email = this.$route.query.email;
    this.checkURL();
  },
  methods: {
    submitLogin() {
      if (this.resetLoading) return;
      this.resetLoading = true;
      if (this.resetPwdForm.password != this.resetPwdForm.repassword) {
        this.$message.error("两次密码不一致");
        this.resetLoading = false;
        return;
      }
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.resetPwd();
        } else {
          this.resetLoading = false;
          return false;
        }
      });
    },
    async checkURL() {
      let token = this.resetPwdForm.token;
      let email = this.resetPwdForm.email;
      let params = { token, email };
      let res = await checkURL(params);
      if (res.code != 0) {
        // this.$message.error("校验信息错误");
        this.$router.push({ name: "login" });
      }
    },
    async resetPwd() {
      let res = await resetPassword(this.resetPwdForm);
      if (res.code == 0) {
        this.resetSuccess = true;
      }
      this.resetLoading = false;
    }
  }
};
</script>
<style lang="less" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding: 60px 40px;
  background-color: #fff;
  box-sizing: border-box;
  .login-title {
    font-size: 32px;
    font-weight: 500;
    color: #000000;
  }
  .redirect-regist {
    margin-top: 10px;
    span {
      color: #5f46fa;
      cursor: pointer;
    }
  }
  .el-form {
    margin-top: 40px;
  }
  .email-show {
    text-align: center;
    margin: 25px auto 0 auto;
    max-width: 325px;
    span {
    }
  }
}
</style>
