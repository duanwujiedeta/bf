<template>
  <div class="header-container">
    <div class="header-btn-box">
      <div class="header-btn-box-right">
        <div class="btn-container">
          <slot></slot>
        </div>
      </div>
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
.header-container {
  display: none;
  width: calc(100% + 40px);
  margin: -20px -20px 0px -20px;
  background-color: #fff;
  box-shadow: 1px 0px 2px 0px rgba(35, 35, 112, 0.2);
  .header-btn-box {
    margin: 0 auto;
    top: 60px;
    left: 0;
    width: 1044px;
    height: 56px;
    display: flex;
    align-items: center;
    background: #fff;
    &-right {
      width: 100%;
      .btn-container {
        text-align: right;
        padding: 0 20px;
        // margin-left: 200px;
        margin: 0 auto;
      }
    }
  }
  &.scrolling {
    display: block;
    position: fixed;
    width: calc(100% - 210px);
    z-index: 1;
    right: 0px;
    .header-btn-box {
      width: 1004px;
      &-right {
        .btn-container {
          padding: 0 13px;
        }
      }
    }
  }
}
</style>