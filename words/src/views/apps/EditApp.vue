<template>
  <div>
    <!-- 顶部的DIV需要添加一个指令兼容滚动 -->
    <transition
      name="el-fade-in"
      v-show="false"
    >
      <headerBtn :class="scrolling?'scrolling':''">
        <el-button @click="$router.push({name:'appDetail',params: { id: $route.params.id }})">取消</el-button>
        <el-button
          type="primary"
          @click="savaValidate"
          :disabled="loadingBtn || disableSub"
        >保存修改</el-button>
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
          <el-breadcrumb-item :to="{ name:'appDetail' , params: { id: $route.params.id }}">{{this.$route.query.name}}</el-breadcrumb-item>
          <el-breadcrumb-item>应用设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- end bread -->
      <!-- start title -->
      <h1 class="title clear">
        <span
          class="text-btn"
          style="font-size:24px;cursor:pointer;"
          @click="$router.push({name:'appDetail',params: { id: $route.params.id }})"
        ><i
            data-v-4148bf28=""
            class="iconfont icon-_back-left"
          ></i>应用设置</span>
      </h1>
      <!-- end title -->
      <el-form
        :label-position="'top'"
        label-width="80px"
        size="medium"
        class="edit-from"
        ref="editForm"
        :model="editForm"
      >
        <!-- start 基础信息 -->
        <div
          class="box"
          v-loading="loading"
        >
          <h3 class="title">基础信息</h3>
          <el-form-item label="应用类型">
            <el-radio-group v-model="editForm.app_type">
              <el-radio :label="1">开放应用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="应用名称"
            prop="title"
            :rules="[{ required: true, message: '请输入应用名称', trigger: 'blur' }]"
          >
            <el-input
              v-model="editForm.title"
              maxlength="20"
              :show-word-limit="true"
              @change="(val)=>{editForm.title=val.trim()}"
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
                  :src="editForm.img?($fileCdn+editForm.img):''"
                >
                  <div
                    slot="error"
                    class="image-slot"
                    v-if="!editForm.img"
                  >
                    <i class="iconfont iconshangchuan"></i>
                    <p>上传图标</p>
                  </div>
                </el-image>
                <i
                  v-if="editForm.img"
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
              v-model="editForm.desc"
              @change="(val)=>{editForm.desc=val.trim()}"
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
              v-model="editForm.email"
              @change="(val)=>{editForm.email=val.trim()}"
              placeholder="开发人员联系邮箱"
            ></el-input>
          </el-form-item>
        </div>
        <!-- end 基础信息 -->
        <!-- start URL -->
        <div
          class="box"
          v-loading="loading"
        >
          <h3 class="title">应用URL</h3>
          <el-form-item
            prop="app_uri"
            label="APP URL"
            :rules="[{ required: true, message: '请输入回调URL', trigger: 'blur' },{type: 'url',message: 'URL地址格式不正确',trigger: ['blur','change']}]"
          >
            <el-input
              placeholder="应用内嵌通讯地址"
              @change="(val)=>{editForm.app_uri=val.trim()}"
              v-model="editForm.app_uri"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="redirect_uri"
            label="被允许的重定向URL"
            :rules="[{ required: true, message: '请输入重定向URL', trigger: 'blur' },{type: 'url',message: 'URL地址格式不正确',trigger: ['blur','change']}]"
          >
            <el-input
              placeholder="重定向URL"
              @change="(val)=>{editForm.redirect_uri=val.trim()}"
              v-model="editForm.redirect_uri"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="extend_url"
            label="扩展URL"
            :rules="[{ required: true, message: '请输入扩展URL', trigger: 'blur' },{type: 'url',message: 'URL地址格式不正确',trigger: ['blur','change']}]"
          >
            <el-input
              placeholder="扩展URL"
              @change="(val)=>{editForm.extend_url=val.trim()}"
              v-model="editForm.extend_url"
            ></el-input>
          </el-form-item>
        </div>
        <!-- end URL -->
        <!-- start 应用权限 -->
        <div
          class="box"
          v-loading="loading"
        >
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
            <el-radio-group v-model="editForm.scope.products">
              <el-radio
                label="read"
                class="font400"
                @click.native.prevent="editForm.scope.products=='read'?editForm.scope.products='':editForm.scope.products='read'"
              >只读权限</el-radio>
              <el-radio
                label="write"
                class="font400"
                @click.native.prevent="editForm.scope.products=='write'?editForm.scope.products='':editForm.scope.products='write'"
              >读写权限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="订单API"
            class="fbold"
          >
            <el-radio-group v-model="editForm.scope.orders">
              <el-radio
                label="read"
                class="font400"
                @click.native.prevent="editForm.scope.orders=='read'?editForm.scope.orders='':editForm.scope.orders='read'"
              >只读权限</el-radio>
              <el-radio
                label="write"
                class="font400"
                @click.native.prevent="editForm.scope.orders=='write'?editForm.scope.orders='':editForm.scope.orders='write'"
              >读写权限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="脚本标签API"
            class="fbold"
          >
            <el-radio-group v-model="editForm.scope.script_tags">
              <el-radio
                label="read"
                class="font400"
                @click.native.prevent="editForm.scope.script_tags=='read'?editForm.scope.script_tags='':editForm.scope.script_tags='read'"
              >只读权限</el-radio>
              <el-radio
                label="write"
                class="font400"
                @click.native.prevent="editForm.scope.script_tags=='write'?editForm.scope.script_tags='':editForm.scope.script_tags='write'"
              >读写权限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="分类"
            class="fbold"
          >
            <el-radio-group v-model="editForm.scope.categories">
              <el-radio
                label="read"
                class="font400"
                @click.native.prevent="editForm.scope.categories=='read'?editForm.scope.categories='':editForm.scope.categories='read'"
              >只读权限</el-radio>
              <el-radio
                label="write"
                class="font400"
                @click.native.prevent="editForm.scope.categories=='write'?editForm.scope.categories='':editForm.scope.categories='write'"
              >读写权限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="Hooks"
            class="fbold"
          >
            <el-radio-group v-model="editForm.scope.hooks">
              <el-radio
                label="read"
                class="font400"
                @click.native.prevent="editForm.scope.hooks=='read'?editForm.scope.hooks='':editForm.scope.hooks='read'"
              >只读权限</el-radio>
              <el-radio
                label="write"
                class="font400"
                @click.native.prevent="editForm.scope.hooks=='write'?editForm.scope.hooks='':editForm.scope.hooks='write'"
              >读写权限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="店铺"
            class="fbold"
          >
            <el-radio-group v-model="editForm.scope.shop">
              <el-radio
                label="read"
                class="font400"
                @click.native.prevent="editForm.scope.shop=='read'?editForm.scope.shop='':editForm.scope.shop='read'"
              >只读权限</el-radio>
              <el-radio
                label="write"
                class="font400"
                @click.native.prevent="editForm.scope.shop=='write'?editForm.scope.shop='':editForm.scope.shop='write'"
              >读写权限</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="顾客"
            class="fbold"
          >
            <el-radio-group v-model="editForm.scope.customers">
              <el-radio
                label="read"
                class="font400"
                @click.native.prevent="editForm.scope.customers=='read'?editForm.scope.customers='':editForm.scope.customers='read'"
              >只读权限</el-radio>
              <el-radio
                label="write"
                class="font400"
                @click.native.prevent="editForm.scope.customers=='write'?editForm.scope.customers='':editForm.scope.customers='write'"
              >读写权限</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <!-- end 应用权限 -->
      </el-form>
      <!-- START SAVE -->
      <div
        class="pageSaveBtn"
        style="position:relative;"
      >
        <el-button
          type="danger"
          @click="showDelProp=true"
          style="position:absolute;left:0px;bottom:0px;"
        >删除应用</el-button>
        <el-button @click="$router.push({name:'appDetail',params: { id: $route.params.id }})">取消</el-button>
        <el-button
          type="primary"
          @click="savaValidate"
          v-loading="loadingBtn"
          :disabled="loadingBtn || disableSub"
        >保存修改</el-button>
      </div>
      <!-- END SAVE -->
    </div>

    <!-- 应用删除 -->
    <el-dialog
      :title="'确定要删除应用'+$route.query.name+'?'"
      width="640px"
      :visible.sync="showDelProp"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      style="padding: 0 20px 20px 20px;"
      :before-close="()=>{showDelProp=false}"
    >
      <div class="public-tip">
        <p style="margin-bottom:38px;background: #FFF1F0;border: 1px solid #FF4D4F;border-radius: 2px;color: rgba(0, 0, 0, 0.85);padding: 16px;">这款应用目前由商家正在使用，若删除将导致他们无法使用应用。请在删除应用之前，通知已安装改应用的商家。<el-button
            type="text"
            style="padding:0px;"
            @click="downloadData"
          >导出商家列表</el-button>
        </p>
      </div>
      <p>应用{{$route.query.name}}将从所有店铺卸载并从XShoppy删除，此操作无法撤销。</p>
      <div slot="footer">
        <el-button @click.stop="showDelProp=false">取消</el-button>
        <el-button
          type="danger"
          v-loading="loadingDel"
          :disabled="loadingDel"
          @click="delApp"
        >删除应用</el-button>
      </div>
    </el-dialog>
    <!-- end 应用删除 -->
    <!-- 更改应用权限 -->
    <el-dialog
      :title="'更改应用权限'"
      width="640px"
      :visible.sync="showSaveProp"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      style="padding: 0 20px 20px 20px;"
      :before-close="()=>{showSaveProp=false}"
    >
      <p>更改应用权限后将为您创建应用新版本，您可在应用详情管理各版本应用。</p>
      <div slot="footer">
        <el-button @click.stop="showSaveProp=false">暂不更改</el-button>
        <el-button
          type="primary"
          v-loading="loadingBtn"
          :disabled="loadingBtn || disableSub"
          @click="submitEdit"
        >确定更改</el-button>
      </div>
    </el-dialog>
    <!-- end 更改应用权限 -->
    <!-- 应用权限更新 -->
    <el-dialog
      :title="'应用权限更新'"
      width="640px"
      :visible.sync="showPublic"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      style="padding: 0 20px 20px 20px;"
      :before-close="()=>{showPublic=false}"
    >
      <p>应用权限已更新，请尽快发布应用以保证用户使用最新版本，您也可随时在应用列表与应用详情发布最新应用。</p>
      <div slot="footer">
        <el-button @click.stop="showPublic=false">稍后</el-button>
        <el-button
          type="primary"
          v-loading="loadingPublic"
          :disabled="loadingPublic"
          @click="publicApp"
        >发布应用</el-button>
      </div>
    </el-dialog>
    <!-- end 应用权限更新 -->
    <!-- 申请发布成功提示 -->
    <el-dialog
      :title="''"
      width="478px"
      :visible.sync="showApplySuccess"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      style="padding: 0 20px 20px 20px;"
      :before-close="()=>{showApplySuccess=false}"
    >
      <h2 class="apply-title">应用{{editForm.title}}发布申请提交成功!</h2>
      <p style="font-size: 14px;line-height: 24px;color: rgba(0, 0, 0, 0.65);padding-left:38px;">我们将尽快审核您的申请，审核范围包括但不限于应用安装与功能；审核进度将通过开发者邮箱反馈，请及时查阅邮件，了解审核进度。</p>
      <div slot="footer">
        <el-button
          type="primary"
          @click="showApplySuccess=false"
        >知道了</el-button>
      </div>
    </el-dialog>
    <!-- end 申请发布成功提示 -->
  </div>
