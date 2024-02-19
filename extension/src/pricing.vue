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
          <a href="pricing.html" class="active">定价</a>
          <a href="aboutus.html">关于我们</a>
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

    <!-- 定价内容---start -->
    <div class="pricing-Container">
      <div class="wrapper">
        <div class="two-scheme">
          <div>
            <p class="name">基础版</p>
            <p style="margin-top: 20px; padding: 0 30px; line-height: 1.5">
              适合新手入门卖家，功能齐全，方便新手练习上手
            </p>
            <p class="price"><span>$29</span>/月</p>
            <button onclick="loginClick()">立即购买</button>
            <ul>
              <li>平台交易佣金 <span>1.5%</span></li>
              <li>员工帐号 <span>5个</span></li>
              <li>含全部功能</li>
            </ul>
          </div>
          <div>
            <p class="name">进阶版</p>
            <p style="margin-top: 20px; padding: 0 30px; line-height: 1.5">
              适合初具团队规模的卖家，功能更加全面，可以完全满足使用
            </p>
            <p class="price"><span>$59</span>/月</p>
            <button onclick="loginClick()">立即购买</button>
            <ul>
              <li>平台交易佣金 <span>0.7%</span></li>
              <li>员工帐号 <span>10个</span></li>
              <li>含全部功能</li>
            </ul>
          </div>
          <div class="active">
            <p class="name">旗舰版</p>
            <p style="margin-top: 20px; padding: 0 30px; line-height: 1.5">
              适合企业卖家，功能更加全面，企业品牌出海首选
            </p>
            <p class="price"><span>$99</span>/月</p>
            <button onclick="loginClick()">立即购买</button>
            <ul>
              <li>平台交易佣金 <span>0.5%</span></li>
              <li>员工帐号 <span>25个</span></li>
              <li>含全部功能</li>
            </ul>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th width="200" height="94"></th>
              <th width="300">
                <p class="price">
                  基础版<span><b>$29</b>/月</span>
                </p>
              </th>
              <th width="300">
                <p class="price">
                  进阶版<span><b>$59</b>/月</span>
                </p>
              </th>
              <th width="300">
                <p class="price active">
                  旗舰版<span><b>$99</b><i>/月</i></span>
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr>
                        <td>基础功能</td>
                        <td>
                            <p class="disabled">交易佣金</p>
                            <p class="disabled">赠送国家域名</p>
                            <p>独立域名绑定</p>
                            <p><span>普通</span>网络安全防御</p>
                            <p class="disabled">HTTPS安全证书</p>
                            <p><span>500MB</span>储存空间</p>
                            <p><span>在线客服</span></p>
                            <p>CDN全球加速</p>
                            <p>响应式布局方式</p>
                            <p><span>10</span>个域名数量</p>
                            <p>不限制商品数量</p>
                        </td>
                        <td>
                            <p>交易佣金0.7%</p>
                            <p>赠送国家域名</p>
                            <p>独立域名绑定</p>
                            <p><span>全方位</span>网络安全防御</p>
                            <p>HTTPS安全证书</p>
                            <p><span>不限制</span>储存空间</p>
                            <p><span>邮件/QQ/电话/微信</span></p>
                            <p>CDN全球加速</p>
                            <p>响应式布局方式</p>
                            <p><span>不限制</span>域名数量</p>
                            <p>不限制商品数量</p>
                        </td>
                    </tr>
                    <tr>
                        <td>促销</td>
                        <td>
                            <p>节日营销</p>
                            <p>商品评论</p>
                            <p>运费险</p>
                            <p>优惠活动</p>
                            <p>推荐商品</p>
                            <p>梯度优惠</p>
                            <p>激励分享</p>
                        </td>
                        <td>
                            <p>节日营销</p>
                            <p>商品评论</p>
                            <p>运费险</p>
                            <p>优惠活动</p>
                            <p>推荐商品</p>
                            <p>梯度优惠</p>
                            <p>激励分享</p>
                        </td>
                    </tr>
                    <tr>
                        <td>效率提升</td>
                        <td>
                            <p>ERP</p>
                            <p>API接入</p>
                            <p>谷歌FEED同步</p>
                            <p>复制商店</p>
                        </td>
                        <td>
                            <p>ERP</p>
                            <p>API接入</p>
                            <p>谷歌FEED同步</p>
                            <p>复制商店</p>
                        </td>
                    </tr>
                    <tr>
                        <td>网站</td>
                        <td>
                            <p>主题模板</p>
                            <p>应用中心</p>
                            <p>装修店铺</p>
                            <p>开发模板</p>
                        </td>
                        <td>
                            <p>主题模板</p>
                            <p>应用中心</p>
                            <p>装修店铺</p>
                            <p>开发模板</p>
                        </td>
                    </tr>
                    <tr>
                        <td>广告营销</td>
                        <td>
                            <p>Facebook开户</p>
                            <p>Google开户</p>
                            <p>SEO</p>
                            <p>数据分析</p>
                        </td>
                        <td>
                            <p>Facebook开户</p>
                            <p>Google开户</p>
                            <p>SEO</p>
                            <p>数据分析</p>
                        </td>
                    </tr> -->

            <tr>
              <td colspan="4" style="text-align: left; color: #49cbe9">
                <b>基础功能</b>
              </td>
            </tr>
            <tr>
              <td>平台交易佣金</td>
              <td>1.5%</td>
              <td>0.7%</td>
              <td>0.5%</td>
            </tr>
            <tr>
              <td>员工帐号</td>
              <td>10</td>
              <td>15</td>
              <td>25</td>
            </tr>
            <tr>
              <td>独立域名绑定</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>网络安全防御</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>HTTPS安全证书</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>储存空间</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>CDN全球加速</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>响应式布局方式</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <!-- <tr>
                        <td>域名数量</td>
                        <td><img src="./images/yes.jpg" alt=""></td>
                        <td><img src="./images/yes.jpg" alt=""></td>
                        <td><img src="./images/yes.jpg" alt=""></td>
                    </tr> -->
            <tr>
              <td>不限制商品数量</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: left; color: #49cbe9">
                <b>促销</b>
              </td>
            </tr>
            <tr>
              <td>节日营销</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>商品评论</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>运费险</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>优惠活动</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>推荐商品</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>梯度优惠</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>激励分享</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: left; color: #49cbe9">
                <b>效率提升</b>
              </td>
            </tr>
            <tr>
              <td>ERP</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>API接入</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>复制商店</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: left; color: #49cbe9">
                <b>网站</b>
              </td>
            </tr>
            <tr>
              <td>主题模板</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>应用中心</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>装修店铺</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: left; color: #49cbe9">
                <b>广告营销</b>
              </td>
            </tr>
            <tr>
              <td>Facebook开户</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>Google开户</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>其他媒体开户</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>SEO</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
            <tr>
              <td>数据分析</td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
              <td><img src="./images/yes.jpg" alt="" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 定价内容---end -->

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
