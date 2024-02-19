<template>
  <el-dialog :close-on-click-modal="false" width="480px" height="480px" :visible.sync="showGoCompaynAndShop"
    :before-close="handleClose" :title="title && !showReg ? title : ''" class="customer-dialog no-padding" center>
    <div class="reg-content" v-if="showReg">
      <div class="head-img">
        <button type="button" class="el-button el-button--success is-circle"
          style="width: 44px; height: 44px; margin: 0 auto; cursor: auto">
          <i class="el-icon-check" style="font-size: 20px; font-weight: 600"></i>
        </button>
      </div>
      <div class="head-word">注册成功</div>
      <p class="suc-desc">
        <span>感谢您注册， </span>我们为您创建了企业中心，您可以在企业中心管理您的店铺，或直接进入店铺。
      </p>
    </div>
    <div class="two-list" style="margin-top: 15px" :class="
      (company_list.length == 0 && shop_list.length != 0) ||
        (company_list.length != 0 && shop_list.length == 0)
        ? 'width100'
        : ''
    ">
      <el-radio-group v-model="listType" style="width: 100%">
        <el-radio-button label="1" v-if="company_list.length">企业中心</el-radio-button>
        <el-radio-button label="2" v-if="shop_list.length">店铺中心</el-radio-button>
      </el-radio-group>
    </div>
    <div class="company-list" v-if="listType == 1">
      <template v-for="(item, index) of company_list">
        <div class="company-item" :key="index">
          <div class="item-left">
            <div>
              <span :title="item.company_name || item.name" class="com-name one-line-over cut-com"
                style="margin-right: 10px">企业名称：{{ item.company_name || item.name }}</span>
              <span class="com-identity one-line-over">身份：{{ item.position }}</span>
            </div>
          </div>
          <div class="item-right">
            <el-button type="text" class="textBtn" @click="jumpUrl(item)">进入</el-button>
          </div>
        </div>
      </template>
    </div>
    <div class="company-list shop" v-if="listType == 2">
      <template v-for="(item, index) of shop_list">
        <div class="company-item" :key="index">
          <div class="item-left">
            <div>
              <span class="com-name one-line-over" style="margin-right: 10px">店铺名称：{{ item.name }}</span>
              <span class="com-identity one-line-over" v-if="item.position == '店主'">身份：{{ item.position }}</span>
            </div>
            <div class="com-domain one-line-over">
              店铺主域名：{{ item.domain }}
            </div>
            <div class="shop-com one-line-over">
              <el-tooltip placement="top-start" popper-class="tooltip-grays" :open-delay="500" :key="'com-ye'">
                <div slot="content">
                  <p style="line-height: 22px; max-width: 300px">
                    归属企业：{{ item.company_name }}
                  </p>
                </div>
                <span style="font-size: 15px;" class="over-title">
                  归属企业：{{ item.company_name }}
                </span>
              </el-tooltip>
            </div>
          </div>
          <div class="item-right">
            <el-button type="text" class="textBtn" @click="jumpUrl(item)">进入</el-button>
          </div>
        </div>
      </template>
    </div>
    <div class="create-company" v-if="company_list && !company_list.length">
      <el-button type="text" class="textBtn" @click="closeAndShowCreateCom">创建企业</el-button>
      <span>没有企业？</span>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    showReg: {
      type: Boolean,
      default: false,
    },
    showGoCompaynAndShop: {
      type: Boolean,
      default: false,
    },
    company_list: {
      type: Array,
      default: () => [],
    },
    shop_list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: "",
      listType: 1,
    };
  },
  methods: {
    jumpUrl(item) {
      let url = process.env.VUE_APP_QIYE_HOST_URL;
      if (this.listType == 1) {
        //去企业
        url =
          url + "?company_id=" + item.id + "&company_name=" + item.company_name;
      } else {
        //去店铺后台
        url = "https://" + item.name + "." + process.env.VUE_APP_SHOP_HOST_URL;
      }
      window.location.replace(url);
    },
    setTitle({ title }) {
      this.title = title;
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
    closeAndShowRegister() {
      this.$emit("close");
    },
    closeAndShowCreateCom() {
      this.$emit("closeAndShowCreateCom");
    },
  },
  watch: {
    company_list: {
      handler(editForm, oldName) {
        if (this.company_list.length && !this.shop_list.length) {
          this.listType = 1;
        }
      },
      deep: true,
    },
    shop_list: {
      handler(editForm, oldName) {
        if (this.shop_list.length && !this.company_list.length) {
          this.listType = 2;
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
.customer-dialog {
  border-radius: 6px;

  .reg-content {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    text-align: center;

    .head-img {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .head-word {
      text-align: center;
      margin: 26px 0px 39px 0px;
      font-weight: 300;
      color: #171619;
      font-size: 24px;
    }

    .suc-desc {
      // max-width: 287px;
      font-size: 20px;
      margin: 0 auto;
      text-align: left;
      margin-bottom: 20px;

      span {
        font-weight: bold;
        color: #434343;
        font-size: 20px;
      }
    }

    .login-qiye {
      margin-bottom: 28px;
      height: 48px;
    }

    .shop-address {
      color: #b3b1b1;
      font-size: 14px;
    }

    .shop-name {
      color: #187cd6;
      font-size: 14px;
      margin-bottom: 33px;
    }
  }
}

/deep/.el-radio-button__orig-radio:checked+.el-radio-button__inner {
  background-color: #187cd6;
  border-color: #187cd6;
  width: 100%;
}

.two-list .el-radio-button {
  width: 50%;
}

.two-list.width100 .el-radio-button {
  width: 100%;
}

/deep/.two-list .el-radio-button__inner {
  width: 100%;
}

.two-list .el-radio-button__orig-radio:checked+.el-radio-button__inner {
  background-color: #187cd6;
  border-color: #187cd6;
}

/deep/.el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
  box-shadow: 0 0 2px 2px #187cd6;
}

/deep/.el-radio-button__orig-radio:checked+.el-radio-button__inner {
  box-shadow: -1px 0 0 0 #187cd6;
}

.company-list {
  margin-top: 20px;
  max-height: 195px;
  overflow-y: auto;
  margin-bottom: 20px;

  &.shop {
    .company-item {
      height: 75px;
    }
  }

  .company-item {
    flex-grow: 1;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    border: 1px solid rgba(220, 223, 230, 1);
    align-items: center;
    box-sizing: border-box;
    height: 50px;
    background: #fbfbfd;
    border: 1px solid #dfe1ec;
    border-radius: 4px;
    padding: 0 10px;

    .item-left {
      color: #606266;
      display: flex;
      flex-direction: column;
      flex: 1;
      height: 60px;
      justify-content: center;
      max-width: 368px;

      .com-name {
        font-size: 16px;
      }

      .com-domain {
        font-size: 16px;
        width: 340px;
      }

      .shop-com {
        font-size: 16px;
      }

      .com-identity {
        font-size: 12px;
      }
    }

    .item-right {
      display: flex;
      margin-left: 10px;
      min-width: 30px;
      height: 60px;
      justify-content: center;
    }
  }
}

.create-company {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}

.com-name.one-line-over.cut-com {
  max-width: 355px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.over-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  width: 100%;
}
</style>
