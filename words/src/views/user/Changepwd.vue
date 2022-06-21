<template>
  <div class="container change-pwd">
    <!-- start title -->
    <h1 class="title clear">
      <span class="text">修改密码</span>
    </h1>
    <!-- end title -->
    <div
      class="box"
      style="margin-bottom:0px;"
    >
      <el-form
        :label-position="'top'"
        ref="changeForm"
        :model="changeForm"
        size="medium"
        @keyup.enter.native="subChange"
      >
        <el-form-item
          prop="old_password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度为6-20字符,可使用下划线', trigger: ['blur', 'change'] }]"
        >
          <label
            for="old_password"
            class="el-form-item__label"
            style="width:100%;"
          ><i style="color: #F56C6C;margin-right: 4px;">*</i>当前密码
            <!-- <el-button
              type="text"
              class="fr"
            >忘记密码?</el-button> -->
          </label>
          <el-input
            type="password"
            placeholder="旧密码"
            v-model="changeForm.old_password"
            minlength="6"
            maxlength="20"
            @change="(val)=>{changeForm.old_password=val.trim()}"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度为6-20字符,可使用下划线', trigger: ['blur', 'change'] }]"
        >
          <el-input
            :type="pwdType?'password':'text'"
            placeholder="密码"
            v-model="changeForm.password"
            minlength="6"
            maxlength="20"
            @change="(val)=>{changeForm.password=val.trim()}"
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
          label="确认新密码"
          prop="repassword"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度为6-20字符,可使用下划线', trigger: ['blur', 'change'] },{ validator: checkUserExist, trigger: 'blur' }]"
        >
          <el-input
            :type="newPwdType?'password':'text'"
            placeholder="密码"
            v-model="changeForm.repassword"
            minlength="6"
            maxlength="20"
            @change="(val)=>{changeForm.repassword=val.trim()}"
          >
            <i
              :class="newPwdType?'el-icon-view':'iconfont iconyincang'"
              style="cursor:pointer;"
              slot="suffix"
              @click="newPwdType = !newPwdType"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            v-loading="loadingBtn"
            :disabled="loadingBtn"
            @click="subChange"
          >确定修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { changePwd } from "./api/user.js";
export default {
  data() {
    return {
      loadingBtn: false,
      pwdType: true,
      newPwdType: true,
      changeForm: {
        old_password: "",
        password: "",
        repassword: ""
      }
    };
  },
  methods: {
    subChange() {
      if (this.loadingBtn) return;
      this.loadingBtn = true;
      this.$refs["changeForm"].validate(valid => {
        if (valid) {
          this.changePwd();
        } else {
          this.loadingBtn = false;
        }
      });
    },
    async changePwd() {
      let res = await changePwd(this.changeForm);
      if (res.code == 0) {
        this.$message.success(res.msg);
        this.$refs["changeForm"].resetFields();
      }
      this.loadingBtn = false;
    },
    checkUserExist(rule, value, callback) {
      let password = this.changeForm.password;
      let repassword = this.changeForm.repassword;
      if (password != repassword) {
        callback(new Error("两次新密码输入不一致,请重新输入"));
      } else {
        callback();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.change-pwd {
  .el-form-item {
    max-width: 480px;
  }
  /deep/.el-input__inner {
    padding: 0 8px;
  }
}
</style>