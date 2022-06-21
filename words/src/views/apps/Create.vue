<template>
  <div>
    <!-- 顶部的DIV需要添加一个指令兼容滚动 -->
    <transition
      name="el-fade-in"
      v-show="false"
    >
      <headerBtn :class="scrolling?'scrolling':''">
        <el-button @click="$router.push({name:'apps'})">取消</el-button>
        <el-button
          type="primary"
          @click="submitCreate"
          v-loading="loadingBtn"
          :disabled="loadingBtn"
        >创建应用</el-button>
      </headerBtn>
    </transition>
    <div
      class="container"
      :class="scrolling?'pt56':''"
    >
      <!-- start bread -->
      <div class="bread">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ name:'apps' }">应用</el-breadcrumb-item>
          <el-breadcrumb-item>创建应用</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- end bread -->
      <!-- start title -->
      <h1 class="title clear">
        <span
          class="text-btn"
          style="font-size:24px;cursor:pointer;"
          @click="$router.push({name:'apps'})"
        ><i
            data-v-4148bf28=""
            class="iconfont icon-_back-left"
          ></i>创建应用</span>
      </h1>
      <!-- end title -->
      <el-form
        :label-position="'top'"
        label-width="80px"
        size="medium"
        class="create-from"
        ref="createForm"
        :model="createForm"
      >
        <!-- start 基础信息 -->
        <div class="box">
          <h3 class="title">基础信息</h3>
          <el-form-item
            label="应用类型"
            prop="app_type"
          >
            <el-radio
              :label="1"
              v-model="createForm.app_type"
            >开放应用</el-radio>
          </el-form-item>
          <el-form-item
            label="应用名称"
            prop="title"
            :rules="[{ required: true, message: '请输入应用名称', trigger: 'blur' }]"
          >
            <el-input
              v-model="createForm.title"
              maxlength="20"
              :show-word-limit="true"
              @change="(val)=>{createForm.title=val.trim()}"
              placeholder="应用名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="应用图标"
            prop="img"
            :rules="[{ required: true, message: '请上传应用图标', trigger: 'blur' }]"
          >
            <div>
              <el-button
                class="fl up-image"
                style="padding: 0px;"
                @click="selectFile"
                :disabled="disableUpload"
              >
                <el-image
                  style="width: 80px; height: 80px"
                  :fit="'cover'"
                  :src="createForm.img?($fileCdn+createForm.img):''"
                >
                  <div
                    slot="error"
                    class="image-slot"
                    v-if="!createForm.img"
                  >
                    <i class="iconfont iconshangchuan"></i>
                    <p>上传图标</p>
                  </div>
                </el-image>
                <i
                  v-if="createForm.img"
                  class="iconfont icontupian"
                  v-show="!disableUpload"
                ></i>
              </el-button>
              <el-button
                type="text"
                class="image-word font400"
              >图片格式为.jpg或.svg格式，尺寸建议512 X 512</el-button>
            </div>
            <input
              accept="image/png,image/jpeg,image/gif,image/svg+xml"
              type="file"
              style="display:none;"
              ref="selFile"
              autocomplete="off"
              @change="fileChange"
            />
          </el-form-item>
          <el-form-item
            label="应用描述"
            prop="desc"
            :rules="[{ required: true, message: '请输入应用描述', trigger: 'blur' }]"
          >
            <el-input
              v-model="createForm.desc"
              @change="(val)=>{createForm.desc=val.trim()}"
              type="textarea"
              placeholder="请输入应用描述"
              maxlength="100"
              :show-word-limit="true"
              :resize="'none'"
              class="des-textarea"
            />
          </el-form-item>
          <el-form-item
            label="联系邮箱"
            prop="email"
            :rules="[{ required: true, message: '请输入联系邮箱', trigger: 'blur' },{ type: 'email', message: '邮箱地址不正确', trigger: ['blur', 'change'] }]"
          >
            <el-input
              v-model="createForm.email"
              @change="(val)=>{createForm.email=val.trim()}"
              placeholder="开发人员联系邮箱"
            ></el-input>
          </el-form-item>
        </div>
        <!-- end 基础信息 -->
        <!-- start URL -->
        <div class="box">
          <h3 class="title">应用URL</h3>
          <el-form-item
            prop="app_uri"
            label="APP URL"
            :rules="[{ required: true, message: '请输入回调URL', trigger: 'blur' },{type: 'url',message: 'URL地址格式不正确',trigger: ['blur','change']}]"
          >
            <el-input
              placeholder="应用内嵌通讯地址"
              @change="(val)=>{createForm.app_uri=val.trim()}"
              v-model="createForm.app_uri"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="redirect_uri"
            label="被允许的重定向URL"
            :rules="[{ required: true, message: '请输入重定向URL', trigger: 'blur' },{type: 'url',message: 'URL地址格式不正确',trigger: ['blur','change']}]"
          >
            <el-input
              placeholder="重定向URL"
              @change="(val)=>{createForm.redirect_uri=val.trim()}"
              v-model="createForm.redirect_uri"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="extend_url"
            label="扩展URL"
            :rules="[{ required: true, message: '请输入扩展URL', trigger: 'blur' },{type: 'url',message: 'URL地址格式不正确',trigger: ['blur','change']}]"
          >
            <el-input
              placeholder="扩展URL"
              @change="(val)=>{createForm.extend_url=val.trim()}"
              v-model="createForm.extend_url"
            ></el-input>
          </el-form-item>
        </div>
        <!-- end URL -->
        <!-- start 应用权限 -->
        <div class="box">
          <h3 class="title">应用权限<el-button
              type="text"
              style="margin-left:20px;"
              @click="goApi"
            >了解API接口</el-button>
          </h3>
          <el-form-item
            label="商品API"
            class="fbold"
          >
            <el-radio-group v-model="createForm.scope.products">
              <el-radio
                label="read"
                class="font400"
                @click.native.prevent="createForm.scope.products=='read'?createForm.scope.products='':createForm.scope.products='read'"
              >只读权限</el-radio>
              <el-radio
                label="write"
                class="font400"
                @click.native.prevent="createForm.scope.products=='write'?createForm.scope.products='':createForm.scope.products='write'"
              >读写权限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="订单API"
            class="fbold"
          >
            <el-radio-group v-model="createForm.scope.orders">
              <el-radio
                label="read"
                class="font400"
                @click.native.prevent="createForm.scope.orders=='read'?createForm.scope.orders='':createForm.scope.orders='read'"
              >只读权限</el-radio>
              <el-radio
                label="write"
                class="font400"
                @click.native.prevent="createForm.scope.orders=='write'?createForm.scope.orders='':createForm.scope.orders='write'"
              >读写权限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="脚本标签API"
            class="fbold"
          >
            <el-radio-group v-model="createForm.scope.script_tags">
              <el-radio
                label="read"
                class="font400"
                @click.native.prevent="createForm.scope.script_tags=='read'?createForm.scope.script_tags='':createForm.scope.script_tags='read'"
              >只读权限</el-radio>
              <el-radio
                label="write"
                class="font400"
                @click.native.prevent="createForm.scope.script_tags=='write'?createForm.scope.script_tags='':createForm.scope.script_tags='write'"
              >读写权限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="分类"
            class="fbold"
          >
            <el-radio-group v-model="createForm.scope.categories">
              <el-radio
                label="read"
                class="font400"
                @click.native.prevent="createForm.scope.categories=='read'?createForm.scope.categories='':createForm.scope.categories='read'"
              >只读权限</el-radio>
              <el-radio
                label="write"
                class="font400"
                @click.native.prevent="createForm.scope.categories=='write'?createForm.scope.categories='':createForm.scope.categories='write'"
              >读写权限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="Hooks"
            class="fbold"
          >
            <el-radio-group v-model="createForm.scope.hooks">
              <el-radio
                label="read"
                class="font400"
                @click.native.prevent="createForm.scope.hooks=='read'?createForm.scope.hooks='':createForm.scope.hooks='read'"
              >只读权限</el-radio>
              <el-radio
                label="write"
                class="font400"
                @click.native.prevent="createForm.scope.hooks=='write'?createForm.scope.hooks='':createForm.scope.hooks='write'"
              >读写权限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="店铺"
            class="fbold"
          >
            <el-radio-group v-model="createForm.scope.shop">
              <el-radio
                label="read"
                class="font400"
                @click.native.prevent="createForm.scope.shop=='read'?createForm.scope.shop='':createForm.scope.shop='read'"
              >只读权限</el-radio>
              <el-radio
                label="write"
                class="font400"
                @click.native.prevent="createForm.scope.shop=='write'?createForm.scope.shop='':createForm.scope.shop='write'"
              >读写权限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="顾客"
            class="fbold"
          >
            <el-radio-group v-model="createForm.scope.customers">
              <el-radio
                label="read"
                class="font400"
                @click.native.prevent="createForm.scope.customers=='read'?createForm.scope.customers='':createForm.scope.customers='read'"
              >只读权限</el-radio>
              <el-radio
                label="write"
                class="font400"
                @click.native.prevent="createForm.scope.customers=='write'?createForm.scope.customers='':createForm.scope.customers='write'"
              >读写权限</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <!-- end 应用权限 -->
      </el-form>
      <!-- START SAVE -->
      <div class="pageSaveBtn">
        <el-button @click="$router.push({name:'apps'})">取消</el-button>
        <el-button
          type="primary"
          @click="submitCreate"
          v-loading="loadingBtn"
          :disabled="loadingBtn"
        >创建应用</el-button>
      </div>
      <!-- END SAVE -->
    </div>
  </div>
