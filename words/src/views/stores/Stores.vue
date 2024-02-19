<template>
  <div class="container stores-list">
    <!-- start bread -->
    <div class="bread">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ name:'apps' }">应用</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'appDetail',params: { id: $route.query.id} }">{{$route.query.name}}</el-breadcrumb-item>
        <el-breadcrumb-item>选择店铺</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- end bread -->
    <!-- start title -->
    <h1 class="title clear">
      <span
        class="text-btn"
        style="font-size:24px;cursor:pointer;"
        @click="$router.push({ name:'appDetail',params: { id: $route.query.id} })"
      ><i
          data-v-4148bf28=""
          class="iconfont icon-_back-left"
        ></i>选择店铺</span>
      <span class="options">
        <el-button
          size="medium"
          type="primary"
          class="font400"
          @click="showAdd=true"
          v-loading="loading"
          :disabled="loading || shopList.length>=10"
        >添加店铺({{shopList.length}}/10)</el-button>
      </span>
    </h1>
    <!-- end title -->
    <div
      class="content"
      v-loading="loading"
    >
      <div class="conditions">
        <div class="search-box">
          <el-input
            @keyup.enter.native="searchLoading"
            size="medium"
            :placeholder="'请输入店铺名称'"
            v-model="searchKeyWrod"
            @input="changeSearch"
            class="input-with-select"
            @change="(val)=>{searchKeyWrod=val.trim()}"
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
        v-loading="loadingTable"
      >
        <el-table :data="filterData()">
          <el-table-column label="店铺名称">
            <template slot-scope="scope">
              {{scope.row.domain}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
          >
            <template slot-scope="scope">
              <div>
                <el-button
                  type="text"
                  :disabled="installing"
                  @click="installApp(scope.row.domain)"
                  style="margin-right:20px;"
                >安装</el-button>
                <el-button
                  type="text"
                  :disabled="installing"
                  style="color: #E02020;"
                  @click="curSel=scope.row;showDelProp=true;"
                >删除</el-button>
              </div>
            </template>
          </el-table-column>
          <div
            slot="empty"
            v-show="!shopList.length&&!loading"
          >
            <Nocontent>
              <div>
                暂无店铺数据,请<el-button
                  type="text"
                  class="font400"
                  @click="showAdd=true"
                >添加店铺</el-button>
              </div>
            </Nocontent>
          </div>
        </el-table>
      </div>
      <!-- end app list -->
    </div>
    <!-- 添加店铺 -->
    <el-dialog
      :title="'添加店铺'"
      width="640px"
      :visible.sync="showAdd"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      style="padding: 0 20px 20px 20px;"
      :before-close="resetFields"
    >
      <div class="add-stores">
        <el-form
          :label-position="'left'"
          ref="bindForm"
          :model="bindForm"
          @keyup.enter.native="subBind"
          @submit.native.prevent
        >
          <el-form-item
            prop="name"
            :rules="[{ required: true, message: '地址错误', trigger: 'blur' },{type: 'url',message: '店铺地址格式不正确',trigger: ['blur','change']}]"
          >
            <el-input
              placeholder="请输入需要绑定的店铺地址 https://example.xshoppy.shop/admin/"
              v-model="bindForm.name"
              @change="(val)=>{bindForm.name=val.trim()}"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="resetFields">取消</el-button>
        <el-button
          type="primary"
          @click="subBind"
          v-loading="loadingBtn"
          :disabled="loadingBtn"
        >确定添加</el-button>
      </div>
    </el-dialog>
    <!-- end 添加店铺 -->
    <!-- 店铺删除 -->
    <el-dialog
      :title="'确定要删除店铺'+curSel.domain+'?'"
      width="640px"
      :visible.sync="showDelProp"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      style="padding: 0 20px 20px 20px;"
      :before-close="()=>{showDelProp=false}"
    >
      <p style="font-size: 16px;">删除店铺后，测试店铺名称将从列表消失，您可以随时通过添加店铺按钮为应用选择测试店铺。</p>
      <div slot="footer">
        <el-button @click.stop="showDelProp=false">取消</el-button>
        <el-button
          type="danger"
          v-loading="loadingDel"
          :disabled="loadingDel"
          @click="delStore"
        >删除店铺</el-button>
      </div>
    </el-dialog>
    <!-- end 店铺删除 -->
  </div>
</template>
<script>
import Nocontent from "@/components/Nocontent";
import { bindShop, getShopList, installApp, delStore } from "./api/stores";
export default {
  data() {
    return {
      showDelProp: false, //显示删除弹层
      curSel: {},
      loadingDel: false,
      installing: false,
      laoding: true,
      loadingBtn: false,
      showAdd: false, //显示绑定店铺弹层
      loading: true,
      shopList: [],
      bindForm: {
        name: ""
      },
      keyword: "", //搜索关键词
      searchKeyWrod: "", //执行搜索关键词
      loadingTable: false
    };
  },
  methods: {
    async delStore() {
      this.loadingDel = true;
      let res = await delStore({ shop: this.curSel.domain });
      if (res.code == 0) {
        this.$message.success("删除成功");
        this.showDelProp = false;
        this.getShopList();
      }
      this.loadingDel = false;
    },
    async installApp(domain) {
      this.installing = true;
      let application_id = this.$route.query.id;
      let params = { domain, application_id };
      let res = await installApp(params);
      if (res.code == 0) {
        // console.log(res);
        res.data.url && window.open(res.data.url, "_blank");
      }
      this.installing = false;
    },
    searchLoading() {
      if (this.loadingTable) return;
      this.keyword = this.searchKeyWrod;
      this.loadingTable = true;
      let _this = this;
      setTimeout(() => {
        _this.loadingTable = false;
      }, 400);
    },
    changeSearch() {
      if (!this.searchKeyWrod.trim()) {
        this.keyword = "";
      }
    },
    filterData() {
      let keyword = this.keyword;
      let shopList = this.shopList;
      let res = keyword
        ? shopList.filter((v, k) => {
            return v.domain.indexOf(keyword) >= 0;
          })
        : shopList;
      return res;
    },
    subBind() {
      if (this.loadingBtn) return;
      this.loadingBtn = true;
      this.$refs["bindForm"].validate(valid => {
        if (valid) {
          this.bindShop();
        } else {
          this.loadingBtn = false;
        }
      });
    },
    async bindShop() {
      let res = await bindShop(this.bindForm);
      if (res.code == 0) {
        this.$message.success(res.msg);
        this.resetFields();
        this.$nextTick(() => {
          this.showAdd = false;
          this.getShopList();
        });
      }
      this.loadingBtn = false;
    },
    async getShopList() {
      this.loading = true;
      let res = await getShopList();
      if (res.code == 0) {
        // console.log(JSON.stringify(res));
        this.shopList = res.data || [];
        this.loading = false;
      }
      this.loading = false;
    },
    resetFields() {
      this.$refs["bindForm"].resetFields();
      this.$refs["bindForm"].clearValidate();
      this.showAdd = false;
    }
  },
  mounted() {
    let name = this.$route.query.name;
    let id = this.$route.query.id;
    if (!name || !id) {
      this.$message.error("选择店铺错误");
      this.$router.push({ name: "apps" });
      return;
    }
    this.getShopList();
  },
  components: {
    Nocontent
  }
};
</script>
<style lang="less" scoped>
.stores-list {
  /deep/.el-table {
    tr {
      border-radius: 4px 4px 2px 2px;
      th {
        background: #f5f6f9;
        padding: 10px 0;
        &:nth-child(2) {
          .cell {
            text-align: right;
          }
        }
      }
      td {
        &:last-child {
          .cell {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>