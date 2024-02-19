<template>
  <div id="app">
    <!-- 头部---start -->
    <header>
      <div class="wrapper">
        <div class="logo pull-left">
          <a href="index.html"></a>
        </div>
        <div class="nav pull-left">
          <a href="index.html">首页</a>
          <a href="index.html#websiteAdvantage">解决方案</a>
          <a href="index.html#successCae">成功案例</a>
          <a href="pricing.html">定价</a>
          <a href="aboutus.html" class="active">关于我们</a>
        </div>
        <div class="loginRes pull-right">
          <headerInfo
            :isblack="true"
            :clearInfo="clearInfo"
            :userObject="$store.state.accountInfo"
            :showShopAndComList="showShopAndComList"
            v-if="$store.state.accountInfo.email && inited"
          ></headerInfo>
          <a
            v-if="!$store.state.accountInfo.email && inited"
            href="javascript:void(0);"
            class="login"
            @click="
              () => {
                $store.state.showsLogin = true;
              }
            "
            >登录</a
          >
          <a
            v-if="!$store.state.accountInfo.email && inited"
            href="javascript:void(0);"
            class="register"
            @click="
              () => {
                showRegister = true;
              }
            "
            >注册</a
          >
        </div>
      </div>
    </header>
    <!-- 头部---end -->

    <!-- 帮助中心---start -->
    <div class="help-center">
      <div class="wrapper">
        <p class="title">帮助中心</p>
        <div class="center-item">
          <div class="item-img">
            <span onclick="toggleClass(this)"></span>
            <p>如何7天免费试用？</p>
          </div>
          <div class="item-text">
            注册成功后会有客户经理与您取得联系，评估企业资质后可取得7天免费试用。
          </div>
        </div>
        <div class="center-item">
          <div class="item-img">
            <span onclick="toggleClass(this)"></span>
            <p>注册需要审核吗？</p>
          </div>
          <div class="item-text">
            为了给用户提供干净的平台，注册时需要用户提交相关资料后，在2个工作日内完成审核，审核结果将通过邮箱发送给您。
          </div>
        </div>
        <div class="center-item">
          <div class="item-img">
            <span onclick="toggleClass(this)"></span>
            <p>是否可以绑定自己域名？</p>
          </div>
          <div class="item-text">可以的。</div>
        </div>
        <div class="center-item">
          <div class="item-img">
            <span onclick="toggleClass(this)"></span>
            <p>一个帐号下可以有多个站点吗？</p>
          </div>
          <div class="item-text">可以的。</div>
        </div>
        <div class="center-item">
          <div class="item-img">
            <span onclick="toggleClass(this)"></span>
            <p>我需要购买服务器吗？</p>
          </div>
          <div class="item-text">不需要，我们使用SaaS模式，开通即可使用。</div>
        </div>
        <div class="center-item">
          <div class="item-img">
            <span onclick="toggleClass(this)"></span>
            <p>模板需要另外收费吗？</p>
          </div>
          <div class="item-text">
            不需要，但模版有版本区分，版本越高可选择的模版越多。
          </div>
        </div>
        <div class="center-item">
          <div class="item-img">
            <span onclick="toggleClass(this)"></span>
            <p>到期后没续费资料怎么办？</p>
          </div>
          <div class="item-text">
            到期后站点内的资料会保持在服务器上1个月，超过1个月将自动清空。
          </div>
        </div>
      </div>
    </div>

    <!-- 帮助中心---end -->

    <!-- 底部---start -->
    <footer>
      <div class="wrapper">
        <div class="href-adress">
          <table>
            <thead>
              <tr>
                <th>关于我们</th>
                <th>服务与支持</th>
                <th>协议</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="aboutus.html">公司介绍</a>
                </td>
                <td>
                  <a href="helpCenter.html">帮助中心</a>
                </td>
                <td>
                  <a href="userAgreement.html">使用协议</a>
                  <!-- <a href="javascript:void(0);">使用协议</a> -->
                </td>
              </tr>
              <tr>
                <td>
                  <a href="aboutus.html">联系我们</a>
                </td>
                <td>
                  <a href="javascript:void(0);"></a>
                </td>
                <td>
                  <a href="privacyPolicy.html">隐私政策</a>
                  <!-- <a href="javascript:void(0);">隐私政策</a> -->
                </td>
              </tr>
              <tr>
                <td>
                  <a href="javascript:void(0);"></a>
                </td>
                <td>
                  <a href="javascript:void(0);"></a>
                </td>
                <td>
                  <a href="termService.html">服务条款</a>
                  <!-- <a href="javascript:void(0);">服务条款</a> -->
                </td>
              </tr>
              <tr>
                <td>
                  <a href="javascript:void(0);"></a>
                </td>
                <td>
                  <a href="javascript:void(0);"></a>
                </td>
                <td>
                  <a href="convention.html">用户自律公约</a>
                  <!-- <a href="javascript:void(0);">服务条款</a> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </footer>
    <!-- 底部---end -->

    <!-- 右侧浮窗---start -->
    <div class="right-consult">
      <p class="onlineConsult">在线咨询</p>
      <div class="container-wx">
        <div class="wx">
          <!---  <a href="tencent://message/?uin=308325689&Site=admin5.com&Menu=yes">
            <img src="./images/QQ.png" alt="" />QQ咨询
          </a> --->
          <img style="width:130px" src="./images/wxqrcode-new.jpg" alt="" />
          <p>微信扫一扫</p>
        </div>
      </div>
    </div>

    <div class="floatAlert">
      <div id="top_btn">
        <img src="./images/got.png" alt="" />
      </div>
    </div>
    <!-- 右侧浮窗---end -->
    
    <!-- 备案 -->
    <div style="color: #999;text-align: center;padding-bottom: 50px;">Copyright {{ year }}  All Rights Reserved <a class="ba-word" href="https://beian.miit.gov.cn/" target="_blank">粤ICP备19032438号-7</a></div>
    <!-- 备案 -->

    <!-- start 登录注册等弹窗 -->
    <registerForm
      :showRegister="showRegister"
      @close="showRegister = false"
      @shoSuccess="shoSuccess"
    ></registerForm>
    <registerSuccess
      :showRegSuccess="showRegSuccess"
      :successObject="$store.state.accountInfo"
      @showLogin="$store.state.showsLogin = true"
      @closeSuccAndShowLogin="closeSuccAndShowLogin"
    ></registerSuccess>
    <loginForm
      :showLogin="showLogin"
      :getAccountInfo="getAccountInfo"
      @close="closeLoginAndGetInfo"
      @showRegister="showRegister = true"
      @showChangePassword="showChangePassword = true"
    ></loginForm>
    <changePassword
      :showChangePassword="showChangePassword"
      @close="showChangePassword = false"
    ></changePassword>
    <!-- 重置密码 -->
    <resetPassword></resetPassword>
    <!-- start 创建企业 -->
    <createCompany
      :showCreateCompany="showCreateCompany"
      :accountInfo="$store.state.accountInfo"
      :getAccountInfo="getAccountInfo"
      :showShopAndComList="showShopAndComList"
      @close="showCreateCompany = false"
    ></createCompany>
    <!-- start 创建企业 -->
    <joinCompany
      :showJoinCompany="showJoinCompany"
      @close="closeJoin"
      ref="joinCompany"
    ></joinCompany>
    <!-- 注销账号 -->
    <Deregistration></Deregistration>
    <!-- start 加入店铺 -->
    <joinShop
      :showJoinShop="showJoinShop"
      @close="closeJoinShop"
      ref="joinShop"
    ></joinShop>
    <!-- end 加入店铺 -->
    <!-- start 注册成功后的跳转企业和店铺的弹窗 -->
    <goCompaynAndShop
      :company_list="company_list"
      :shop_list="shop_list"
      :showReg="showReg"
      :showGoCompaynAndShop="showGoCompaynAndShop"
      @close="showGoCompaynAndShop = false;showReg=false;"
      @closeAndShowCreateCom="showGoCompaynAndShop = false;showCreateCompany=true;showReg=false;"
      ref="goCompaynAndShop"
    ></goCompaynAndShop>
    <!-- end 注册成功后的跳转企业和店铺的弹窗 -->
    <!-- end 登录注册等弹窗 -->
  </div>
</template>

<script>
import defaultObj from "@/util/defaultObj";
export default {
  ...defaultObj,
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