</template>
<script>
import headerBtn from "@/components/header/headerBtn";
import { getAppDetail } from "./api/apps.js";
import { mapGetters } from "vuex";
import {
  getFileMD5,
  getAliOssConfig,
  uploadToOSS,
  looseEqual,
  deepCopy,
  exportBlob
} from "@/util/common";
import { editApp, delApp, exportData, publicApp } from "./api/apps";
export default {
  data() {
    return {
      loadingPublic: false,
      showApplySuccess: false,
      showPublic: false,
      showSaveProp: false,
      loadingSave: false,
      loadingDel: false,
      showDelProp: false, //显示删除弹层
      disableUpload: false, //阻止多次选取图片
      loadingBtn: false,
      disableSub: true,
      loading: true,
      oldEditForm: {},
      editForm: {
        app_type: 1,
        title: "",
        desc: "",
        img: "",
        app_uri: "",
        email: "",
        extend_url: "",
        redirect_uri: "",
        scope: { orders: "", products: "", script_tags: "",categories:"",hooks:"",shop:"",customers:""},
      }
    };
  },
  mounted() {
    this.getAppDetail();
  },
  methods: {
    async publicApp() {
      this.loadingPublic = true;
      let res = await publicApp({ application_id: this.$route.params.id });
      if (res.code == 0) {
        this.showPublic = false;
        this.showApplySuccess = true;
      }
      this.loadingPublic = false;
    },
    async downloadData() {
      let id = this.$route.params.id;
      let res = await exportData(
        id,
        { $hideMsg: true },
        { responseType: "arraybuffer" }
      );
      if (res) {
        //下载流
        exportBlob(res);
      }
    },
    goApi() {
      window.open("https://docs.xshoppy.com/api/", "_blank");
    },
    async delApp() {
      this.loadingDel = true;
      let res = await delApp(this.$route.params.id);
      if (res.code == 0) {
        this.$message.success("删除成功");
      }
      this.$router.push({
        name: "apps"
      });
      this.loadingDel = false;
    },
    initFormData(editForm) {
      deepCopy(editForm, this.oldEditForm);
    },
    async getAppDetail() {
      let id = this.$route.params.id;
      let res = await getAppDetail(id);
      if (res.code == 0) {
        for (let i in this.editForm) {
          if (i == "scope") {
            this.editForm[i] = JSON.parse(res.data[i]);
          } else {
            this.editForm[i] = res.data[i];
          }
        }
        this.initFormData(this.editForm);
      } else {
        // this.$message.error("应用不存在");
        this.router.push({ name: "apps" });
      }
      this.loading = false;
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
          this.editForm.img = uploadUrl;
        }
      }
      this.disableUpload = false;
    },
    savaValidate() {
      let scopeChange = looseEqual(this.editForm.scope, this.oldEditForm.scope); //判断权限是否修改
      if (scopeChange) {
        //权限未变，直接保存
        this.submitEdit();
      } else {
        //权限改变，弹层
        this.showSaveProp = true;
      }
    },
    submitEdit() {
      if (this.loadingBtn) return;
      this.loadingBtn = true;
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this.editApp();
        } else {
          this.loadingBtn = false;
        }
      });
    },
    async editApp() {
      let scopeChange = looseEqual(this.editForm.scope, this.oldEditForm.scope); //判断权限是否修改
      this.initFormData(this.editForm);
      let res = await editApp(this.$route.params.id, this.editForm);
      if (res.code == 0) {
        this.disableSub = true;
        this.showSaveProp = false;
        if (scopeChange) {
          this.$message.success("修改成功");
        } else {
          this.showPublic = true;
        }
      }
      this.loadingBtn = false;
    },
    judgeChange(editForm) {
      let formRes = !looseEqual(editForm, this.oldEditForm);
      if (formRes) {
        //改变
        this.disableSub = false;
      } else {
        this.disableSub = true;
      }
    }
  },
  components: {
    headerBtn
  },
  computed: {
    ...mapGetters(["scrolling"])
  },
  watch: {
    editForm: {
      handler(editForm, oldName) {
        this.judgeChange(editForm);
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
.edit-from {
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
    i {
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
    &:hover i {
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
.apply-title {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 8px;
  text-align: left;
  background: url(~@/assets/images/CheckCircle-green.png) left center/22px 22px
    no-repeat;
  padding-left: 38px;
}
</style>