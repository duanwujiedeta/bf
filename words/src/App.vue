<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getRedirectRouteName } from "@/util/routeRedirect";
export default {
  created() {
    // this.validateLogin();
    // console.log(process.env.NODE_ENV);
    // console.log(111);
  },
  mounted() {
    /* let test = this.$http.get("/test.json");
    test.then(res => {
      console.log(res);
    }); */
  },
  methods: {
    async validateLogin() {
      let res = await this.$http.get(`/user`, { $hideMsg: true });
      if (res.code == 0) {
        this.set_userInfo(res.data);
        this.set_login(true);
      } else {
        this.set_userInfo({ name: "expired" });
        let routeName = getRedirectRouteName(this.$route);
        this.$router.replace(
          {
            name: routeName,
            params: { ...this.$route.params },
            query: {
              ...this.$route.query
            }
          },
          onComplete => {},
          onAbort => {}
        );
      }
      this.removeLoading();
    },
    removeLoading() {
      if (document.getElementsByClassName("web-loading-box").length > 0) {
        document.getElementsByClassName("web-loading-box")[0].style.display =
          "none";
      }
    },
    ...mapMutations({
      set_userInfo: "SET_USERINFO",
      set_login: "SET_LOGIN"
    })
  }
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  background-color: #f5f6f9;
}
</style>
