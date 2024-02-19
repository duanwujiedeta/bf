<template>
  <el-dialog
    :close-on-click-modal="false"
    width="480px"
    :visible.sync="showJoinCompany"
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
        <p class="start-jz">加入企业</p>
      </el-form-item>
      <p style="margin-bottom: 15px">
        请输入账号信息，加入企业（{{ formData.company_name }}）
      </p>
      <el-form-item
        label="企业名称"
        prop="company_name"
        :class="
          formData.company_name || inputFocusState.company_name
            ? 'focused-input'
            : ''
        "
        :rules="[
          { required: true, message: '请输入企业名称', trigger: 'blur' },
        ]"
      >
        <el-input
          readonly
          :disabled="!ismobile && disable"
          v-model="formData.company_name"
          @focus="focusFn('company_name')"
          @blur="blurFn('company_name')"
          @change="
            (val) => {
              formData.company_name = val.trim();
            }
          "
        ></el-input>
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
          readonly
          :disabled="!ismobile && disable"
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
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :class="
          formData.password || inputFocusState.password ? 'focused-input' : ''
        "
        :rules="[
          { required: true, message: '请输入密码', trigger: 'blur' },
          !hasRegister ? { validator: checkPassword, trigger: 'blur' } : {},
        ]"
        v-if="!islogin"
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
      <el-form-item
        v-if="!hasRegister && !islogin"
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
        v-if="!hasRegister && !islogin"
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
        prop="checked"
        :rules="[
          { required: true, message: '请勾选同意选项', trigger: 'blur' },
        ]"
        v-if="!hasRegister && !islogin"
      >
        <p class="yimai-xieyi">
          <el-checkbox
            v-model="formData.checked"
            style="margin-right: 10px"
            @change="
              formData.checked = formData.checked ? formData.checked : ''
            "
          ></el-checkbox>
          阅读并同意<span
            ><a class="textBtn" href="userAgreement.html" target="_blank"
              >《使用协议》</a
            >
            <a class="textBtn" href="termService.html" target="_blank"
              >《服务条款》</a
            >
            <a class="textBtn" href="privacyPolicy.html" target="_blank"
              >《隐私条款》</a
            ></span
          >
        </p>
      </el-form-item>
      <el-form-item>
        <el-button
          class="sub-btn"
          style="width: 100%"
          @click="subRegister"
          :disabled="loadingRegister"
          type="primary"
          >加入</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { urlToJsonFn, checkPhone, checkPassword } from "@/util/common";
export default {
  props: {
    showJoinCompany: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ismobile: false,
      disable: true,
      disableSend: false,
      hasRegister: false, //是否注册，用来标识手机号是否显示
      loadingRegister: false,
      pwdType: true,
      codeTimer: 60,
      checkPassword: checkPassword,
      checkPhone: checkPhone,
      company_id: "",
      islogin: false,
      formData: {
        email: "",
        password: "",
        company_name: "",
        phone: "",
        checked: "",
        validate_code: "",
      },
      inputFocusState: {
        email: false,
        password: false,
        company_name: false,
        phone: false,
        validate_code: "",
      },
    };
  },
  methods: {
    getParams({ account_email, account_id }) {
      let params = urlToJsonFn();
      this.formData.email = params["email"];
      this.formData.company_name = params["company_name"];
      this.company_id = params["company_id"];
      this.islogin = account_email == this.formData.email;
      this.account_id = account_id;
      this.checkRegistEmail();
    },
    async checkRegistEmail() {
      let res = await this.$http.post("account/check-company-email", {
        email: this.formData.email,
        company_id: this.company_id,
        $hideMsg: true,
      });
      if (res.message == "该邮箱未在邀请列表中") {
        this.$message.error(res.message);
      }
      if (
        res.message == "该邮箱未在邀请列表中" ||
        res.message == "该邮箱未注册"
      ) {
        //要密码，要手机
        this.hasRegister = false;
      } else {
        //已经注册
        this.hasRegister = true;
      }
    },
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
        type: "company-invite",
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
          that.disableSend = false;
        }
      }, 1000);
    },
    async subRegister() {
      let _this = this;
      this.loadingRegister = true;
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          _this.register();
        } else {
          _this.loadingRegister = false;
          return false;
        }
      });
    },
    async register() {
      let type = 3;
      let params = {
        company_id: parseInt(this.company_id, 10),
        company_name: this.formData.company_name,
        email: this.formData.email,
        validate_code: this.formData.validate_code,
      };
      if (!this.islogin) {
        //未登录，则含有密码
        params.password = this.formData.password;
      }
      if (this.islogin) {
        type = 1;
        params.account_id = this.account_id;
      }
      if (!this.islogin && this.hasRegister) {
        type = 2;
      }
      if (!this.islogin && !this.hasRegister) {
        type = 3;
        params.phone = this.formData.phone;
      }
      params.type = type;
      let res = await this.$http.post("account/company-invite", params);
      if (res.code == 0) {
        //window.history.replaceState({}, 0, WIN_ENV.Product.referrer_url)
        this.$message.success("加入成功");
        let that = this;
        let url = process.env.VUE_APP_QIYE_HOST_URL;
        setTimeout(() => {
          url =
            url +
            "?company_id=" +
            this.company_id +
            "&company_name=" +
            this.formData.company_name;
          window.location.replace(url);
        }, 30);
        // this.handleClose();
        //显示注册成功页面
        // this.$emit("shoSuccess", this.formData);
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
      let url = window.location.origin + window.location.pathname;
      window.history.replaceState({}, 0, url);
      this.$emit("close");
      this.$refs["registerForm"].resetFields();
    },
  },
  mounted() {
    let sUserAgent = navigator.userAgent;
    this.ismobile =
      sUserAgent.indexOf("Android") > -1 ||
      sUserAgent.indexOf("iPhone") > -1 ||
      sUserAgent.indexOf("iPad") > -1 ||
      sUserAgent.indexOf("iPod") > -1 ||
      sUserAgent.indexOf("Symbian") > -1;
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
