<template>
  <div class="container app-detail">
    <!-- start bread -->
    <div class="bread">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ name:'apps' }">应用</el-breadcrumb-item>
        <el-breadcrumb-item>应用详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- end bread -->
    <!-- start title -->
    <h1 class="title clear">
      <span
        class="text-btn"
        style="font-size:24px;cursor:pointer;"
        @click="$router.push({name:'apps'})"
      ><i class="iconfont icon-_back-left"></i>{{appObj.title}}</span>
      <span
        class="options"
        v-show="!loading"
      >
        <el-button
          type="text"
          size="medium"
          @click="$router.push({name:'editApp',params:{id:$route.params.id},query:{name:appObj.title}})"
        ><i
            class="iconfont iconshezhi font400"
            style="margin-right:8px;font-size: 20px;position: relative;top:2px;"
          ></i>应用设置</el-button>
        <el-button
          type="text"
          size="medium"
          style="padding-left: 25px;"
          @click="$router.push({name:'stores',query:{id:$route.params.id,name:appObj.title}})"
        ><i class="icon-test"></i><span style="font-weight:400;padding:0px;color:#666666;">在店铺测试应用</span></el-button>
        <el-button
          type="primary"
          size="medium"
          :disabled="loading || appObj.status!=0"
          @click="showPublic=true"
        >发布应用</el-button>
      </span>
    </h1>
    <!-- end title -->
    <!-- start test app -->
    <el-form
      :label-position="'top'"
      label-width="80px"
      size="medium"
      class="create-from"
    >
      <div
        class="box"
        v-loading="loading"
      >
        <h3 class="title pb12">测试您的应用</h3>
        <el-form-item
          label="在开发商店上测试您的应用"
          class="fbold mb0 font400"
        >
          <el-button
            class="font400"
            @click="$router.push({name:'stores',query:{id:$route.params.id,name:appObj.title}})"
          >选择店铺</el-button>
        </el-form-item>
      </div>
      <!-- end test app -->
      <!-- start 秘钥 -->
      <div
        class="box"
        v-loading="loading"
      >
        <h3 class="title">API密钥</h3>
        <el-form-item label="API key">
          <el-input
            size="medium"
            readonly="readonly"
            :disabled="true"
            :type="'text'"
            v-model="appObj.client_id"
          >
            <el-button
              slot="append"
              class="font400"
              @click="copy(1)"
            >复制</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="API secret key">
          <el-input
            size="medium"
            readonly="readonly"
            :disabled="true"
            :type="pwdType?'password':'text'"
            v-model="appObj.client_secret"
          >
            <i
              slot="append"
              :class="pwdType?'el-icon-view':'iconfont iconyincang'"
              style="position: absolute;left: -25px;cursor: pointer;"
              @click="pwdType=!pwdType"
            ></i>
            <el-button
              slot="append"
              class="font400"
              @click="copy(2)"
            >复制</el-button>
          </el-input>
        </el-form-item>
        <el-form-item
          label=""
          class="mb0"
        >
          <p style="line-height:20px;color: #999999;">使用这些 API 密钥 从您的应用访问 XShoppy API。应用设置页面上也提供了这些密钥。</p>
        </el-form-item>
      </div>
      <!-- end 秘钥 -->
    </el-form>
    <!-- 发布应用 -->
    <el-dialog
      :title="'发布应用'+appObj.title"
      width="640px"
      :visible.sync="showPublic"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      style="padding: 0 20px 20px 20px;"
      :before-close="()=>{showPublic=false}"
    >
      <div class="public-tip">
        <h3 style="margin-bottom:6px;">温馨提示</h3>
        <p>应用发布后将出现在XShoppy应用商城供所有商户安装使用，请确保应用可安装且达到发布标准</p>
      </div>
      <div slot="footer">
        <el-button @click.stop="$router.push({name:'stores',query:{id:appObj.id,name:appObj.title}})">测试应用</el-button>
        <el-button
          type="primary"
          v-loading="loadingPublic"
          :disabled="loadingPublic"
          @click="publicApp"
        >提交申请</el-button>
      </div>
    </el-dialog>
    <!-- end 发布应用 -->
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
      <h2 class="tip-title">应用{{appObj.title}}发布申请提交成功!</h2>
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
import { getAppDetail, publicApp } from "./api/apps.js";
import { copyWord } from "@/util/common";
export default {
  data() {
    return {
      loadingPublic: false,
      showApplySuccess: false,
      showPublic: false,
      pwdType: true,
      loading: true,
      appObj: {
        client_id: "",
        client_secret: "",
        title: "",
        id: "",
        status: ""
      }
    };
  },
  mounted() {
    this.getAppDetail();
  },
  methods: {
    copy(type) {
      let value = type == 1 ? this.appObj.client_id : this.appObj.client_secret;
      copyWord(value);
    },
    async publicApp() {
      this.loadingPublic = true;
      let res = await publicApp({ application_id: this.$route.params.id });
      if (res.code == 0) {
        this.showApplySuccess = true;
        this.getAppDetail();
      }
      this.loadingPublic = false;
      this.showPublic = false;
    },
    async getAppDetail() {
      let id = this.$route.params.id;
      let res = await getAppDetail(id);
      if (res.code == 0) {
        this.appObj = res.data;
        // console.log(JSON.stringify(res.data));
      } else {
        // this.$message.error("应用不存在");
        this.$router.push({ name: "apps" });
      }
      this.loading = false;
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.app-detail {
  .el-form-item {
    max-width: 480px;
  }
  /deep/.el-button--text {
    color: #000000;
    position: relative;
    &:last-child {
      color: #666666;
      span {
        padding-left: 28px;
      }
    }
  }
  .icon-test {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: transparent url(~@/assets/images/test-icon.png) center
      center/100% 100% no-repeat;
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
  }
  .tip-title {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 8px;
    text-align: left;
    background: url(~@/assets/images/CheckCircle-green.png) left center/22px
      22px no-repeat;
    padding-left: 38px;
  }
}
</style>