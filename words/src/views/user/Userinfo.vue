<template>
  <div class="container user-info">
    <!-- start title -->
    <h1 class="title clear">
      <span class="text">账号资料</span>
    </h1>
    <!-- end title -->
    <div
      class="box"
      style="margin-bottom:0px;"
    >
      <h3 class="title">账户信息</h3>
      <el-form
        ref="userForm"
        :model="userForm"
        label-width="96px"
        :label-position="'left'"
        size="mini"
      >
        <el-form-item label="账号类型">
          <div>开发者</div>
        </el-form-item>
        <el-form-item
          label="账号名称"
          prop="nickName"
        >
          <div v-show="!showChangeName">{{userInfo&&userInfo.nickName?userInfo.nickName:'未设置'}} <el-button
              type="text"
              class="ml20"
              @click="setUserForm(),showChangeName=!showChangeName"
              :disabled="disableSub"
            >编辑</el-button>
          </div>
          <div v-show="showChangeName">
            <el-input
              style="width:240px;"
              maxlength="20"
              @change="(val)=>{userForm.nickName=val.trim()}"
              v-model="userForm.nickName"
              :readonly="disableSub"
            ></el-input>
            <el-button
              type="text"
              class="ml20"
              @click="changeUserInfo"
              :disabled="disableSub || userForm&&!userForm.nickName.trim() || userInfo&&(userForm.nickName.trim()==userInfo.nickName)"
            >保存</el-button>
            <el-button
              type="text"
              class="ml20"
              @click="showChangeName=false"
              :disabled="disableSub"
            >取消</el-button>
          </div>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <div>{{userInfo&&userInfo.email}}</div>
        </el-form-item>
        <el-form-item label="头像">
          <div>
            <input
              accept="image/png,image/jpeg,image/gif,image/svg+xml"
              type="file"
              style="display:none;"
              ref="selFile"
              autocomplete="off"
              @change="fileChange"
            />
            <span
              class="user-header"
              :style="userInfo&&userInfo.file_key?{backgroundImage:'url('+ $fileCdn+userInfo.file_key + ')'}:''"
            ></span>
            <el-button
              type="text"
              class="upload-btn"
              @click="$refs['selFile'].click()"
              :disabled="disableSub"
            >上传头像</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { getFileMD5, getAliOssConfig, uploadToOSS } from "@/util/common";
import { changeUserInfo } from "./api/user";
export default {
  data() {
    return {
      disableSub: false, //保存按钮，上传头像按钮
      showChangeName: false,
      userForm: {
        nickName: "",
        headImageId: 0,
        file_key: ""
      }
    };
  },
  methods: {
    setUserForm() {
      this.userForm.nickName = this.userInfo && this.userInfo.nickName;
      this.userForm.headImageId = this.userInfo && this.userInfo.headImageId;
      this.userForm.file_key = this.userInfo && this.userInfo.file_key;
    },
    async fileChange() {
      this.disableSub = true;
      let file = this.$refs.selFile.files[0];
      if (!file) {
        this.disableSub = false;
        return;
      }
      if (
        "image/png,image/jpeg,image/gif,image/svg+xml".indexOf(file.type) < 0
      ) {
        this.$message.error("文件格式错误");
        this.disableSub = false;
        this.$refs.selFile.value = "";
        return;
      }
      if (file.size >= 200 * 1024) {
        this.$message.error("图片大小不能超过200KB");
        this.disableSub = false;
        this.$refs.selFile.value = "";
        return;
      }
      this.setUserForm();
      let md5 = await getFileMD5(file);
      let res = await getAliOssConfig(md5);
      let ossConfig;
      if (res.code == 0) {
        ossConfig = res.data.config;
        let uploadUrl, headImageId;
        if (res.data.file.file_preview) {
          uploadUrl = res.data.file.file_preview;
          headImageId = res.data.file.file_id;
        } else {
          let { url, file_id } = await uploadToOSS(file, ossConfig, md5);
          uploadUrl = url;
          headImageId = file_id;
        }
        if (uploadUrl) {
          this.userForm.file_key = uploadUrl;
          this.userForm.headImageId = headImageId;
        }
        this.changeUserInfo();
      }
      this.$refs.selFile.value = "";
      this.disableSub = false;
    },
    subState(params) {
      let keys = Object.keys(params);
      for (var i in keys) {
        this.userInfo[keys[i]] = params[keys[i]];
      }
      // console.log(this.userInfo);
      this.set_userInfo(this.userInfo);
    },
    async subUserInfo(params) {
      let res = await changeUserInfo(params);
      if (res.code == 0) {
        this.$message.success(res.msg);
        this.subState(params);
      }
      this.showChangeName = false;
      this.disableSub = false;
    },
    changeUserInfo() {
      this.disableSub = true;
      let file_key = this.file_key;
      let params = this.userForm;
      this.subUserInfo(params);
    },
    ...mapMutations({
      set_userInfo: "SET_USERINFO"
    })
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
};
</script>
<style lang="less" scoped>
.user-info {
  .user-header {
    position: absolute;
    left: 0px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    background: url(~@/assets/images/header.svg) 0px center/36px 36px no-repeat;
  }
  .upload-btn {
    margin-left: 56px;
  }
}
</style>