import registerForm from "../components/RegisterForm";
import loginForm from "../components/LoginForm";
import registerSuccess from "../components/RegisterSuccess";
import changePassword from "../components/ChangePassword";
import resetPassword from "../components/ResetPassword";
import createCompany from "../components/CreateCompany";
import headerInfo from "../components/HeaderInfo";
import goCompaynAndShop from "../components/GoCompaynAndShop";
import joinCompany from "../components/JoinCompany";
import Deregistration from "../components/Deregistration";
import joinShop from "../components/JoinShop";
import {
  urlToJsonFn
} from "@/util/common";
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      ismobile: false,
      withLogin: false,
      showReg: false,
      showCreateCompany: false,
      showChangePassword: false,
      showRegister: false,
      showLogin: false,
      showGoCompaynAndShop: false,
      showRegSuccess: false,
      successObject: {},
      showJoinCompany: false,
      showJoinShop: false,
      company_list: [],
      shop_list: [],
      joinObj: {},
      inited: false,
      account_id: "",
      is_after_login: false,
    };
  },
  methods: {
    startShopy() {
      if (this.$store.state.accountInfo.email) { //已登录
        this.showShopAndComList();
      } else {
        this.showRegister = true;
      }
    },
    async shoSuccess(obj) {
      let res = await this.getAccountInfo();
      if (res.code == 0) {
        this.showReg = true;
        this.showGoCompaynAndShop = true;
      }
    },
    closeSuccAndShowLogin() {
      this.showRegSuccess = false;
      // this.$store.state.showsLogin = true;
    },
    closeJoin() {
      this.showJoinCompany = false;
    },
    closeJoinShop() {
      this.showJoinShop = false;
    },
    closeLoginAndGetInfo() {
      this.$store.state.showsLogin = false;
      this.$store.state.accountInfo.email && this.showShopAndComList(); //登录完毕，弹出进入的列表选择
    },
    clearInfo() {
      this.$store.state.accountInfo = {};
    },
    showShopAndComList() {
      if (!this.company_list.length && !this.shop_list.length) {
        //没有店铺、没有企业
        this.showCreateCompany = true;
      } else {
        this.showGoCompaynAndShop = true;
        this.$refs.goCompaynAndShop.setTitle({
          title: "登陆账号"
        });
      }
    },
    /**
     * 
     * @param {*} first_join 用于校验组件第一次加载
     * @param {*} withLogin 用于校验伴随登录
     * @returns 
     */
    async getAccountInfo(first_join, withLogin) {
      this.withLogin = withLogin;
      let res = await this.$http.get("account/info", {
        $hideMsg: true
      });
      return new Promise((resolve, reject) => {
        if (res instanceof Error) {
          this.inited = true;
        } else {
          this.initInfo(res);
        }
        first_join &&
          this.getParams({
            account_email: this.$store.state.accountInfo.email,
            account_id: this.account_id,
          });
        resolve(res);
      });
    },
    initInfo(res) {
      let params = urlToJsonFn();
      let ke = params["ke"];
      if (res.code == 0) {
        this.$store.state.accountInfo = res.data;
        this.company_list = res.data.company_list;
        this.shop_list = res.data.shop_list;
        this.inited = true;
        this.account_id = res.data.account_id;
        this.withLogin && this.initToken();
        if (ke && ke == "changepwd") { //修改密码
          this.$set(this.$store.state, "showChangePwd", true);
        }
        if (ke && ke == "deregistration") { //注销账号
          this.$set(this.$store.state, "showDeregistration", true);
        }
      }
    },
    async initToken() {
      let config = {};
      if (process.env.NODE_ENV == "development") {
        config.baseURL = "/api";
      } else {
        config.baseURL = process.env.VUE_APP_SHOP_API_URL;
      }
      let res = await this.$http.get(
        "pw/seller/batch-login", {
          token: this.$store.state.accountInfo.token,
          $hideMsg: true
        },
        config
      );
    },
    getParams(islogin) {
      let params = urlToJsonFn();
      let ke = params["ke"];
      if (ke && ke == "ShopAccountInvitationNotify") {
        this.$refs.joinShop.getParams(islogin);
        //店铺邀请
        this.showJoinShop = true;
      } else if (ke && ke == "CompanyStaffInvitationNotify") {
        //企业邀请
        this.$refs.joinCompany.getParams(islogin);
        this.showJoinCompany = true;
      } else if (ke && ke == "showreset") {
        //忘记密码
        this.$set(this.$store.state, "showResetPwd", true);
      } else if (ke && ke == "AccountEnabledNotify") {
        if (!this.$store.state.accountInfo.email) {
          this.$store.state.showsLogin = true;
        } else { //如果已经登录
          let url = window.location.origin + window.location.pathname;
          window.history.replaceState({}, 0, url);
          this.showShopAndComList();
        }
      }
    },
    confirmDeregistration() {
      this.$confirm("", "注销账号", {
          lockScroll: false,
          distinguishCancelAndClose: false,
          confirmButtonText: "注销",
          cancelButtonText: "取消",
          closeOnClickModal: false,
          confirmButtonClass: "el-button el-button--danger",
          message: this.$createElement("div", null, [
            this.$createElement("p", null, [
              "你的账号即将被注销，账号注销后，将放弃所有资产和权益，且无法恢复，请慎重操作。"
            ]),
            this.$createElement("p", {
              style: {
                height: "22px"
              }
            }, [
              ""
            ]),
            this.$createElement("p", null, [
              "注：帐号注销不代表注销前的帐号行为和相关责任得到豁免或减轻。"
            ])
          ]),
        })
        .then(() => {
          this.destroyAccount();
        })
        .catch((action) => {
          this.replaceClose();
          this.$store.state.showDeregistration = false;
        });
    },
    replaceClose() {
      let url = window.location.origin + window.location.pathname;
      window.history.replaceState({}, 0, url);
    },
    async destroyAccount() {
      let res = await this.$http.post("account/destroy", {});
      if (res.code == 0) {
        this.loginOutShop();
        localStorage.clear();
        this.clearInfo();
        this.$message.success("注销成功");
        this.replaceClose();
        this.$store.state.showDeregistration = false;
      }
    },
    loginOutShop() {
      let config = {};
      if (process.env.NODE_ENV == "development") {
        config.baseURL = "/api";
      } else {
        config.baseURL = process.env.VUE_APP_SHOP_API_URL;
      }
      this.$http.post(
        "pw/seller/login-out", {
          $hideMsg: true,
        },
        config
      );
    }
  },
  mounted() {
    let sUserAgent = navigator.userAgent;
    this.ismobile = sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1;
    this.getAccountInfo(true);
    // this.getParams();
    // this.showCreateCompany = true;
  },
  computed: {
    showVideo() {
      return this.ismobile && (this.showCreateCompany || this.showChangePassword || this.showGoCompaynAndShop || this.showRegister || this.showLogin || this.showRegSuccess || this.showJoinCompany || this.showJoinShop);
    }
  },
  watch: {
/*     "$store.state.showDeregistration": {
      //自己呼叫别人
      deep: true, //深度监听
      handler(newVal) {
        if (this.$store.state.showDeregistration) {
          this.confirmDeregistration();
        }
      },
    }, */
    "$store.state.showChangePwd": {
      //自己呼叫别人
      deep: true, //深度监听
      handler(newVal) {
        this.showChangePassword = this.$store.state.showChangePwd;
      },
    },
    "$store.state.showsLogin": {
      //自己呼叫别人
      deep: true, //深度监听
      handler(newVal) {
        this.showLogin = this.$store.state.showsLogin;
      },
    },
  },
  components: {
    registerForm,
    loginForm,
    registerSuccess,
    resetPassword,
    changePassword,
    headerInfo,
    createCompany,
    goCompaynAndShop,
    joinCompany,
    Deregistration,
    joinShop,
  },
}