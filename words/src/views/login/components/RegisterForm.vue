<template>
  <div class="register-form">
    <h1 class="register-title">注册开发者账号</h1>
    <p class="redirect-login">已有账号?<el-button
        type="text"
        @click="$router.push({name:'login'})"
      >去登录</el-button>
    </p>
    <el-form
      ref="registerForm"
      :model="registerForm"
      @keyup.enter.native="submitregister"
    >
      <el-form-item
        prop="email"
        :class="showExist?'exist-check':''"
        :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                      { type: 'email', message: '邮箱地址不正确', trigger: ['blur', 'change'] },{ validator: checkUserExist, trigger: 'blur' }]"
      >
        <el-input
          placeholder="邮箱地址"
          @input="showExist=false;validateEmail();"
          v-model="registerForm.email"
          @change="(val)=>{registerForm.email=val.trim()}"
        ></el-input>
          <span
          slot="error"
          slot-scope="scope"
          class="el-form-item__error"
          style="display: inline-block;"
        >
          {{ scope.error }}
          <el-button
            slot="suffix"
            type="text"
            @click="$router.push({name:'login'})"
            style="padding: 0px;"
            v-if="scope.error=='已经存在一个使用此邮件地址的帐户，'"
          >
            去登录
          </el-button>
        </span>
      </el-form-item>
      <el-form-item
        prop="code"
        :rules="[{ required: true, message: '请输入验证码', trigger: ['blur', 'change'] },{min:4,max: 4, message: '验证码不正确', trigger: ['blur', 'change'] }]"
      >
        <el-input
          placeholder="验证码"
          v-model="registerForm.code"
          maxlength="4"
          @focus="showSendSuccessTip=false"
          @change="(val)=>{registerForm.code=val.trim()}"
        >
          <el-button
            slot="suffix"
            type="text"
            class="get-code"
            :disabled="disableCodeBtn || !correctEamil"
            @click="getCode"
          >
            <span v-if="getCodeWord">获取验证码</span>
            <span v-else>重新获取 {{codeTimer}}s</span>
          </el-button>
        </el-input>
        <el-alert
          title="验证码已发送至邮箱"
          type="success"
          :show-icon="true"
          :closable="false"
          v-show="showSendSuccessTip"
          style="z-index: 1;"
        >
        </el-alert>
      </el-form-item>
      <input
        type="text"
        style="width: 0; height: 0; opacity: 0; position: fixed; left: -10000px;"
      />
      <el-form-item
        prop="password"
        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码长度为6-20字符,可使用下划线', trigger: ['blur', 'change'] }]"
      >
        <el-input
          :type="pwdType?'password':'text'"
          placeholder="密码"
          v-model="registerForm.password"
          minlength="6"
          maxlength="20"
          @change="(val)=>{registerForm.password=val.trim()}"
        >
          <i
            :class="pwdType?'el-icon-view':'iconfont iconyincang'"
            style="cursor:pointer;"
            class="el-icon-view"
            slot="suffix"
            @click="pwdType = !pwdType"
          >
          </i>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      style="height:56px;margin-top:20px;font-size: 18px;"
      @click="submitregister"
      v-loading="loadingRegister"
      :disabled="loadingRegister"
    >立即注册</el-button>
    <p class="yimai-xieyi">
      <el-checkbox
        v-model="checked"
        style="margin-right:10px;"
      ></el-checkbox>
      我已阅读并同意<span @click="showProtocol=true">《XShoppy开发者协议》</span>
    </p>
    <!-- XShoppy开发者协议 -->
    <el-dialog
      :title="'XShoppy开发者协议'"
      width="640px"
      :visible.sync="showProtocol"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      style="padding: 0 20px 20px 20px;"
      :before-close="()=>{showProtocol=false}"
    >
      <h4>开发者协议</h4>
      <div style="max-height:500px;overflow: auto;">
        <h4>一. 重要须知</h4>
        <p>本协议是合作方（下称“合作方”或“您”）与赛凌公司及赛凌公司的合作单位（以下统称为“赛凌”或“赛凌公司”）之间关于您提交的相关网站与赛凌XShoppy开放平台连接并使用赛凌提供的各种服务（下称：“XShoppy开放平台”）的法律协议。</p>
        <p>赛凌在此特别提醒，您欲使用XShoppy开放平台服务，必须事先认真审阅本服务条款，包括免除或者限制赛凌责任的免责条款及对您权利限制的条款。请您审阅并决定接受或不接受本服务条款（未成年人审阅时应得到法定监护人的陪同）。如您不同意本服务条款及/或赛凌随时对本服务条款的修改，您应不使用或主动取消赛凌公司提供的服务。否则，您的任何对XShoppy开放平台的相关服务的使用行为将被视为您对本服务条款的完全接受，包括接受赛凌对服务条款随时所做的任何修改。</p>
        <p>本协议是基于XShoppy建站平台的《服务条款》、《XShoppy使用协议》和《隐私政策》制定的，与其是不可分割的，同时，赛凌不时发布的关于XShoppy开放平台的各种规范、规则等也是本协议的一部分，您在使用本服务的同时即是对本协议《服务条款》、《XShoppy使用协议》和《隐私政策及各种规范、规则等所有条款的接受和遵守，以下简称服务条款或条款，这些服务条款可由赛凌随时更新，且毋须另行通知。服务条款一旦发生变更, 赛凌将在网页上公布修改内容。修改后的服务条款一旦在网页上公布即有效代替原来的服务条款。您可随时登录赛凌网站查阅最新版服务条款。</p>
        <p>如果您选择提交XShoppy开放平台申请，即表示您同意接受本协议各项服务条款的约束。如果您不同意本服务条款，则不能获得使用本服务的权利。您若违反本服务条款规定，赛凌公司有权随时中止或终止您XShoppy开放平台服务的使用资格并保留追究相关法律责任的权利。</p>
        <br />
        <h4>二. 术语</h4>
        <p>
          如无特别说明，下列术语在本协议中的含义为：<br />
          1.XShoppy开放平台：指由赛凌公司开发并开放运营的平台，合作方可基于开放平台功能进行模板及应用开发及上传，用户可通过XShoppy后台安装使用相关模板及应用。<br />
          2.合作方：参与XShoppy开放平台合作的主体，包括但不限于公民、法人、其他组织。<br />
          3.平台用户：指所有使用开放平台账号在合作方网站登录的用户，以下简称平台用户或用户。<br />
          4.第三方：指赛凌公司、合作方以外的公民、法人、其他组织。
        </p>
        <br />
        <h4>三. 合作方的权利和义务</h4>
        <p>
          1. 合作方在接入XShoppy开放平台之前，<span class="fbold">需确保已取得了相关法规规定运营所需的全部资质文件</span>（包括但不限于《ICP运营许可证》、《营业执照》、《网络文化经营许可证》、《BBS许可证》、《信息网络视听节目许可证》等），且已按政府主管部门的规定完成了相应的备案手续，且应在申请书中附加加盖公司公章的全部资质文件及法人身份证的复印件的电子扫描版，交与赛凌公司留存； 合作方需签署本协议书允许与赛凌公司在XShoppy开放平台服务上进行合作，合作方需提供负责XShoppy开放平台的负责人的个人资料，包括但不限于姓名、性别、民族、年龄、身份证号码、职业、联系方式（如通信地址、电子邮件等），是真实的、完整的、合法有效的。如该负责人变更的，合作方应当在变更前15日书面通知赛凌公司，合作方未能提前15日书面通知赛凌公司的，由此产生的任何损失均由合作方承担，赛凌方有权中止或终止本协议。
        </p>
        <p>
          2. 合作方确保：在XShoppy开放平台的使用过程中的内容真实、准确、完整、安全；不含有任何欺诈成份；其网站发布的内容不侵犯任何第三者对该网站享有的合法权益，包括但不限于著作权、商标权、专利权等；不会违反任何法律、法规、条例或规章。对于任何因使用合作方网站造成的法律责任，由合作方单独承担，与赛凌公司无关。
        </p>
        <p>
          3. 合作方应向赛凌公司提供合作方与用户的权利义务协议，由赛凌公司在连接授权页面中提示用户。
        </p>
        <p>
          4. 合作方应保证：<span class="fbold">通过XShoppy开放平台的用户在合作方网站进行电子商务支付交易时必须通过XShoppy开放平台提供的支付渠道进行支付。</span>
        </p>
        <p>
          5. 合作方保证在其网站上公布的内容不得含有任何违反国家法律法规政策的信息，包括但不限于：<br />
          a) 反对宪法所确定的基本原则的；<br />
          b) 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br />
          c) 损害国家荣誉和利益的；<br />
          d) 煽动民族仇恨、民族歧视，破坏民族团结的；<br />
          e) 破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
          f) 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br />
          g) 侮辱或者诽谤他人，侵害他人合法权益的；<br />
          h) 含有法律、行政法规禁止的其他内容的。
        </p>
        <p>
          6. 合作方在与平台用户达成的交易及相关协议时，应自行独立解决两者间发生的纠纷，与赛凌公司无关，赛凌公司无需承担任何责任。
        </p>
        <p>
          7. 合作方同意接收来自赛凌公司及其关联公司或合作伙伴发出的邮件、信息，包括但不限于关于用户利益、商业推广的信息等。
        </p>
        <p>
          8. 用户可授权合作方将其在合作方网站的动态信息同步到XShoppy开放平台，同步内容同时可在XShoppy开放平台以及赛凌的其它产品中进行传播，如果用户在合作方网站的动态信息非首先或非原始产生于合作方网站时，合作方不得将此类信息同步到XShoppy开放平台。
        </p>
        <p>
          9. 合作方如向赛凌公司进行通知，应当通过赛凌公司对外正式公布的通信地址、电子邮件地址等联系信息进行送达。
        </p>
        <p>
          10. 在合作过程中，合作方应当安排专门人员负责有关合作工作，以保证约定的合作工作不间断地进行。
        </p>
        <p>
          11. 赛凌公司提供的公开XShoppy开放平台API接口为赛凌公司版权所有，合作方不得存在对其进行盗用、反编译、恶意攻击及其它任何危害赛凌公司及其用户安全与权益的行为。
        </p>
        <p>
          12. XShoppy开放平台过程中，赛凌公司向合作方提供的API_key与API_secret_key（以下统称 key）信息是赛凌公司与合作方的网站合作的依据，其版权归赛凌公司所有。合作方收到后，应妥善保存并注意防止泄漏；禁止合作方公开赛凌公司向其提供的key信息， 禁止合作方将自身key泄漏给非赛凌外的第三方，任何第三方也不能存储和调用非经赛凌公司合法授权的XShoppy开放平台接口。
        </p>
        <p>
          13. 合作方自行承担XShoppy开放平台合作业务相关的服务器及带宽费用，并提供支持，以保证用户的通过XShoppy建站平台进行正常访问。
        </p>
        <p>
          14. 合作方不得以任何方式收集、索取或以其他方式获取用户的XShoppy开放平台帐号、密码、好友关系链或其他身份验证凭据等相关信息。
        </p>
        <p>
          15. 对于由于合作方违反相关法律法规或侵犯任何人的权益造成的损失，均与赛凌无关，若造成赛凌或他人损失的，合作方应当承担全部责任。
        </p>
        <br />
        <h4>四. 赛凌公司的权利和义务</h4>
        <p>
          1. 赛凌公司享有对以下内容完全的、不可分割的所有权及知识产权：<br />
          a) 开放平台及其所有元素和组件，包括但不限于所有内容、数据、技术、软件、代码、用户界面以及与其相关的任何衍生作品；<br />
          b) 用户的开放平台账号与密码、好友关系链或其他身份验证凭据等相关用户信息；<br />
          c) 合作方向赛凌提供的XShoppy开放平台服务相关的任何信息及反馈；<br />
          d) 其它XShoppy开放平台的网站信息；<br />
          e) 其他依法应该由赛凌享有权益的内容。<br />
        </p>
        <p>
          2. 在合作方提交申请之后，赛凌公司有权对该合作方予以审核，赛凌公司有权依据其自身判断决定是否同意与其进行XShoppy开放平台连接。
        </p>
        <p>
          3. 赛凌公司有权不定时对合作方进行审核，如发现合作方违反本协议的约定、违反任何法律法规或赛凌公司根据自己的独立判断认为合作方不符合赛凌公司要求或平台用户的需求的，赛凌公司有权在不通知的情况下对其予以删除或屏蔽，但赛凌的审核，并不减轻合作方应该承担的任何责任，由于合作方违反相关法规造成赛凌或他人损失的，合作方应当承担全部责任。
        </p>
        <p>
          4. 赛凌公司有权知悉合作方和平台用户的注册数据及交易信息，如发现注册数据或交易行为中存在任何问题或怀疑，可要求合作方和平台用户改正，或者直接做出删除、屏蔽等处理。
        </p>
        <p>
          5. 赛凌公司有权对用户从合作方网站同步到XShoppy开放平台的内容进行审核，并选择是否允许其显示在XShoppy开放平台。
        </p>
        <p>
          6. 经过用户授权且通过赛凌公司审核同步到XShoppy开放平台的内容可在XShoppy开放平台以及赛凌公司的其它产品中传播。
        </p>
        <p>
          7. 由于合作方网站存在海量信息等特殊性，赛凌公司并不实际控制合作方提供的链接，故对于任何因直接或间接使用合作方网站信息而造成的损失，赛凌公司均不承担责任。
        </p>
        <p>
          8. 赛凌公司不能控制网络信息的真实性、安全性或合法性，以及达成交易各方履行其义务的能力，合作方和平台用户应自行谨慎判断信息的真实性、安全性和合法性。
        </p>
        <p>
          9. 如发生下列任一情形，赛凌公司有权以普通或非专业人员的知识水平标准对合作方或平台用户提供的相关内容或实施的行为进行判别，如认为这些内容或行为违法或不合理，赛凌公司有权删除相关内容，或终止或暂停对该合作方或平台用户提供服务：<br />
          a) 他方对某个合作方的内容或行为持有异议并通知赛凌公司；<br />
          b) 他方向赛凌公司告知赛凌开放平台用户有违法或不合理的内容。
        </p>
        <p>
          10. 如发现合作方或平台用户违约，赛凌公司可不经过事先通知合作方或平台用户而直接删除相关信息，或终止、暂停为合作方或平台用户提供服务。
        </p>
        <p>
          11. 赛凌公司可通过网页公告、电子邮件、手机短信或常规的信件传送等方式向合作方和平台用户发出通知，该等通知在发送时即视为已送达收件人。
        </p>
        <p>
          12. 赛凌公司与合作方之间若有联合运营或推广的需要，具体授权将另行单独协商确定。
        </p>
        <p>
          13. 赛凌公司现对XShoppy开放平台的合作不收取任何费用，<span class="fbold">但赛凌公司保留今后收取费用和自行制定收费标准的权利。</span>
        </p>
        <br />
        <h4>五. XShoppy开放平台的规则条款</h4>
        <p>
          1. 合作方应保证用户可使用开放平台账号及其密码登录其网站，对用户的账户及其密码的安全负全责，同时对用户的操作行为负全责。
        </p>
        <p>
          2. 合作方承诺对合作网站上发布信息的真实、安全或合法性负责，不得利用赛凌公司提供的网络服务上传、展示或传播任何虚假的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料；<br />
          不得侵犯其他任何第三方的专利权、著作权、商标权、名誉权或其他任何合法权益；
          不实施包括但不限于涉黄、赌、毒、反动等各类违法违规行为；<br />
          不买卖国家禁止或限制交易的产品、不得买卖侵犯他人合法权益的产品，也不得买卖违背社会公共利益或公共道德的、或是赛凌公司认为不适合交易的产品。<br />
          合作方和平台用户不在交易过程中采取不正当竞争行为，不扰乱网上交易的正常秩序。如有违反本条义务导致任何法律后果的发生，合作方和平台用户将以自己的名义独立承担所有的责任，与赛凌公司无关。
        </p>
        <p>
          3. XShoppy开放平台的平台运营数据的全部权利均归属赛凌公司。未经赛凌公司书面许可，合作方和平台用户不得为任何目的擅自使用。
        </p>
        <p>
          4. 平台用户使用合作方提供的免费和收费服务发生的任何纠纷，平台用户和合作方自行协商解决，赛凌公司不承担任何责任。对上述纠纷，赛凌公司有权进行协调，但赛凌公司并不保证协调取得实际效果,平台用户和合作方均无权要求赛凌公司进行赔偿或补偿。
        </p>
        <p>
          5. 在赛凌公司提出要求时，合作方应向赛凌公司提供其网站特定用户信息以便于：<br />
          a) 维护赛凌公司及其代理商的合法权利。<br />
          b) 保护赛凌公司用户或公众安全。<br />
          c) 防止欺诈或其它违法行为。
        </p>
        <p>
          6. 为了保护用户的个人信息和隐私等的安全，以及方便赛凌对合作网站的排查，赛凌公司仅向提交了审核的网站提供XShoppy开放平台相关服务。<br />
          赛凌禁止任何第三方通过包括但不限于网站代理（即申请成功的合作方网站为其它未经赛凌审核的网站提供代理服务，使得该网站可以实现XShoppy开放平台）等未经赛凌书面明确认可的方式，使得其它未经赛凌审核的网站可以实现XShoppy开放平台。<br />
          赛凌方面会定期由客服人员对各网站的XShoppy开放平台情况进行排查，一经赛凌发现合作方存在代理登录行为，赛凌有权立即终止向合作方其提供全部服务，并追究提供代理登录网站以及使用代理登录的网站的责任。
        </p>
        <br />
        <h4>六. 本协议下服务的暂停或终止</h4>
        <p>1. 合作方应按照赛凌的要求提交真实准确的相关资料，如赛凌公司发现合作方的注册信息不真实或不准确的，赛凌公司有权暂停或终止向其提供本协议下服务,由此产生的一切法律责任由合作方自行承担。</p>
        <p>2. 如合作方书面通知赛凌公司不接受经赛凌公司新的服务条款的，赛凌公司有权随时暂停或终止向其提供本协议下服务。</p>
        <p>3. 在合作方违反本协议规定或任何法规时，赛凌公司有权随时暂停或终止向该合作方提供服务。如该合作方后续再直接或间接或以他人名义注册登录赛凌开放平台并申请使用XShoppy开放平台服务的，赛凌公司有权直接单方面暂停或终止提供本协议下服务。</p>
        <p>4. 如本协议服务终止，赛凌公司有权选择是否为合作方保留合作方账号中与XShoppy开放平台服务相关的任何信息，也可选择是否将信息转发给合作方，也有权选择是否保存合作方的数据及以前的记录。</p>
        <p>5. 如本协议服务终止的，赛凌公司有权删除在服务终止前合作方尚未完成的信息。</p>
        <br />
        <h4>七. 隐私相关条款</h4>
        <p>1. 赛凌公司重视对合作方及平台用户隐私的保护，保护隐私是赛凌公司的一项基本政策。您应当遵守中国有关隐私的法律和赛凌公司的隐私权政策。您在使用本服务的同时即是对XShoppy建站平台《隐私政策》及各种规范、规则等所有条款的接受和遵守，这些服务条款可由赛凌随时更新，且毋须另行通知。服务条款一旦发生变更, 赛凌将在网页上公布修改内容。修改后的服务条款一旦在网页上公布即有效代替原来的服务条款。</p>
        <p>2. 在合作方使用XShoppy开放平台时，合作方允许赛凌公司可自动接收并记录合作方浏览器上的服务器数值，包括但不限于IP地址等数据、合作方和平台用户要求取用的网页记录及各种记录等。</p>
        <p>3. 赛凌公司不允许任何人以任何手段收集、编辑、出售或者无偿传播合作方和平台用户的个人信息。一经发现合作方实施上述行为，赛凌公司有权立即终止与该合作方的服务协议，终止为其提供任何服务。</p>
        <p>4. 为服务合作方和平台用户的目的，赛凌公司可使用合作方的信息，包括但不限于向合作方和平台用户发出产品、服务或商业信息等，或者与赛凌公司合作伙伴共享信息以便他们向合作方和平台用户发送有关其产品、服务或商业信息等。</p>
        <p>
          5. 如发生下列任一情况，赛凌公司有权对合作方的信息予以披露：<br />
          a. 经相关合作方同意披露的；<br />
          b. 根据法律的有关规定，或行政、司法机构的要求，向第三方或者行政、司法机构披露；<br />
          c. 如果合作方出现违反中国有关法律、法规、规章、政策的，需要向第三方披露；<br />
          d. 其它赛凌公司为合作方和平台用户服务目的而认为合适披露的。
        </p>
        <br />
        <h4>八. 知识产权条款</h4>
        <p>1. 尊重知识产权是合作方和平台用户应尽的义务，如有违反，合作方和平台用户应承担法律责任。</p>
        <p>2. 用户在合作方网站发表的被同步到XShoppy开放平台的所有内容，包括但不限于文字、图片、网站架构、网站画面的安排、网页设计，合作方应自行负责其内容的合法性、准确性等责任。</p>
        <br />
        <h4>九. 协议内容、修改、转让</h4>
        <p>1. 赛凌公司可将本协议下的权利和义务的部分或全部转让给其他第三方，如果合作方不同意赛凌公司的转让，则其有权停止使用本协议下服务。如果合作方和平台用户继续使用，则视合作方对此予以接受。</p>
        <p>2. 合作方在使用赛凌公司提供的各项服务的同时，承诺接受并遵守各项相关规则的规定。赛凌公司有权根据需要不时地制订、修改本协议或各类规则，且毋须另行通知。其一旦发生变动，赛凌公司将会在相关页面上公布修改后的协议或规则，如果合作方不同意所改动的内容，应主动取消服务，如果继续使用服务，则视为接受协议或规则的变动。除另行明确声明外，任何使“服务”范围扩大或功能增强的新内容均受本协议约束。</p>
        <br />
        <h4>十. 免责事由</h4>
        <p>1. 鉴于网络服务的特殊性，合作方同意赛凌公司无条件变更、中断部分或全部的网络服务，并按本协议规定删除合作方在使用服务中提交的任何资料，而无需通知合作方，也无需承担任何责任。</p>
        <p>2. 赛凌公司有权定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护，如因此类情况而造成网络服务在合理时间内的中断或暂停，赛凌公司无需为此承担任何责任。</p>
        <p>3. 如发生下述任一情况而导致合作方损失的，赛凌公司不承担责任：<br />
          a. 发生不可抗力情形的；<br />
          b. 黑客攻击、计算机病毒侵入或发作的；<br />
          c. 计算机系统遭到破坏、瘫痪或无法正常使用的；<br />
          d. 电信部门技术调整的；<br />
          e. 因政府管制而造成暂时性关闭的；<br />
          f. 其它非因赛凌公司的过错而引起的。</p>
        <p>4. 赛凌公司有权但没有义务审查合作方是否具备合法的经营资格，合作方和平台用户同意自行审查交易相对一方的经营资信和资质，并自担风险，与赛凌公司无关。</p>
        <p>5. 赛凌公司仅为合作方提供XShoppy开放平台服务，并不参与合作方网站运营，因合作方网站的内容存在侵犯第三方合法权益的情形，由合作方负责解决，赛凌公司无需承担任何责任。</p>
        <br />
        <h4>十一. 本协议的解释、法律适用及争端解决</h4>
        <p>1. 赛凌公司对本协议条款拥有解释权。</p>
        <p>2. 本协议的有效性、履行和与本协议及其修订本效力有关的所有事宜，将受中华人民共和国大陆法律管辖，任何争议仅适用中华人民共和国大陆法律。</p>
        <p>3. 本协议签订地为中国深圳市南山区。因本协议所引起的与赛凌公司的任何纠纷或争议，协议各方首先应友好协商解决，协商不成的，各方在此完全同意将纠纷或争议提交协议签订地有管辖权的人民法院诉讼解决。</p>
      </div>
    </el-dialog>
    <!-- end XShoppy开发者协议 -->
  </div>
