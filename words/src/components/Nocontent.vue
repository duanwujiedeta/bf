<template>
  <div class="no-content">
    <div class="no-stores-icon"></div>
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.no-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 28px 0 32px;
  .no-stores-icon {
    width: 166px;
    height: 86px;
    background: transparent url(~@/assets/images/no-stores.png) center
      center/100% 100% no-repeat;
  }
}
</style>
