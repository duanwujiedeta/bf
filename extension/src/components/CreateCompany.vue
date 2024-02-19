<template>
  <el-dialog
    :close-on-click-modal="false"
    width="480px"
    :visible.sync="showCreateCompany"
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
        <p class="start-jz">登录账号</p>
      </el-form-item>
      <el-form-item
        label="企业名称"
        prop="company_name"
        style="margin-bottom: 30px; margin-top: 80px"
        :class="
          formData.company_name || inputFocusState.company_name
            ? 'focused-input'
            : ''
        "
        :rules="[
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { validator: checkCompanyName, trigger: 'blur' },
        ]"
      >
        <el-input
          :maxlength="20"
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
      <el-form-item>
        <el-button
          class="sub-btn"
          style="width: 100%"
          @click="subRegister"
          v-loading="loadingRegister"
          :disabled="loadingRegister"
          type="primary"
          ><span style="font-size: 18px">创建企业</span></el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { checkCompanyName } from "@/util/common";
export default {
  props: {
    showCreateCompany: {
      type: Boolean,
      default: false,
    },
    accountInfo: {
      type: Object,
      default: () => {},
    },
    getAccountInfo: {
      type: Function,
    },
    showShopAndComList: {
      type: Function,
    },
  },
  data() {
    return {
      checkCompanyName:checkCompanyName,
      loadingRegister: false,
      pwdType: true,
      formData: {
        company_name: "",
      },
      inputFocusState: {
        company_name: false,
      },
    };
  },
  methods: {
    subGetcode() {
      //loading Btn
      //判断邮箱地址正确与否

      /* let res = await getRegisterCode({
        email: this.registerForm.email,
        emailType: "register",
      }); */
      //判断状态
      /* if (res.code != 0) {
        this.disableCodeBtn = false; //禁用验证码按钮
        return;
      } */
      let that = this;
      let codeInter = setInterval(() => {
        that.codeTimer = parseInt(that.codeTimer, 10) - 1;
        if (that.codeTimer == 0) {
          clearInterval(codeInter);
          that.codeTimer = 60;
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
      let res = await this.$http.post("company/create", {
        company_name: this.formData.company_name,
        account_id: this.$store.state.accountInfo.account_id,
      });
      if (res.code == 0) {
        this.$message.success("创建成功");
        this.handleClose();
        //创建成功后要更新account列表
        let res1 = await this.getAccountInfo();
        if(res1.code==0){
          this.showShopAndComList();
        }
      }
    },
    focusFn(inputName) {
      this.inputFocusState[inputName] = true;
    },
    blurFn(inputName) {
      this.inputFocusState[inputName] = false;
    },
    handleClose(done) {
      this.$emit("close");
      this.$refs["registerForm"].resetFields();
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
