<template>
  <div class="container apps-list">
    <!-- start title -->
    <h1 class="title clear">
      <span class="text">应用</span>
      <span class="options">
        <el-button
          size="medium"
          type="primary"
          @click="$router.push({name:'createApp'})"
          :disabled="loading || appList.length>=10"
          v-loading="loading"
        >创建应用({{appList.length}}/10)</el-button>
      </span>
    </h1>
    <!-- end title -->
    <div
      class="content"
      v-loading="loading"
    >
      <div
        class="conditions"
        v-if="appList.length || loading"
      >
        <div class="search-box">
          <el-input
            @keyup.enter.native="searchLoading"
            size="medium"
            :placeholder="'请输入应用名称/URL'"
            v-model="searchKeyWrod"
            @change="(val)=>{searchKeyWrod=val.trim()}"
            @input="changeSearch"
            class="input-with-select"
          >
            <el-button
              size="medium"
              slot="append"
              @click="searchLoading"
            >搜索</el-button>
          </el-input>
        </div>
      </div>

      <!-- start app list -->
      <div
        class="table"
        v-if="appList.length || loading"
        v-loading="loadingTable"
      >
        <el-table
          class="apps-table"
          @row-click="rowClick"
          :data="filterData()"
        >
          <el-table-column
            label="图标"
            width="80"
          >
            <template slot-scope="scope">
              <div style="width:36px;height:36px;display:flex;justify-content:center;align-items:center;"><img
                  :src="$fileCdn+scope.row.img"
                  style="width:100%;"
                /></div>
            </template>
          </el-table-column>
          <el-table-column
            label="
                  应用名称"
            width="200"
          >
            <template slot-scope="scope">
              {{scope.row.title}}
            </template>
          </el-table-column>
          <el-table-column
            label="应用描述"
            width="240"
          >
            <template slot-scope="scope">
              {{scope.row.desc}}
            </template>
          </el-table-column>
          <el-table-column label="URL">
            <template slot-scope="scope">
              {{scope.row.redirect_url}}
            </template>
          </el-table-column>
          <el-table-column
            label="创建日期"
            width="93"
          >
            <template slot-scope="scope">
              {{scope.row.created_at.replace(/\d{2}\:\d{2}:\d{2}/,'')}}
            </template>
          </el-table-column>
          <el-table-column
            label="应用发布"
            width="80"
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  type="text"
                  @click.stop="curSel=scope.row;showPublic=true;"
                  v-if="scope.row.status==0"
                ><span style="font-weight:400;">发布应用</span>
                </el-button>
                <span
                  v-if="scope.row.status!=0"
                  style="display:flex;background: #BBE5B3;border-radius: 12px;padding: 3px 8px;width: 52px;height: 23px;font-size:12px;align-items:center;justify-content:center;"
                >{{scope.row.status==1?'已发布':'审核中'}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  type="text"
                  @click.stop="$router.push({name:'stores',query:{id:scope.row.id,name:scope.row.title}})"
                ><span style="font-weight:400;">测试应用</span></el-button>
              </div>
            </template>
          </el-table-column>
          <div slot="empty">
            <Nocontent>

            </Nocontent>
          </div>
        </el-table>
      </div>
      <!-- end app list -->
      <div
        class="no-apps"
        v-show="!appList.length&&!loading"
      >
        <div class="no-apps-icon"></div>
        <div class="no-apps-des">
          <p
            class="fbold"
            style="font-size:20px;"
          >熟悉开发者文档并创建您的第一个应用</p>
        </div>
        <el-button
          type="primary"
          size="medium"
          style="margin-top:40px;"
          @click="$router.push({name:'createApp'})"
        >创建应用</el-button>
        <el-button
          type="text"
          style="margin-top:10px;"
          @click="goDocs"
        ><span style="font-weight:400;">查看开发者文档</span></el-button>
      </div>
    </div>

    <!-- 发布应用 -->
    <el-dialog
      :title="'发布应用'+curSel.title"
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
        <el-button @click.stop="$router.push({name:'stores',query:{id:curSel.id,name:curSel.title}})">测试应用</el-button>
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
      <h2 class="tip-title">应用{{curSel.title}}发布申请提交成功!</h2>
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
import { getAppList, publicApp } from "./api/apps.js";
import Nocontent from "@/components/Nocontent";
export default {
  data() {
    return {
      showApplySuccess: false,
      showPublic: false,
      keyword: "", //搜索关键词
      searchKeyWrod: "", //执行搜索关键词
      searching: true,
      loading: true,
      loadingTable: false,
      loadingPublic: false,
      loadTime: 0,
      curSel: {},
      appList: []
    };
  },
  mounted() {
    this.getAppList();
  },
  methods: {
    goDocs() {
      window.open("https://docs.xshoppy.com/", "_blank");
    },
    rowClick(row, column, event) {
      let id = row.id;
      this.$router.push({ name: "appDetail", params: { id } });
    },
    searchLoading() {
      if (this.loadingTable) return;
      this.keyword = this.searchKeyWrod;
      this.loadingTable = true;
      let _this = this;
      setTimeout(() => {
        _this.loadingTable = false;
      }, 300);
    },
    changeSearch() {
      if (!this.searchKeyWrod.trim()) {
        this.keyword = "";
      }
    },
    filterData() {
      let keyword = this.keyword;
      let appList = this.appList;
      let res = keyword
        ? appList.filter((v, k) => {
            return (
              v.title.indexOf(keyword) >= 0 ||
              v.redirect_url.indexOf(keyword) >= 0
            );
          })
        : appList;
      return res;
    },
    async getAppList() {
      this.loading = true;
      let res = await getAppList();
      if (res.code == 0) {
        this.appList = res.data || [];
      }
      this.loading = false;
    },
    async publicApp() {
      this.loadingPublic = true;
      let res = await publicApp({ application_id: this.curSel.id });
      if (res.code == 0) {
        this.showApplySuccess = true;
      }
      this.loadingPublic = false;
      this.showPublic = false;
      this.getAppList();
    }
  },
  components: {
    Nocontent
  }
};
</script>
<style lang="less" scoped>
.apps-list {
  .no-apps {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 480px;
    .no-apps-icon {
      width: 312px;
      height: 132px;
      background: transparent url(~@/assets/images/no-apps.png) center
        center/100% 100% no-repeat;
    }
    .no-apps-des {
      margin-top: 40px;
    }
  }
  /deep/.el-table {
    tr {
      border-radius: 4px 4px 2px 2px;
      th {
        background: #f5f6f9;
        padding: 10px 0;
        &:nth-child(7) {
          .cell {
            text-align: right;
          }
        }
      }
      td {
        cursor: pointer;
        &:last-child {
          .cell {
            text-align: right;
          }
        }
        .cell {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .public-tip {
    padding: 16px;
    background: #e6f7ff;
    border: 1px solid #91d5ff;
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