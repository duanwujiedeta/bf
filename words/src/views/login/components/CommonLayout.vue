<template>
  <div class="common-container">
    <LeftTopLogo />
    <div class="common">
      <PartnerLogo />
      <slot></slot>
    </div>
  </div>
</template>
<script>
import PartnerLogo from "./PartnerLogo";
import LeftTopLogo from "./LeftTopLogo";
import { getUserMsg } from "./api/register";
import { mapGetters, mapMutations } from "vuex";
export default {
  mounted() {
    this.validateLogin();
  },
  methods: {
    async validateLogin() {
      let res = await getUserMsg({ $hideMsg: true });
      if (res.code == 0) {
        this.$router.push({ name: "apps" });
      }
    },
    ...mapMutations({
      set_userInfo: "SET_USERINFO",
      set_login: "SET_LOGIN"
    })
  },
  /* watch: {
    login(newVal) {
      if (newVal) {
        this.$router.replace({ name: "apps" });
      }
    }
  }, */
  computed: {
    ...mapGetters(["userInfo", "login"])
  },
  components: {
    PartnerLogo,
    LeftTopLogo
  }
};
</script>
<style lang="less" scoped>
.common-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .common {
    width: 940px;
    height: 542px;
    display: flex;
    flex-direction: row;
  }
  /deep/.el-input__inner {
    border: none;
    padding-left: 0px;
    border-bottom: 1px solid #cccccc;
    border-radius: 0px;
  }
  /deep/.el-form-item.is-error .el-input__inner {
    border-color: #f56c6c;
  }
}
</style>