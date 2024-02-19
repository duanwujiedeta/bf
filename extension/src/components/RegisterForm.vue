<template>
  <el-dialog :close-on-click-modal="false" width="480px" :visible.sync="showRegister" :before-close="handleClose"
    class="customer-dialog">
    <el-form ref="registerForm" class="customer-form" :model="formData" label-position="top">
      <el-form-item>
        <p class="start-jz">开始建站</p>
      </el-form-item>
      <el-form-item style="margin-bottom: -9px">平台将人工验证企业信息，请填写完成企业名称</el-form-item>
      <el-form-item label="企业名称（必填）" prop="company_name" :class="
        formData.company_name || inputFocusState.company_name
          ? 'focused-input'
          : ''
      " :rules="[
  {
    min: 5,
    required: true,
    message: '企业名称不可少于5个字，请修改',
    trigger: 'blur',
  },
  { validator: checkCompanyName, trigger: 'blur' },
]">
        <el-input :maxlength="50" v-model="formData.company_name" @focus="focusFn('company_name')"
          @blur="blurFn('company_name')" @change="
            (val) => {
              formData.company_name = val.trim();
            }
          "></el-input>
      </el-form-item>
      <el-form-item label="店铺名称" prop="shop_name" :class="
        formData.shop_name || inputFocusState.shop_name ? 'focused-input' : ''
      " :rules="[
  { required: true, message: '请输入店铺名称', trigger: 'blur' },
  { validator: checkShopName, trigger: 'blur' },
]">
        <el-input :maxlength="20" v-model="formData.shop_name" @focus="focusFn('shop_name')" @blur="blurFn('shop_name')"
          @change="
            (val) => {
              formData.shop_name = val.trim();
            }
          "></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :class="formData.email || inputFocusState.email ? 'focused-input' : ''"
        :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '邮箱地址不正确',
            trigger: ['blur', 'change'],
          },
        ]">
        <el-input v-model="formData.email" @focus="focusFn('email')" @blur="blurFn('email')" @change="
          (val) => {
            formData.email = val.trim();
          }
        "></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :class="
        formData.password || inputFocusState.password ? 'focused-input' : ''
      " :rules="[
  {
    required: true,
    message: '密码格式有误，需包含6到20位数字和字母，请修改',
    trigger: 'blur',
    min: 6,
    max: 20,
  },
  { validator: checkPassword, trigger: 'blur' },
]">
        <el-input minlength="6" maxlength="20" :type="pwdType ? 'password' : 'text'" v-model="formData.password"
          @focus="focusFn('password')" @blur="blurFn('password')" @change="
            (val) => {
              formData.password = val.trim();
            }
          ">
          <i :class="pwdType ? 'iconyincang' : 'el-icon-view'" style="
              cursor: pointer;
              position: relative;
              width: 14px;
              height: 14px;
              top: 5px;
              display: inline-block;
            " slot="suffix" @click="pwdType = !pwdType">
          </i>
        </el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone" :class="formData.phone || inputFocusState.phone ? 'focused-input' : ''"
        :rules="[
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ]" style="margin-bottom: 22px">
        <el-input maxlength="11" v-model="formData.phone" @focus="focusFn('phone')" @blur="blurFn('phone')" @input="
          (val) => {
            formData.phone = val.trim().replace(/\D/g, '');
          }
        "></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="validate_code" :class="
        formData.validate_code || inputFocusState.validate_code
          ? 'focused-input'
          : ''
      " :rules="[
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
]">
        <el-input maxlength="6" v-model="formData.validate_code" @focus="focusFn('validate_code')"
          @blur="blurFn('validate_code')" style="width: 284px" @input="
            (val) => {
              formData.validate_code = val
                .trim()
                .replace(/\D/g, '')
                .replace(/\D/g, '');
            }
          "></el-input>
        <el-button type="primary" style="float: right; min-width: 95px; height: 50px" @click="getCode"
          :disabled="codeTimer != 60 || disableSend"><span v-if="codeTimer == 60">发送</span>
          <span v-else>重新获取 {{ codeTimer }}s</span>
        </el-button>
      </el-form-item>
      <el-form-item prop="checked" :rules="[
        { required: true, message: '请勾选同意选项', trigger: 'blur' },
      ]">
        <p class="yimai-xieyi">
          <el-checkbox v-model="formData.checked" style="margin-right: 10px" @change="
            formData.checked = formData.checked ? formData.checked : ''
          "></el-checkbox>
          阅读并同意<span><a class="textBtn" href="userAgreement.html" target="_blank">《使用协议》</a>
            <a class="textBtn" href="termService.html" target="_blank">《服务条款》</a>
            <a class="textBtn" href="privacyPolicy.html" target="_blank">《隐私条款》</a></span>
        </p>
      </el-form-item>
      <el-form-item>
        <el-button class="sub-btn" style="width: 100%" @click="subRegister" :disabled="loadingRegister" type="primary">
          立即注册</el-button>
        <p style="
            font-size: 16px;
            font-weight: bold;
            color: #434343;
            text-align: center;
          ">
          免费使用7天
        </p>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  checkPassword,
  checkPhone,
  checkShopName,
  checkCompanyName,
} from "@/util/common";
export default {
  props: {
    showRegister: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      codeTimer: 60,
      disableSend: false,
      loadingRegister: false,
      checkPhone: checkPhone,
      checkPassword: checkPassword,
      checkShopName: checkShopName,
      checkCompanyName: checkCompanyName,
      pwdType: true,
      formData: {
        email: "",
        password: "",
        phone: "",
        validate_code: "",
        company_name: "",
        shop_name: "",
        checked: "",
      },
      inputFocusState: {
        email: false,
        password: false,
        phone: false,
        validate_code: false,
        company_name: false,
        shop_name: false,
        checked: false,
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
      //loading Btn  https://base-api.powerbuyin.top
      //判断邮箱地址正确与否https://base-api.powerbuyin.top/register-sms

      let res = await this.$http.get("account/send-sms", {
        phone: this.formData.phone,
        type: "register",
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
    getUrlParams() {
      // 通过 ? 分割获取后面的参数字符串
      var url = window.location.href;
      var urlStr = url.split('?')[1];
      // 创建空对象存储参数
      var obj = {};
      // 再通过 & 将每一个参数单独分割出来
      var paramsArr = urlStr && urlStr.split('&');
      if (paramsArr) {
        for (let i = 0, len = paramsArr.length; i < len; i++) {
          // 再通过 = 将每一个参数分割为 key:value 的形式
          let arr = paramsArr[i].split('=');
          obj[arr[0]] = arr[1];
        }
      }
      return obj;
    },
    async register() {
      let urlObj = this.getUrlParams();
      let params = {...this.formData};
      if(urlObj.company_type){
        params.company_type = urlObj.company_type;
      }
      let res = await this.$http.post("account/register", params);
      if (res.code == 0) {
        // this.$message.success("注册成功");
        this.handleClose();
        this.$refs["registerForm"].resetFields();
        //显示注册成功页面
        this.$emit("shoSuccess", this.formData);
        this.initToken(res.data.token);
      }
      this.loadingRegister = false;
    },
    async initToken(token) {
      let config = {};
      if (process.env.NODE_ENV == "development") {
        config.baseURL = "/api";
      } else {
        config.baseURL = process.env.VUE_APP_SHOP_API_URL;
      }
      let res = await this.$http.get(
        "pw/seller/batch-login",
        {
          token,
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
      this.$emit("close");
    },
  },
  mounted() {
    // this.loadingRegister = true;
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
