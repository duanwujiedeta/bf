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
          使用协议
        </h6>
        <p>
          是一个商业平台，为商家提供工具和技术，以便在自己的网站、实体零售点、市场等场所建立在线商店并销售产品和服务。虽然我们认为自由和开放的思想和产品交流是商业的一个关键原则，但有些活动与的使命相违背，是不被允许的。<b
            >本《使用协议》描述了一些您使用我们服务时被禁止的活动。</b
          >
        </p>
        <p>
          本文中的“材料”指在您的账户上或与您的账户相关的上传、收集、生成、存储、显示、分发、传输或展示的任何照片、图像、视频、图形、书面内容，音频文件、代码、信息和数据等。
        </p>
        <p><b>一、以下活动是被禁止的：</b></p>
        <p>
          <b>1.剥削儿童：</b
          >您不得提供与非法利用或滥用儿童权益相关的商品和服务，也不得发布、上传任何此类材料，包括但不限于虐待儿童或性虐待的图像或描述，或以性方式呈现儿童的图片与描述。
        </p>
        <p>
          <b>2.骚扰、欺凌、诽谤和威胁：</b
          >您不得提供骚扰、欺凌、诽谤或威胁特定个人的商品或服务，或发布或上传材料。
        </p>
        <p>
          <b>3.仇恨内容：</b
          >您不得根据种族、民族、肤色、国籍、宗教、年龄、性别、性取向、残疾、医疗状况、退伍军人身份或其他歧视形式来提供、纵容或宣传此类进行暴力侵害的产品和服务，也不得发布上传此类材料。
        </p>
        <p>
          <b>4.受限制的物品：</b
          >您不得提供、发布或上传任何促成或宣传您所在司法管辖区属于或看似受限制物品的商品或服务，包括但不限于严禁进出口物品及考古发现品，枪支或枪支部件、刀具及模型，攻击性的种族主义物件、反宗教崇奉物件，走私品，犯罪工具，医疗器械，处方、非处方药物及其原材料、丰胸、壮阳、减肥、美白、增发及增高等黑五类产品，需相关政府有关部门授权而未获授权的商品或服务。
        </p>
        <p>
          <b>5.欺诈性行为：</b
          >您不得将本服务用于任何欺骗性商业行为或任何其他非法或欺骗性活动，包括但不限于虚假承诺、虚假宣传，虚假交易，强制交易，低价钓鱼欺诈，以假充真、以次充好，假借退款或换货欺诈，夸大、隐瞒所提供的商品或者服务的数量、质量、性能等信息，以及其他引人误解的方式误导他人而骗取他人支付价款等欺诈性行为。
        </p>
        <p>
          <b>6.知识产权：</b
          >您不得提供、售卖侵犯他人版权、商标权或其他知识产权的商品或服务，包括但不限于仿冒伪劣产品，与知名商品混淆而误导他人的产品/服务。同时，也不得上传、发布此类材料。
        </p>
        <p>
          <b>7.恶意做法：</b
          >您不得使用服务传播恶意软件或主机网络钓鱼网页、无效链接等。您不得进行损害或破坏服务运营或其他基础设施包括第三方合作者的活动，也不得上传、发布此类材料。
        </p>
        <p>
          <b>8.个人信息和机密信息：</b
          >您不得发布或上传任何包含个人身份信息，敏感个人信息或机密信息的材料，例如信用卡号，保密国家身份证号码或帐户密码，除非您已获得该信息所属权人的同意，或被授权提供该信息。
        </p>
        <p>
          <b>9.自残：</b
          >您不得提供或宣传自我伤害的商品或服务，也不能发布或上传材料。
        </p>
        <p><b>10.垃圾邮件：</b>您不得使用本服务传输未经请求的商业电子邮件。</p>
        <p>
          <b>11.恐怖组织：</b
          >您不得提供暗示或宣传恐怖组织支持或资助或成为其成员的商品或服务，也不能发布或上传材料。
        </p>
        <p>
          <b>12.</b
          >除上述外，您不得实施任何中国以及您与您客户所属国家/地区及行为发生地所属国家/地区法律、法规及规章，以及行业惯例和社会公共道德，禁止或限制的其他行为。
        </p>
        <p>
          <b
            >二、致力于为您提供文明健康、规范有序的服务，您应遵守中国相关法律、法规以及规章，您还同时应遵守您与您客户所属国家/地区及行为发生地所属国家/地区应适用的法律法规、行业惯例和社会公共道德，您应自行承担您所发布的信息内容全部责任。特别地，您不得发布下列内容：</b
          >
        </p>
        <p>1. 违反任意应适用国家的法律法规政策的任何内容；</p>
        <p>2. 反对中华人民共和国宪法所确定的基本原则的；</p>
        <p>3. 危害国家统一、主权和领土完整的；</p>
        <p>
          4. 泄露国家秘密，颠覆国家政权，危害国家安全或者损害国家荣誉和利益的；
        </p>
        <p>
          5.
          歪曲、丑化、亵渎、否定英雄烈士事迹和精神，以侮辱、诽谤或者其他方式侵害英雄烈士的姓名、肖像、名誉、荣誉的；
        </p>
        <p>6. 宣扬恐怖主义、极端主义的；</p>
        <p>7. 煽动民族仇恨、民族歧视，破坏民族团结或者侵害民族风俗、习惯的；</p>
        <p>8. 破坏国家宗教政策，宣扬邪教、迷信的；</p>
        <p>9. 散布谣言，扰乱社会秩序，社会治安，公共道德，破坏社会稳定的；</p>
        <p>10. 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</p>
        <p>11. 侮辱或者诽谤他人，侵害他人名誉、隐私和其他合法权益的；</p>
        <p>12. 使用夸张标题，内容与标题严重不符的；</p>
        <p>13. 炒作绯闻、丑闻、劣迹等的；</p>
        <p>14. 不当评述自然灾害、重大事故等灾难的；</p>
        <p>15. 带有性暗示、性挑逗等易使人产生性联想的；</p>
        <p>16. 展现血腥、惊悚、残忍等致人身心不适的；</p>
        <p>17. 煽动人群歧视、地域歧视等的；</p>
        <p>18. 宣扬低俗、庸俗、媚俗内容的；</p>
        <p>19. 危害社会公德或者民族优秀文化传统的；</p>
        <p>20. 宣扬外挂，私服以及木马的相关内容；</p>
        <p>
          21.
          刊登任何经合理判断为不妥当或者本公司未认可的软件、文件等在内的主页地址或者链接的行为，妨碍互联网运行安全的信息；
        </p>
        <p>
          22.
          含有中华人民共和国法律、法规以及您与您客户所在司法辖区任何法律、法规禁止/限制的其他内容，或含有其他对网络生态造成不良影响的内容的。
        </p>
        <p><b>三、数据保护</b></p>
        <p>
          您理解并同意，您通过提供的产品或服务，收集、保存、上传、下载、分发、加工、使用以及通过其他方式处理的数据，以及利用可能配置的备份工具所备份的数据均为您的业务数据，包括您处理的终端用户的个人信息。您应对您的业务数据来源及内容的合法性与正当性负责，尤其是您在处理终端用户（消费者）的个人信息时，应遵守相关个人信息保护的法律规定，例如履行个人信息处理的告知义务，取得同意或具备其他合法事由（如需）。如您处理业务数据等行为违反法律规定，侵犯他人的肖像权、隐私权、个人信息、商业秘密或其他任何合法权益，给国家、社会或他人造成损害，您应自行承担全部责任。如因此给或其他第三方造成任何损失的，还应赔偿或其他第三方的一切损失。
        </p>
        <p>
          就您的业务数据，您授权我们及我们的关联公司为向您提供服务而处理。我们及我们的关联公司除执行您的服务要求之外，不对您的业务数据进行任何未经授权的处理，但以下情形除外：
        </p>
        <p>（1）遵守法律法规的要求；</p>
        <p>
          （2）为了解决您与我们之间的争议或第三方因您的行为与我们发生的争议;
        </p>
        <p>（3）您与我们另行协商一致的其他情形。</p>
        <p>
          如果您从事违反本《使用协议》的任意内容，包括您使用服务之外的活动，我们可以随时在不另行通知的情况下删除任何材料，并暂停或终止您的帐户、店铺或访问服务，并不予退还任何款项，因您上述行为给造成损失的，您应予全额赔偿。
        </p>
        <p>
          有权随时监督或调查您使用的材料和服务是否遵守本《使用协议》和《服务条款》，或任何其他与达成的共识或协议（统称“协议”）。我们关于是否发生违反本《使用协议》行为的决定将是最终的和具有约束力的，我们自行决定如何处理违反本协议的行为（包括不采取任何行动）。
        </p>
        <p>
          <b>
            可以随时通过在【https://www..com/userAgreement.html】上发布修订版本来修改此《使用协议》。在使用协议的修订版本发布后继续使用服务或访问您的帐户，即表示您同意遵守最新版本的《使用协议》。如果本协议与《服务条款》之间发生冲突，则《使用协议》将优先，但仅限于解决此类冲突所需的范围。
          </b>
        </p>
        <p>
          <b>
            本协议为《服务条款》的补充协议，本协议未列明的条款以《服务条款》为准。同时，本协议中使用但未定义的术语应具有条款中规定的含义。
          </b>
        </p>
        <p>
          如果您认为有使用本服务的用户违反了此《使用协议》，请通过发送邮件到service@.com与我们联系。
        </p>
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
    <div style="color: #999; text-align: center; padding-bottom: 50px">
      Copyright {{ year }}  All Rights Reserved
      <a class="ba-word" href="https://beian.miit.gov.cn/" target="_blank"
        >粤ICP备19032438号-7</a
      >
    </div>
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