</template>
<script>
import headerBtn from "@/components/header/headerBtn";
import { mapGetters } from "vuex";
import { getFileMD5, getAliOssConfig, uploadToOSS } from "@/util/common";
import { createApp } from "./api/apps";
export default {
  data() {
    return {
      disableUpload: false, //阻止多次选取图片
      loadingBtn: false,
      createForm: {
        app_type: 1,
        title: "",
        desc: "",
        img: "",
        scope: { orders: "", products: "", script_tags: "",categories:"",hooks:"",shop:"",customers:""},
        app_uri: "",
        email: "",
        extend_url: "",
        redirect_uri: ""
      }
    };
  },
  methods: {
    goApi() {
      window.open("https://docs.xshoppy.com/api/", "_blank");
    },
    selectFile() {
      this.$refs.selFile.click();
    },
    async fileChange() {
      this.disableUpload = true;
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
        this.disableUpload = false;
        return;
      }
      if (file.size >= 500 * 1024) {
        this.$message.error("图片大小不能超过500KB");
        this.disableSub = false;
        this.$refs.selFile.value = "";
        this.disableUpload = false;
        return;
      }
      // console.log(this.$refs.selFile.files);
      let md5 = await getFileMD5(file);
      let res = await getAliOssConfig(md5);
      let ossConfig;
      if (res.code == 0) {
        ossConfig = res.data.config;
        let uploadUrl;
        if (res.data.file.file_preview) {
          uploadUrl = res.data.file.file_preview;
        } else {
          let { url, file_id } = await uploadToOSS(file, ossConfig, md5);
          uploadUrl = url;
        }
        if (uploadUrl) {
          this.createForm.img = uploadUrl;
        }
      }
      this.disableUpload = false;
    },
    submitCreate() {
      if (this.loadingBtn) return;
      this.loadingBtn = true;
      this.$refs["createForm"].validate(valid => {
        if (valid) {
          this.createApp();
        } else {
          this.loadingBtn = false;
        }
      });
    },
    async createApp() {
      let res = await createApp(this.createForm);
      if (res.code == 0) {
        this.$message.success("创建成功");
        this.$router.push({ name: "apps" });
      }
      this.loadingBtn = false;
    }
  },
  components: {
    headerBtn
  },
  computed: {
    ...mapGetters(["scrolling"])
  }
};
</script>
<style lang="less" scoped>
.create-from {
  .el-form-item {
    max-width: 480px;
  }
  .image-word {
    margin-left: 20px;
    color: #999999;
    height: 80px;
    line-height: 100%;
    cursor: auto;
  }
  .up-image {
    border-radius: 4px;
    width: 80px;
    height: 80px;
    position: relative;
    .icontupian {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      display: none;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      color: #ffffff;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;
    }
    &:hover .icontupian {
      display: flex;
    }
  }
  .des-textarea {
    /deep/.el-textarea__inner {
      height: 144px !important;
    }
  }
  /deep/.el-form-item__label {
    //重写表单样式
  }
  /deep/.el-radio:focus:not(.is-focus):not(:active):not(.is-disabled)
    .el-radio__inner {
    box-shadow: none;
  }
  /deep/.el-image {
    .image-slot {
      width: 100%;
      height: 100%;
      position: relative;
      background: #f5f6f9;
      display: flex;
      flex-direction: column;
      padding: 12px;
      align-items: center;
      i {
        color: #999999;
        display: flex;
        width: 32px;
        height: 32px;
        top: 12px;
        font-size: 32px;
        margin-bottom: 4px;
      }
      p {
        color: #999999;
        font-size: 14px;
      }
    }
  }
}
</style>