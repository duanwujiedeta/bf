
<template>
  <el-dialog
    :close-on-click-modal="false"
    width="480px"
    :visible.sync="showChangePassword"
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
        <p class="start-jz">修改密码</p>
      </el-form-item>
      <!-- <el-form-item
        label="邮箱"
        prop="name"
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
          :maxlength="20"
          v-model="formData.email"
          @focus="focusFn('email')"
          @blur="blurFn('email')"
          @change="
            (val) => {
              formData.email = val.trim();
            }
          "
        ></el-input>
      </el-form-item> -->
      <!-- <div>
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
              min: 4,
              max: 4,
              message: '验证码不正确',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input
            v-model="formData.validate_code"
            @focus="focusFn('validate_code')"
            @blur="blurFn('validate_code')"
            style="width: 284px"
            @change="
              (val) => {
                formData.validate_code = val.trim().replace(/\D/g, '');
              }
            "
          ></el-input>
          <el-button
            type="primary"
            style="float: right; min-width: 95px; height: 50px"
            @click="getCode"
            :disabled="codeTimer != 60"
            ><span v-if="codeTimer == 60">发送</span>
            <span v-else>重新获取 {{ codeTimer }}s</span></el-button
          >
        </el-form-item>
      </div> -->
      <el-form-item
        label="旧密码"
        prop="old_password"
        :class="
          formData.old_password || inputFocusState.old_password
            ? 'focused-input'
            : ''
        "
        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
      >
        <el-input
          minlength="6"
          maxlength="20"
          :type="oldPwdType ? 'password' : 'text'"
          v-model="formData.old_password"
          @focus="focusFn('old_password')"
          @blur="blurFn('old_password')"
          @change="
            (val) => {
              formData.old_password = val.trim();
            }
          "
        >
          <i
            :class="oldPwdType ? 'iconyincang' : 'el-icon-view'"
            style="
              cursor: pointer;
              position: relative;
              width: 14px;
              height: 14px;
              top: 5px;
              display: inline-block;
            "
            slot="suffix"
            @click="oldPwdType = !oldPwdType"
          ></i
        ></el-input>
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
import { checkPassword } from "@/util/common";
export default {
  // 旧密码有误，请重新输入       ---- 新密码格式有误，请修改          ----  修改成功
  props: {
    showChangePassword: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkPassword: checkPassword,
      oldPwdType: true,
      pwdType: true,
      codeTimer: 60,
      loadingRegister: false,
      formData: {
        old_password: "",
        new_password: "",
      },
      inputFocusState: {
        old_password: false,
        new_password: false,
      },
    };
  },
  methods: {
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
      let res = await this.$http.post("account/change-password", this.formData);
      if (res.code == 0) {
        //退出登录
        this.loginOut();
      }
    },
    async loginOut() {
      let res = await this.$http.get("account/logout", {});
      if (res.code == 0) {
        this.loginOutShop();
        localStorage.clear();
        this.$message.success("修改成功");
        this.$set(this.$store.state, "accountInfo", {});
        this.handleClose();
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
      this.$set(this.$store.state, "showChangePwd", false);
      this.$refs["registerForm"].resetFields();
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
