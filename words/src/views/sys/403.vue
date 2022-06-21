<template>
  <div class="container no-access-container">
    <div class="content">
      <div class="no-access-pic">
        <img
          src="~@/assets/images/sys/no-access-pic.png"
          alt="无权访问"
        >
      </div>
      <div class="no-access-title">无权限访问该页面！</div>
      <!-- <div class="no-access-subtitle">{{$t('alipay.noAccess2')}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.no-access-container {
  .content {
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 0;
    box-sizing: border-box;
    .no-access-title {
      font-size: 24px;
      font-weight: 400;
      color: #1a1d2d;
      line-height: 40px;
      margin-top: 20px;
    }
    .no-access-subtitle {
      font-weight: 400;
      color: #5e7185;
      line-height: 20px;
      margin-top: 10px;
    }
  }
}
</style>