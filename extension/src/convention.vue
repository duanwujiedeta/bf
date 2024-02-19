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

    <!-- 公司信息---start -->
    <div class="Info">
      <div class="wrap">
        <h6 id="aboutUs" style="margin-top: 50px; text-align: center">
          用户自律公约
        </h6>
        <p>
          致力于弘扬社会主义核心价值观，传播正能量，宣扬中华民族传统文化和美德，宣传积极向上的时代风尚和生活方式。这一目标的实现，离不开平台和用户共同努力，维护有利于平台健康和谐发展的网络环境，营造风清气正的网络生态。为此特制定《用户自律公约》（以下简称“本公约”），由和所有用户共同遵守。用户发布和传播内容时，应当符合本公约的规范。
        </p>
        <h5>一、弘扬正确价值观</h5>
        <p>1.1 本公约倡导全体用户在平台上的行为和发布的内容符合下列价值观：</p>
        <p>（1） 坚定对习近平新时代中国特色社会主义和中国梦的理想信念；</p>
        <p>（2） 遵守宪法和法律法规；</p>
        <p>（3） 践行社会主义核心价值观；</p>
        <p>（4） 弘扬爱国主义、集体主义和社会主义；</p>
        <p>（5） 传播正确的历史观、民族观、国家观和文化观；</p>
        <p>（6） 弘扬中华民族优秀传统文化；</p>
        <p>（7） 弘扬社会公德、职业道德、家庭和个人美德，尊重公序良俗；</p>
        <p>（8） 弘扬科学精神、普及科学知识；</p>
        <p>（9） 提倡积极健康向上的时代风尚和生活方式。</p>
        <h5>二、用户行为准则</h5>
        <p>
          2.1
          平台提倡所有用户在平台内遵守共同的行为准则，以成熟负责任的态度发布内容和信息，以积极向上的心态共同守望相助，共同维护良好的社区氛围。
        </p>
        <p>2.2 平台禁止发布和传播下列内容：</p>
        <p>（1） 反对宪法所确定的基本原则的；</p>
        <p>（2） 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>
        <p>（3） 损害国家荣誉和利益的；</p>
        <p>
          （4）
          歪曲、丑化、亵渎、否定英雄烈士事迹和精神，以侮辱、诽谤或者其他方式侵害英雄烈士的姓名、肖像、名誉、荣誉的；
        </p>
        <p>（5） 宣扬恐怖主义、极端主义的；</p>
        <p>（6） 煽动民族仇恨、民族歧视，破坏民族团结的；</p>
        <p>（7） 破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
        <p>（8） 散布谣言，扰乱社会秩序、破坏社会稳定的；</p>
        <p>（9） 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
        <p>（10） 侮辱或者诽谤他人，侵害他人名誉、隐私和其他合法权益的；</p>
        <p>（11） 使用夸张标题，内容与标题严重不符的；</p>
        <p>（12） 炒作绯闻、丑闻、劣迹等的；</p>
        <p>（13） 不当评述自然灾害、重大事故等灾难的；</p>
        <p>（14） 带有性暗示、性挑逗等易使人产生性联想的；</p>
        <p>（15） 展现血腥、惊悚、残忍等致人身心不适的；</p>
        <p>（16） 煽动人群歧视、地域歧视等的；</p>
        <p>（17） 宣扬低俗、庸俗、媚俗内容的；</p>
        <p>
          （18）
          其他违反法律法规、公序良俗、网络生态造成不良影响或侵害他人合法权益的内容。
        </p>
        <p>
          2.3
          用户在平台注册和使用账户，应当提供真实的身份信息。未按照相关法律规定提供真实身份信息、完成实名认证的，不得在平台发布内容。冒用他人名义、提供虚假注册信息或证明材料的，一经发现，将由平台关闭相关账户。
        </p>
        <h5>三、未成年人保护</h5>
        <p>
          平台致力于保护未成年人的合法权益，对于任何侵犯未成年人合法权益的行为和内容，平台将根据具体情况采取适当的介入措施。
        </p>
        <p>
          3.1
          未成年人在平台注册账户应当得到其监护人的同意，否则监护人可以合理方式通知平台关闭该未成年人注册的账户。
        </p>
        <p>
          3.2
          平台有权限制未成年人账户在平台发布内容、发出或接收信息。未成年人账户将被限制特定民事行为的权利，包括但不限于进行交易等。
        </p>
        <p>3.3 平台禁止任何下列损害未成年人身心健康和合法权益的内容：</p>
        <p>（1） 展示残害、虐待、体罚、侵害、危害未成年人的；</p>
        <p>
          （2） 推销或演示可能危害未成年人人身安全或健康的玩具物品、暴力漫画的；
        </p>
        <p>
          （3） 含有未成年人饮酒、吸烟、吸毒、纹身、出入酒吧、棋牌室行为的内容；
        </p>
        <p>（4） 披露未成年人的个人隐私或有损未成年人人格尊严的；</p>
        <p>（5） 涉及未成年人性侵害、裸露、色情的内容；</p>
        <p>（6） 展示未成年人婚育、早恋的内容；</p>
        <p>（7） 宣扬和鼓励未成年人厌学、弃学的内容；</p>
        <p>（8） 歪曲和恶搞经典卡通形象或供未成年人观看的其他内容；</p>
        <p>
          （9）
          过度消费未成年人群体，或恶意利用未成年人形象进行炒作、博眼球的内容；
        </p>
        <p>
          （10）
          其他可能引发未成年人模仿不安全行为和违反社会公德行为、诱导未成年人不良嗜好等的内容。
        </p>
        <p>
          3.4
          凡发布上述内容的账户，一经发现，平台将直接删除上述内容或者关闭账户。对于涉嫌违法犯罪的，平台将向公安优先提供情报线索，并配合公安公安机关的调查。
        </p>
        <h5>四、管理方式和投诉渠道</h5>
        <p>
          4.1
          对于违反本公约的，平台将删除违规违约内容，并对相关用户提出警告；对于屡次违反规定或造成恶劣影响的，平台将关闭账户，并向有关监管机关报备；对于涉嫌违法犯罪的，平台将及时把有关内容和线索向公安机关提供，并配合公安机关的调查。
        </p>
        <p>
          4.2
          平台鼓励广大用户对于上述违规违约行为和内容进行举报，经查证属实的，平台将予以适当奖励。
        </p>
        <h5>五、附则</h5>
        <p>本公约自公布之日起执行。</p>
        <p>
          如您对本公约有关内容有任何疑问或意见的，您可以通过下列方式联系我们：
        </p>
        <p>service@.com</p>
      </div>
    </div>
    <!-- 公司信息---end -->

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

    <!-- 备案 -->
    <div style="color: #999; text-align: center; padding-bottom: 50px">
      Copyright {{ year }}  All Rights Reserved
      <a class="ba-word" href="https://beian.miit.gov.cn/" target="_blank"
        >粤ICP备19032438号-7</a
      >
    </div>
    <!-- 备案 -->

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
      @close="
        showGoCompaynAndShop = false;
        showReg = false;
      "
      @closeAndShowCreateCom="
        showGoCompaynAndShop = false;
        showCreateCompany = true;
        showReg = false;
      "
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
