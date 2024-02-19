<template>
  <div id="app-index">
    <div class="header-session">
      <div class="header">
        <div class="logo-area">
          <span class="logo">开发者中心</span>
        </div>
        <div class="link-area">
          <a
            href="javascript:;"
            @click="$router.push({ name: 'login' })"
          >开发者后台</a>
          <a
            href="https://docs.xshoppy.com"
            target="_blank"
          >文档中心</a>
          <a
            href="https://www.xshoppy.com/"
            target="_blank"
          >XShoppy</a>
        </div>
        <div class="btn-area">
          <a
            href="javascript:;"
            @click="$router.push({ name: 'login' })"
          >登录</a>
          <a
            href="javascript:;"
            @click="$router.push({ name: 'register' })"
          >注册</a>
        </div>
      </div>
      <div class="head-content">
        <h1 class="c-title">XShoppy开发者</h1>
        <p class="c-sub-title">与XShoppy共同构建跨境新生态</p>
        <div
          class="be-developer"
          @click="$router.push({ name: 'login' })"
        >成为开发者</div>
      </div>
    </div>
    <div class="index-container">
      <div class="detail-container">
        <span class="detail-title">开发者接入流程</span>
        <div class="detail-desc">
          <div class="detail-desc-item">
            <div class="icon arrow icon-register"></div>
            <h3 class="item-title">开发者注册</h3>
            <p class="item-desc">开发者根据需要注册个人或企业开发者账户</p>
          </div>

          <div class="detail-desc-item">
            <div class="icon arrow icon-create"></div>
            <h3 class="item-title">创建应用</h3>
            <p class="item-desc">填写应用相关信息，获取对应权限，即可创建应用</p>
          </div>

          <div class="detail-desc-item">
            <div class="icon arrow icon-test"></div>
            <h3 class="item-title">应用测试</h3>
            <p class="item-desc">随时可在XShoppy开放平台调试应用与提交发布申请</p>
          </div>

          <div class="detail-desc-item">
            <div class="icon arrow icon-sub"></div>
            <h3 class="item-title">提交审核</h3>
            <p class="item-desc">XShoppy开放平台团队将对应用功能进行审核，把控应用质量</p>
          </div>

          <div class="detail-desc-item">
            <div class="icon icon-pub"></div>
            <h3 class="item-title">发布成功</h3>
            <p class="item-desc">应用发布审核通过后，将进入应用商城，助力跨境新生态</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.validateLogin();
  },
  methods: {
    async validateLogin() {
      this.removeLoading();
    },
    removeLoading() {
      if (document.getElementsByClassName("web-loading-box").length > 0) {
        document.getElementsByClassName("web-loading-box")[0].style.display =
          "none";
      }
    }
  }
};
</script>

<style lang="less">
#app-index {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  .header-session {
    display: flex;
    flex-direction: column;
    height: 560px;
    background: #2c1cb1 url(~@/assets/images/index/banner.svg) left bottom/cover
      no-repeat;
  }
  .header {
    height: 76px;
    top: 0px;
    width: 100%;
    z-index: 2;
    padding: 0 40px;
    display: flex;
    flex-direction: row;
    white-space: nowrap;
    .logo-area {
      display: flex;
      margin-right: 92px;
      align-items: center;
      .logo {
        flex-grow: 1;
        color: #ffffff;
        font-weight: 500;
        font-size: 16px;
        padding-left: 135px;
        background: url(~@/assets/images/index/logo-word.png) left center/128px
          22px no-repeat;
        align-items: center;
        display: flex;
      }
    }
    .link-area {
      display: flex;
      a {
        align-items: center;
        display: flex;
        flex-grow: 1;
        color: #ffffff;
        font-size: 14px;
        line-height: 20px;
        &:first-child,
        &:nth-child(2) {
          margin-right: 45px;
        }
      }
    }
    .btn-area {
      display: flex;
      flex-grow: 1;
      flex-direction: row-reverse;
      align-items: center;
      a {
        align-items: center;
        display: flex;
        float: right;
        text-align: center;
        width: 72px;
        height: 36px;
        border: 1px solid #ffffff;
        font-size: 16px;
        justify-content: center;
        border-radius: 4px;
        &:first-child {
          border: 1px solid #ffffff;
          background-color: #fff;
          color: #2c1cb1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &:last-child {
          color: #ffffff;
          margin-right: 20px;
        }
      }
    }
  }
  .head-content {
    height: 484px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .c-title {
      font-size: 56px;
      line-height: 78px;
      font-weight: 600;
      color: #ffffff;
      white-space: nowrap;
    }
    .c-sub-title {
      font-size: 20px;
      line-height: 28px;
      color: #ffffff;
      white-space: nowrap;
    }
    .be-developer {
      background-color: #ec5b44;
      color: #ffffff;
      border-radius: 6px;
      width: 150px;
      height: 50px;
      margin-top: 40px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
  .index-container {
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    .detail-container {
      width: 1280px;
      border-radius: 21px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .detail-title {
        font-weight: 500;
        color: #000000;
        font-size: 24px;
        line-height: 34px;
        margin-top: 80px;
        position: relative;
        &::before {
          content: "";
          display: inline-block;
          width: 20px;
          height: 18px;
          position: absolute;
          background: url(~@/assets/images/index/float-left-cion.svg) center
            center/100% 100% no-repeat;
          left: -30px;
          top: 9px;
        }
        &::after {
          content: "";
          display: inline-block;
          width: 20px;
          height: 18px;
          position: absolute;
          background: url(~@/assets/images/index/float-right-icon.svg) center
            center/100% 100% no-repeat;
          top: 9px;
          right: -30px;
        }
      }
      .detail-desc {
        display: flex;
        flex-direction: row;
        margin-top: 60px;
        margin-bottom: 155px;
        width: 100%;
        .detail-desc-item {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          color: #142162;
          align-items: center;
          text-align: center;
          margin-right: 70px;
          max-width: 200px;
          &:last-child {
            margin-right: 0px;
          }
          .icon {
            width: 100px;
            height: 100px;
            border: 2px solid #e7eff8;
            border-radius: 50%;
            position: relative;
            &.arrow {
              &::after {
                content: "";
                display: inline-block;
                width: 120px;
                height: 15px;
                position: absolute;
                background: url(~@/assets/images/index/arrow.svg) center
                  center/100% 100% no-repeat;
                right: -143px;
                top: 50%;
                transform: translateY(-50%);
              }
            }
            &.icon-register {
              background: #f8f9fa url(~@/assets/images/index/icon-register.svg)
                center center/46px 46px no-repeat;
            }
            &.icon-create {
              background: #f8f9fa url(~@/assets/images/index/icon-create.svg)
                center center/52px 52px no-repeat;
            }
            &.icon-test {
              background: #f8f9fa url(~@/assets/images/index/icon-test.svg)
                center center/52px 52px no-repeat;
            }
            &.icon-sub {
              background: #f8f9fa url(~@/assets/images/index/icon-sub.svg)
                center center/52px 52px no-repeat;
            }
            &.icon-pub {
              background: #f8f9fa url(~@/assets/images/index/icon-pub.svg)
                center center/52px 52px no-repeat;
            }
          }
          .item-title {
            margin-top: 20px;
            font-size: 16px;
            line-height: 22px;
            font-weight: 500;
            color: #1f2329;
          }
          .item-desc {
            margin-top: 10px;
            font-size: 14px;
            text-align: center;
            line-height: 20px;
            color: #828282;
          }
        }
      }
    }
  }
}
</style>
