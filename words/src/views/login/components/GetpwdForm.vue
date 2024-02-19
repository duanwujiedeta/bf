<template>
  <div class="getpwd-form">
    <h1
      class="getpwd-title"
      v-show="!sendSucced"
    >找回密码</h1>
    <p
      class="redirect-login"
      v-show="!sendSucced"
    >已有账号?<span @click="$router.push({name:'login'})">去登录</span></p>
    <el-form
      ref="getpwdForm"
      :model="getpwdForm"
      v-show="!sendSucced"
      @keyup.enter.native="submitgetpwd"
      @submit.native.prevent
    >
      <el-form-item
        prop="email"
        :class="showExist?'exist-check':''"
        :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },{ type: 'email', message: '邮箱地址不正确', trigger: ['blur', 'change'] },{ validator: checkUserExist, trigger: 'blur' }]"
      >
        <el-input
          placeholder="邮箱地址"
          v-model="getpwdForm.email"
          @input="showExist=false"
          @change="(val)=>{getpwdForm.email=val.trim()}"
        ></el-input>
        <span
          slot="error"
          slot-scope="scope"
          class="el-form-item__error"
          style="display: inline-block;"
        >
          {{ scope.error }}
          <el-button
            slot="suffix"
            type="text"
            @click="$router.push('/register')"
            style="padding: 0px;"
            v-if="scope.error=='邮箱地址不存在，'"
          >
            立即注册
          </el-button>
        </span>
        <!--  <div class="error-tip err-box">
          邮箱地址不存在，<span @click="$router.push('/register')">立即注册</span>
        </div> -->
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      style="height:56px;margin-top:20px;font-size:18px;"
      @click="submitgetpwd"
      v-show="!sendSucced"
      v-loading="loadingSubBtn"
      :disabled="loadingSubBtn"
    >找回密码</el-button>
    <button
      type="button"
      class="el-button el-button--success is-circle"
      style="width:70px;height:70px;margin:0 auto;cursor: auto;margin-top: 90px;"
      v-show="sendSucced"
    >
      <i
        class="el-icon-check"
        style="font-size: 35px;font-weight: 600;"
      ></i>
    </button>
    <p
      class="email-show"
      v-show="sendSucced"
    ><span>已发送密码找回链接至{{echoEmail()}}邮箱
        请前往邮箱查看</span></p>
    <el-button
      type="primary"
      v-show="sendSucced"
      style="height:56px;margin-top:20px;font-size:18px;"
      @click="$router.push({name:'login'})"
    >立即登录</el-button>

  </div>
</template>
<script>
import { sendPwdFromEamil, checkUser } from "./api/register.js";
export default {
  data() {
    return {
      sendSucced: false, //邮件发送成功
      showExist: false, //显示跳转注册
      loadingSubBtn: false, //找回密码按钮loading
      getpwdForm: {
        email: "",
        url: window.location.origin + "/resetpwd"
      }
    };
  },
  methods: {
    echoEmail() {
      let email = this.getpwdForm.email;
      let len = email.length;
      let atIndex = email.indexOf("@");
      let endWord = email.substr(atIndex);
      let startWord = email.substr(0, atIndex - 4 > 2 ? atIndex - 4 : 2);
      return startWord + "****" + endWord;
    },
    async checkUserExist(rule, value, callback) {
      if (this.showExist) {
        callback(new Error("邮箱地址不存在，"));
        return;
      }
      if (!value) {
        return true;
      }
      let res = await checkUser({ email: value, $hideMsg: true });
      if (res.code == 0) {
        this.showExist = true;
        return callback(new Error("邮箱地址不存在，"));
      } else {
        this.showExist = false;
      }
    },
    submitgetpwd() {
      if (this.loadingSubBtn) return;
      this.loadingSubBtn = true;
      this.$refs["getpwdForm"].validate(valid => {
        if (valid) {
          this.sendEmail();
        } else {
          this.loadingSubBtn = false;
          return false;
        }
      });
    },
    async sendEmail() {
      let res = await sendPwdFromEamil(this.getpwdForm);
      if (res.code == 0) {
        this.sendSucced = true;
      }
      this.loadingSubBtn = false;
    }
  }
};
</script>
<style lang="less" scoped>
.getpwd-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding: 60px 40px;
  background-color: #fff;
  box-sizing: border-box;
  .getpwd-title {
    font-size: 32px;
    font-weight: 500;
    color: #000000;
  }
  .redirect-login {
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
    margin: 20px auto 110px auto;
    max-width: 325px;
    span {
    }
  }
  .el-form-item.is-error {
    .error-tip {
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      position: absolute;
      top: 100%;
      left: 0;
      color: #f56c6c;
      span {
        color: #5f46fa;
        cursor: pointer;
      }
    }
  }
}
</style>
