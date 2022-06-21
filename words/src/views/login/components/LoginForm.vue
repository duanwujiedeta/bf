<template>
  <div class="login-form">
    <h1 class="login-title">登录开发者中心</h1>
    <p class="redirect-regist">还没有账号?<el-button
        type="text"
        @click="$router.push({name:'register'})"
      >立即注册</el-button>
    </p>
    <el-form
      ref="loginForm"
      :model="loginForm"
      @keyup.enter.native="submitLogin"
    >
      <el-form-item
        prop="email"
        :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                      { type: 'email', message: '邮箱地址错误', trigger: ['blur', 'change'] }]"
      >
        <el-input
          placeholder="邮箱地址"
          v-model="loginForm.email"
          @change="(val)=>{loginForm.email=val.trim()}"
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[{ required: true, message: '请输入密码', trigger: ['blur', 'change'] },{ min: 6, max: 20, message: '密码长度为6-20字符,可使用下划线', trigger: ['blur', 'change'] }]"
      >
        <el-input
          :type="pwdType?'password':'text'"
          placeholder="密码"
          v-model="loginForm.password"
          minlength="6"
          maxlength="20"
          @change="(val)=>{loginForm.password=val.trim()}"
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
    </el-form>
    <p class="forget-pwd"><span @click="$router.push({name:'getpwd'})">忘记密码?</span></p>
    <el-button
      type="primary"
      style="height:56px;margin-top:20px;font-size: 18px;"
      @click="submitLogin"
      :disabled="loadingLogin"
      v-loading="loadingLogin"
    >登录</el-button>
    <p class="yimai-explain"><span @click="goDocs">了解XShoppy开发者中心</span></p>
  </div>
</template>
<script>
import { loginSys, getUserMsg } from "./api/register.js";
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      loadingLogin: false, //登录按钮loading
      pwdType: true //显示、隐藏密码
    };
  },
  methods: {
    goDocs() {
      window.open("https://docs.xshoppy.com/", "_blank");
    },
    submitLogin() {
      if (this.loadingLogin) return;
      this.loadingLogin = true;
      let _this = this;
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          _this.login();
        } else {
          _this.loadingLogin = false;
          return false;
        }
      });
    },
    async login() {
      let res = await loginSys(this.loginForm);
      if (res.code == 0) {
        //还要设置vuex登录状态，获取token，用户信息
        localStorage.setItem("login_token", res.data.token);
        this.getUser();
        // this.$router.push("/admin");
      } else {
        this.loadingLogin = false;
      }
    },
    async getUser() {
      let res = await getUserMsg();
      if (res.code == 0) {
        this.$message.success("登录成功");
        this.set_userInfo(res.data);
        this.set_login(true);
        this.$router.replace(
          { name: "apps" },
          onComplete => {},
          onAbort => {}
        );
      }
      this.loadingLogin = false;
    },
    ...mapMutations({ set_userInfo: "SET_USERINFO", set_login: "SET_LOGIN" })
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
  }
  .el-form {
    margin-top: 40px;
  }
  .forget-pwd {
    text-align: right;
    span {
      cursor: pointer;
    }
  }
  .yimai-explain {
    text-align: center;
    margin-top: 20px;
    span {
      cursor: pointer;
      color: #5f46fa;
    }
  }
}
</style>