</template>
<script>
import { getRegisterCode, registerUser, checkUser } from "./api/register.js";
export default {
  data() {
    return {
      checked: false,
      disableCodeBtn: false,
      showSendSuccessTip: false, //验证码框获取焦点
      correctEamil: false,
      codeTimer: 60,
      registerForm: {
        email: "",
        password: "",
        code: ""
      },
      showProtocol: false, //显示协议
      loadingRegister: false, //注册按钮loading
      showExist: false, //是否已注册的状态
      pwdType: true, //显示、隐藏密码
      getCodeWord: true //用于显示获取验证码文本
    };
  },
  methods: {
    async checkUserExist(rule, value, callback) {
      if (this.showExist) {
        callback(new Error("已经存在一个使用此邮件地址的帐户，"));
        return;
      }
      if (!value) {
        callback();
      }
      let res = await checkUser({ email: value });
      if (res.code != 0) {
        this.showExist = true;
        return callback(new Error("已经存在一个使用此邮件地址的帐户，"));
      } else {
        this.showExist = false;
        callback();
      }
    },
    submitregister() {
      if (this.loadingRegister) return;
      if (!this.checked) {
        this.$message.error("请先同意XShoppy开发者协议");
        return;
      }
      let _this = this;
      this.loadingRegister = true;
      this.$refs["registerForm"].validate(valid => {
        if (valid) {
          _this.register();
        } else {
          _this.loadingRegister = false;
          return false;
        }
        _this.loadingRegister = false;
      });
    },
    async register() {
      let res = await registerUser(this.registerForm);
      if (res.code == 0) {
        this.$message.success("注册成功");
        this.$router.push({name:'login'});
      }
    },
    validateEmail() {
      //输入框的时候用
      let emailReg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
      this.correctEamil = emailReg.test(this.registerForm.email);
    },
    async getCode() {
      if (this.showExist) return;
      //loading Btn
      this.disableCodeBtn = true; //禁用验证码按钮
      //判断邮箱地址正确与否
      let emailReg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
      if (!emailReg.test(this.registerForm.email)) {
        this.$message.error("邮箱地址不正确");
        this.disableCodeBtn = false; //禁用验证码按钮
        return;
      }
      let res = await getRegisterCode({
        email: this.registerForm.email,
        emailType: "register"
      });
      //判断状态
      if (res.code != 0) {
        this.disableCodeBtn = false; //禁用验证码按钮
        return;
      }
      this.showSendSuccessTip = true;
      this.getCodeWord = false;
      let that = this;
      this.codeInputFocus = false;
      let codeInter = setInterval(() => {
        that.codeTimer = parseInt(that.codeTimer, 10) - 1;
        if (that.codeTimer == 0) {
          clearInterval(codeInter);
          this.disableCodeBtn = false;
          this.showSendSuccessTip = false;
          this.getCodeWord = true;
          that.codeTimer = 60;
        }
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
.register-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding: 60px 40px 0px;
  background-color: #fff;
  box-sizing: border-box;
  .register-title {
    font-size: 32px;
    font-weight: 500;
    color: #000000;
  }
  .redirect-login {
    margin-top: 10px;
  }
  .el-form {
    margin-top: 40px;
  }
  .yimai-xieyi {
    margin-top: 20px;
    span {
      cursor: pointer;
      color: #5f46fa;
    }
  }
  /deep/.el-alert--success.is-light {
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #ffffff;
    padding-left: 0px;
  }
  .el-form-item.is-error {
    .error-tip {
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      position: absolute;
      top: 100%;
      left: 0;
      color: #f56c6c;
      span {
        color: #5f46fa;
        cursor: pointer;
      }
    }
  }
}
</style>
