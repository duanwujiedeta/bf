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
          服务条款
        </h6>
        <p>感谢您使用产品及服务！</p>
        <p>
          本协议是您（以下简称“您”）与平台的提供者<b
            >（ MEDIA GROUP CO.,LIMITED）</b
          >之间就本平台服务等相关事宜所订立的契约，本条款中的“”和“我们”同指服务的提供者。
        </p>
        <p>
          <b>
            在使用本平台提供的网站、服务（统称为
            “平台产品或服务”）之前，请您认真阅读、充分理解本服务条款、《使用协议》和《隐私政策》，特别是关于隐私保护、免除或者限制责任的条款、法律适用和争议解决条款，将以粗体下划线显著标识，您应重点阅读。
          </b>
        </p>
        <p>
          <b>
            使用或任何产品及/或服务（“使用”行为指包括但不限于启动、浏览、注册、登录等行为中的一种或多种，下同）即表示您同意上述条款。
          </b>
        </p>
        <h5>一、账户条款</h5>
        <p>
          1.
          您必须取得您居住地或使用本服务所在地的合法经营者资质，包括但不限于已取得营业执照、取得相关行政许可和完成相关税务登记，保证遵守您当地的合法经营性质。
        </p>
        <p>
          2.
          要访问和使用服务，请务必提供您的完整名称（姓名）、统一社会信用代码（身份证号码）、实际经营地址、电话号码、有效的电子邮件地址、银行或第三方支付平台账户信息、行政许可信息及我们所需要的其他信息，您应确保您提供全部信息的真实性、准确性以及合法性，并授权我们在为实现本服务目的范围内使用这些信息。
        </p>
        <p>
          为帮助您配置员工账号，您还需向提供员工的姓名、邮箱、权限范围。
        </p>
        <p>
          如果上述信息发生变化，您应在三个工作日内将变更情况及有关文件报送平台。我们将对您提供的信息进行核验、登记，建立登记档案，并进行定期核验更新。如您未按前述要求提供和报送更新信息，我们有权拒绝您的服务申请或随时终止对您的服务。
        </p>
        <p>
          如经核验，您未依法办理市场主体登记，或未取得法律要求的相关行政许可的，我们将如实向有关主管部门报告。
        </p>
        <p>3.您同意将您提供的电子邮件地址作为主要沟通方式。</p>
        <p>
          4.您所注册的账号（或经由您同意授权的第三方登录账号）是您登录及使用本平台项下服务的唯一凭证。平台将根据法律法规的要求，履行自身作为移动互联网信息服务提供者应尽义务。您亦应妥善保管、正确和安全地使用账户信息（包括但不限于账号及密码）等信息。
        </p>
        <p>
          <b
            >因黑客行为、您保密措施不当或您的其他行为，致使密码等丢失或泄漏所引起的一切损失和后果，均由您自行承担，平台不承担责任。</b
          >
        </p>
        <p>
          若发现任何非法使用您的帐号或存在安全漏洞的情况，建议您立即通知平台，并授权平台将该信息同步给第三方支付服务平台。<b
            >您理解，平台对您的任何请求采取行动均需要合理时间，且平台应您请求而采取的行动可能无法避免或阻止侵害后果的形成或扩大，除存在法定过错外，我们不承担责任</b
          >
        </p>
        <p>
          <b
            >5.除存在过错外，<b>您应对您账户下进行的所有行为及/或通过该账号所从事的所有行为承担责任，</b>包括但不限于上传、收集、生成、存储、显示、分发和传输及/或展示的材料（包括图像、照片、图形、音频、视频、书写内容、代码、信息或数据）等。</b
          >
        </p>
        <p>
          6.<b
            >在合理怀疑或有证据证明，因您的作为或不作为而可能损害平台或任意第三方的合法权益，或违反本条款所约定任意内容的，平台有权拒绝向您提供服务，并暂停或终止您对账户的使用，也可以同时或随后注销您的账户。对此平台将不承担任何法律责任。</b
          >
        </p>
        <h5>二、账户激活</h5>
        <p>1.账户</p>
        <p>
          申请注册账户主体是账户所有者，并且将被授权使用我们提供给账户所有者的相关服务。
        </p>
        <p>
          <b
            >如果您代表您的雇主操作注册账户申请，则您的雇主应为账户所有者。同时，您应声明并保证您的雇主受本服务条款的约束，雇主应承诺对账户下的全部操作及行为的后果承担全部责任。您在代表您雇主注册及/或操作账户时，应以雇主名义进行注册。否则，您需与您的雇主对本服务条款以及《使用协议》和《隐私政策》承担连带责任。</b
          >
        </p>
        <p>2.Checkout账户</p>
        <p>
          您可以在后台设置页面里选择收款方式，请根据顾客的支付需求选择并设置其他种类的收款渠道。
        </p>
        <p>
          为了避免歧义，收款渠道属于第三方服务，具体请见本服务条款的第十二条。
        </p>
        <h5>三、通用条款</h5>
        <p>
          1.在您成为会员前，您必须阅读、同意并且接受本服务条款以及《使用协议》和《隐私政策》中包含的所有条款和条件。
        </p>
        <p>
          2.<b>本服务条款适用于中华人民共和国法律，并按照中华人民共和国法律解释，不考虑法律冲突的原则。双方确认任何因本条款引发的争议或索赔均由北京国际仲裁中心适用该会现行仲裁规则项下的简易程序进行仲裁。仲裁地在北京，仲裁语言为中文，仲裁裁决为终局，对各方均有约束力。</b>您提供的现住址、注册地址、电话号码、有效的电子邮件地址均可作为各自在服务履行中接收我方发送文书、函件以及诉讼或仲裁程序中接收人民法院或仲裁机构发送法律文书、仲裁文书等文件信息的约定送达方式。
        </p>
        <p>
          <b>
            3.
            您承认并同意，可随时在网站发布有关本服务条款修改的征求意见并以站内短信方式告知您，您可以就修订和重述服务条款的内容以邮件方式充分发表您的意见。有关本服务条款的修改内容将在实施前七日在网页公示，网址为<br />https://www..com/termService.html。<br />
            公示期满次日，修订后的服务条款生效。
          </b>
        </p>
        <p>
          <b
            >修订后的服务生效后，若您继续使用服务的，即表示您同意并接受修订后的服务条款，当您与平台发生争议时，应以最新的服务协议为准。如果您不接受服务条款的修改内容，您可以终止使用我们的服务，并按照修改前的服务条款承担相关责任。</b
          >
        </p>
        <p>
          <b
            >您可以随时访问<a href="https://www..com/termService.html"
              >https://www..com/termService.html</a
            >查看最新更新版本的服务条款以及最新版本生效之日前三年的全部历史版本。</b
          >
        </p>
        <p>
          4.您承诺，您不会将服务用于任何非法或未经授权的目的，也不会在使用本服务时违反您及您客户所在司法辖区的任何法律（包括但不限于版权法）。同时，亦不会违反任何中华人民共和国法律。您承诺在使用本服务时将遵守所有适用的法律、法规、规章以及行业惯例和社会公共道德等。
        </p>
        <p>
          如您从事的经营活动依法属于需要取得相关行政许可而没有取得的，您销售和提供的商品或服务等不符合保障人身、财产安全的要求和环境保护要求的，或属于中国及您与您客户所在司法辖区的任何法律、法规等禁止/限制交易的商品或服务的，除了依法向有关主管部门报告外，我们将对您采取警示、暂停或终止服务、封店等处置措施，情节严重或您拒不整改的，我们将采取扣押预付款/保证金（如有）、永久性禁止开店等处置措施。
        </p>
        <p>
          5.您承诺，您不会存储、发布、传播违反中国及您与您客户所在司法辖区的任何法律法规或侵害他人合法权益的信息，以及其他有损于社会秩序、社会治安、公共道德的信息。同时，您承诺不会为他人发布上述不符合相关国家规定或条款约定的信息内容提供任何便利。<b
            >若您违反上述约定时，由此造成的全部后果由您自行承担，与无关。同时，有权终止向您提供服务，并不予退还任何款项，因您上述行为给造成损失的，您应予全额赔偿。</b
          >
        </p>
        <p>
          6.您保证，您不会进行任何滥用资源的行为，包括但不仅限于任何与黑客攻击相关的行为、做外链图床等。
        </p>
        <p>
          7.您不得购买、商标以及其变体或错误拼写的域名和搜索引擎或其他点击付费关键词。
        </p>
        <p>
          8.未经书面许可，您不得翻版、复制、拷贝、出售、转售或为未授权第三方通过本服务的任何部分获利（包括但不限于本服务的使用以及访问）。
        </p>
        <p>
          9.如您对本服务条款有任何疑问的，请将相关疑问发送至service@.com，以便为您解答。
        </p>
        <p>
          10.您知晓您的资料（不包括信用卡信息）可能未经加密转移，并涉及（a）通过各种网络传输；（b）为符合和适应连接网络或设备技术要求作出的改变。信用卡信息在网络传输过程中始终是加密的。
        </p>
        <p>
          11.
          你认可并同意，您在使用本服务中涉及的各项信息，包括传送给或者由存储的信息，均受《隐私政策》的保护和约束。
        </p>
        <p>
          <b
            >12.本条款可能会有除中文以外的其他版本。如果不同语言版本的服务条款之间存在任何矛盾或冲突，以最新的中文版《服务条款》为准。</b
          >
        </p>
        <p>
          13.《服务条款》的所有条款和约定，对《服务条款》双方及其各自的继承人、继任者、获准受让人和法定代表人具有约束力。有权在不通知您或未经您同意的情况下转让将本服务条款项下权利或义务全部或部分转让给任意第三方。未经事先书面同意，您无权将本服务条款或您的本协议下的任何权利或义务全部或部分转让给任意第三方。
        </p>
        <p>
          <b
            >14.
            依据相关法律、法规、规章的规定或者平台服务条款对平台内经营者违法行为采取警示、暂停或者终止服务、封店等处理措施的，可自决定在作出处理措施之日起一个工作日内在网站予以公示，公示将载明涉及商铺名称、违法行为、处理措施等信息。如予以公示的，警示、暂停服务等短期处理措施的相关信息会持续公示至处理措施实施期满之日止。</b
          >
        </p>
        <h5>四、费用及支付方式</h5>
        <p>您使用产品或服务的，应按时向支付下列费用;</p>
        <p>
          1.套餐费。当您选择使用任意产品或服务时，应预先于官方页面进行采购，您可根据您所需产品/服务采购相应套餐及支付方式。具体套餐收费标准请以官方页面显示及最终付款账单为准。
        </p>
        <p>
          2.佣金。您同意，有权按照账户下店铺总销售金额（GMV）的一定比例向您收取佣金。具体佣金比例请以官网显示及最终付款账单为准。
        </p>
        <p>
          <b
            >3.付费服务终止或续费。付费服务期限到期后，如果您未能及时购买相应服务续费，有权暂停为您提供服务。</b
          >
        </p>
        <p>
          <b
            >4.您确认，将按一定账期生成您于上一结算月产生的全部费用账单，您收到发送账单后，请按时向进行支付。当您或/及您的店铺存在任何未结算费用时，有权暂停您店铺在上的部分或全部权限和功能。同时，每延迟一日，您应按照迟延部分款项1‰的比例向支付逾期违约金。若您在30天内仍未完成结算的，有权单方终止协议，停止对您的服务，并有权要求您赔偿损失。</b
          >
        </p>
        <h5>五、权利</h5>
        <p>
          1.在不干涉平台内店铺自主经营的前提下，我们保留随时以任何理由拒绝向任何人提供服务的权利。
        </p>
        <p>
          2.<b
            >如果我们发现您、您的店铺或您授权使用本服务第三方提供的商品、服务或者发布到店铺的资料违反了本服务条款、《使用协议》或《隐私政策》，我们将会移除资料并暂停或终止其账户。</b
          >
        </p>
        <p>
          3.<b
            >不会预先筛选资料，我们在遵守中国及您与您客户所在司法辖区的任何法律法规的前提下，可以自行决定拒绝或删除服务中的任何资料。</b
          >
        </p>
        <p>
          4.我们保留向您的竞争对手提供服务的权利，并且不承诺在任何特定细分市场中享有独家经营权。您进一步认可并且同意合作商也可能是的客户或商家，并且他们可能会与您竞争。
        </p>
        <p>
          5.如果有关帐户所有权的争议，我们保留要求提供文件以确定或确认该帐户所有权的权利。文件可能包括但不限于您的营业执照扫描件，政府签发的带照片的身份证件，信用卡的最后四位数字等。
        </p>
        <p>
          6.我们有权判定合法账户的所有权，并有权将该账户转让给合法的账户所有者。如果我们无法判定该账户合法所有者，将暂时禁用此账户，直至争端双方确定解决方案为止。
        </p>
        <p>
          7.<b
            >您同意，无论何种情况下，您使用任意产品或/服务，以及通过进行的任何经营活动产生的全部税款，均由您自行承担。若按法律规定或政府要求为您代扣或代付税款的，您应于收到通知之日起五日内全额支付给。</b
          >
        </p>
        <h5>六、责任限制</h5>
        <p>
          <b
            >1.您明确理解并同意，不承担任何因为使用或无法使用该服务导致的直接、间接、偶然的、特殊的、从属性的或惩罚性的损失，包括但不限于因使用或无法使用该服务带来的收益、商誉、数据或其他无形的损失。</b
          >
        </p>
        <p>
          <b
            >2.在任何情况下，不承担与我们的网站、服务或本《服务条款》（包括因为过失引起的）有关所产生的利润损失或任何特殊的、偶然的或附属性的损失。您应确保公司、的高级职员、董事、代理人、员工和供应商免于因为您违反本《服务条款》或其他附属文件（包括但不限于《使用协议》、《隐私政策》），或您违反任何法律或侵害第三方的权利而被起诉带来的赔偿要求，并同意赔偿我们已支付的相关诉讼费和损害赔偿，包括但不限于合理的律师代理费。</b
          >
        </p>
        <p>
          3.您确认，您应以自身名义进行服务信息上传、展示、咨询答复、服务或商品销售、售后服务提供等。在任何情况下，您应自行承担使用服务的风险。同时，若您从事任意活动被相关国家机关或其他相关权利机构等调查、处罚的，您应方自行负责处理并承担全部责任。不参与您从事的任何活动，包括但不限于您店铺的创建、售卖、经营等活动。
        </p>
        <p>
          4.<b
            >在任何情况下，均不对您与您客户或其他第三方间产生的任何争议、纠纷，承担任何责任，您应自行解决相关争议，如给造成任何损失的，您应赔偿的全部损失。如您或您客户的行为使遭受第三人主张权利，可在对第三人承担金钱给付等义务后就全部损失向您追偿。同时，保留是否继续为您提供服务的选择权。</b
          >
        </p>
        <p>
          5.本服务以“现状”和“可用”为基础提供，不附带任何明示，暗示或法定的保证或条件。
        </p>
        <p>6.不保证服务不会中断、及时或无错误。</p>
        <p>7.不保证使用本服务可能获得的结果是准确可靠的。</p>
        <p>
          8.不保证您通过本服务购买或获得的任何产品、服务、信息或其他材料的质量符合您的期望，或者本服务中的任何错误都将得到纠正。
        </p>
        <p>
          9.依照法律规定履行基础保障义务，但对于下述原因导致的合同履行障碍、履行瑕疵、履行延后或履行内容变更等情形，平台并不承担相应的违约责任:
        </p>
        <p>
          （一）因自然灾害、罢工、暴乱、战争、政府行为、司法行政命令等不可抗力因素；
        </p>
        <p>（二）因电力供应故障、通讯网络故障等公共服务因素或第三人因素；</p>
        <p>
          （三）在已尽善意管理的情况下，因常规或紧急的设备与系统维护、设备与系统故障、网络信息与数据安全等因素。
        </p>

        <h5>七、放弃和完成协议</h5>
        <p>
          未能行使或执行服务条款的任何权利或约定，并不视为对此类权利或约定的放弃。服务条款及其通过引用合并的文件构成您与之间的完整协议，并管辖您对本服务的使用，取代您与之间的任何先前协议（包括但不限于任何之前版本的条款）。
        </p>

        <h5>八、知识产权和客户内容</h5>
        <p>1.您保留您提供给服务的所有资料的知识产权。</p>
        <p>
          2.在上传资料时，您同意：（a）允许其他互联网用户查看您公开发布到您店铺的资料；（b）允许存储、展示您的资料；（c）可以在任何时候检查提交给其服务的任何资料，但没有义务一定这样做。
        </p>
        <p>
          3.您保留您上传到的所有资料的所有权；但是，为了让您的店铺正常经营，您同意并允许其他人查看您公开发布到店铺的资料。您有责任保证这些资料符合任何适用法律或法规的规定。
        </p>
        <p>
          4.我们不会将您的保密信息透露给第三方，除非因提供服务所必须并取得您的授权同意。保密信息包括您向我们提供的任何未公开的资料或信息。保密信息不包括：(a)在我们收到该信息时就已经公开的信息；（b）在我们收到该信息之后被公开（但不是由于我们的原因被公开）；（c）在不违反我们或其保密义务的情况下，我们从除你之外的其他人收到的信息；或者（d）法律要求我们披露的信息。
        </p>
        <p>
          5.拥有使用与您店铺相关的名称、注册商标、服务标志和品牌徽标去营销服务的非排他性的权利和许可。
        </p>
        <p>
          6.网站或平台上所有内容，包括但不限于著作、图片、档案、资讯、资料、网站架构、网站界面的安排、网页设计，均由依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业机密等。除非经官方书面同意，否则任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表本网站程序或内容。
        </p>
        <p>
          7.为您或您店铺提供或因履行本服务条款而制作、开发、生成的任何数据、图片、素材资料、文件文字内容、文档或代码、技术产品等，其所有权包括但不限于知识产权均归属于所有。未经授权，您不得擅自使用或授权第三方使用。
        </p>
        <p>
          8.在接到知识产权权利人发出的针对您的侵权通知时，会将通知转送给您，您有权提交包含不存在侵权行为初步证据在内的、您不存在侵权行为的声明，会将您的声明转送发出通知的知识产权权利人，并告知其可以向有关部门投诉或向人民法院起诉。
        </p>
        <p>
          同时，依法有权根据权利的性质、侵权的具体情形和技术条件、构成侵权的初步证据、服务类型等因素，采取包括但不限于删除、屏蔽、断开链接等必要措施。对多次、故意侵害知识产权的平台内经营者，有权采取终止交易和服务的措施。
        </p>
        <p>
          如在转送声明到达知识产权权利人后十五日内，未收到权利人已经投诉或起诉通知的，我们将终止对您采取上述措施。
        </p>

        <h5>九、主题商店</h5>
        <p>
          1.您可以通过装饰并使用主题商店里的设计模板建立您自己的店铺。您可以选择添加主题商店里的模板到您的店铺。
        </p>
        <p>
          2.您可以选择修改主题以适合您的店铺。可以酌情添加或修改用于引用的页脚。也可以自行决定修改其中违反《使用协议》或《服务条款》的内容。可以根据需要修改主题以反映技术更改和更新。
        </p>
        <p>
          <b
            >3.主题的知识产权是属于我们或设计师的。如果您超出购买主题所授予的权利，我们或设计师可能会对您采取法律行动，可能会采取相关措施，例如修改您的店铺或关闭您的店铺。</b
          >
        </p>
        <p>
          <b
            >4.确保安装的新模板不会覆盖或者破坏用户当前或预存的主题或用户界面是用户的责任，不承担任何的损失或损害。</b
          >
        </p>

        <h5>十、取消和终止</h5>
        <p>
          1.为保护账号安全，防止账号被盗等情况发生，我们可能会不时或定期采用一种或多种方式对注册用户进行用户身份验证（如短信验证、邮件验证等），如您未成功通过验证，我们有合理理由怀疑该账号出现被盗等不安全情况，并<b
            >可能视情节严重情况而单方决定是否中止或终止向该账号继续提供我们的产品及/或服务及/或采取进一步措施。您同意，我们采取前述措施是为了保护用户账号安全，我们无需因此承担任何责任。</b
          >
        </p>
        <p>
          2.您可以提前35天通过发送电子邮件至service@.com申请取消您的帐户，经审核同意后按照回复所指示的具体说明进行操作。<b
            >您同意，您购买的套餐一经付款，在所购套餐有效期内未使用或未使用完毕的，均不得要求退还，亦不得要求佣金从该套餐费用中进行抵扣。</b
          >
        </p>
        <p>
          <b
            >3.若您有以下行为，我们有权暂时中止或永久终止您对账号的使用或收回您的账号，中断或终止向您继续提供我们的产品及/或服务，且无需承担任何责任：</b
          >
        </p>
        <p style="padding-left: 2rem">
          •根据您的主动申请;<br />
          •您违反本条款的内容的;<br />
          •根据我们必须遵守的法律法规、监管政策;<br />
          •我们有理由认为您在平台有欺诈、发布或销售假冒伪劣/侵权商品、侵犯他人合法权益等任何违法或违规行为的;<br />
        </p>
        <p>4.任何一方因任何原因终止服务时：</p>
        <p style="padding-left: 2rem">
          •将停止向您提供服务，您将无法再访问您的帐户;<br />
          •除非服务条款另有规定，否则您无权要求退还或按比例退还任何费用;<br />
          •在终止生效之日，您因使用服务而欠的任何未结余额将立即到期且您须立即全额支付;<br />
          •您的商店网站将脱机;<br />
        </p>
        <p>
          5.
          我们保留以任何理由修改或终止服务或您的帐户的权利，恕不另行通知。
        </p>

        <h5>十一、服务和价格的修改</h5>
        <p>
          <b
            >1.保留随时修改或终止本服务（或其中任何部分）的权利，恕不另行通知。</b
          >
        </p>
        <p>
          <b
            >2.保留在通知或不通知的情况下随时修改或终止服务（或其任何部分）的权利。</b
          >
        </p>
        <p>
          <b
            >3.不对您或任何第三方因为本服务的任何修改、价格变更、暂停或中断负责。</b
          >
        </p>

        <h5>十二、第三方服务</h5>
        <p>
          1.除了本服务条款之外，您亦同意并遵守适用于您购买或由第三方提供的服务的附加服务特定条款。
        </p>
        <p>
          2.可能会不时推荐，为您提供访问或启用第三方软件，应用程序，产品，服务或网站链接（统称为“第三方服务”）供您考虑或使用，包括通过应用或主页。此类第三方服务仅为方便起见而提供您购买，访问或使用任何此类第三方服务仅限于您与适用的第三方服务提供商（“第三方服务提供商”）之间。除了这些服务条款之外，您还同意受适用于您从第三方供应商处购买或由第三方供应商提供的服务的其他服务特定条款的约束。
        </p>
        <p>
          <b
            >3.我们不提供有关第三方服务的任何保证。您认可无法控制第三方服务，因此对使用此类第三方服务的任何人不承担任何责任。不保证第三方服务的可用性，您认可可能随时自行决定禁止访问任何第三方服务，且无需通知您。不会因为暂停访问或禁用某第三方服务对任何人承担任何责任。</b
          >
        </p>
        <p>
          4.如果您在使用本服务时安装或启用了第三方服务，则您授权允许适用的第三方提供商访问您的数据、采取必要的用于与第三方和本服务之间的交互操作。任何您与第三方提供商之间的数据交换和其他交互仅限于您与此类第三方供应商之间。<b
            >由于第三方服务和第三方提供商可以对您的数据和其他资料进行访问，对于您由此第三方造成的数据或其他资料的披露、修改或删除，或者您可能遭受的任何相应的损失或损害不承担任何责任。</b
          >
        </p>
        <p>
          <b
            >5.在任何情况下，均不对由于任何第三方服务或您与第三方提供商之间的合作关系所造成的任何直接、间接、偶然、特殊、惩罚性、或其他损害负责。上述限制应在适用法律允许的最大范围内适用。</b
          >
        </p>
        <p>
          6.您与任何第三方提供商之间的关系严格限制在您与此类第三方提供商之间，没有义务介入您与第三方提供商之间发生的任何争议。
        </p>

        <h5>十三、测试服务</h5>
        <p>
          1.可能会不时自行决定邀请您在试用版中使用正在开发但尚未向所有商家提供的预发布或测试版功能。
        </p>
        <p>
          2.测试服务可能受其他条款和条件的约束，将在您使用测试服务之前向您提供这些条款和条件。
        </p>
        <p>
          3.此类测试服务以及与之相关的所有相关对话和材料将被视为机密信息，并受本协议中的保密规定的约束。
        </p>
        <p>
          4.在不限制前述内容的一般性的前提下，您同意未经事先书面同意，您不能发表任何公开声明或以其他方式披露您参与测试服务。
        </p>
        <p>
          <b
            >5.不对测试服务的运作作出任何陈述或保证。可自行决定随时终止测试服务。对于因测试服务引起的或与之相关的任何伤害或损害，概不负责。</b
          >
        </p>
        <p>
          6.测试服务可能与最终版本的工作方式不同。可以自行决定是否更改或不发布测试服务的最终版本或商业版本。
        </p>

        <h5>十四、保密义务</h5>
        <p>
          在您使用服务的期间，您可能会获取到与公司和/或服务相关的但并未向公众披露的信息（“保密信息”）。您同意：（a）对保密信息拥有专属权；（b）您不会讲保密信息披露于任何第三方，除了向您关联方、雇员、承包商或代理
          （“关联方”），此关联方同时受此保密义务和本条款的约束和限制；以及（c）您将通过所有合理措施确保保密信息不在本条款允许范围外被披露。
        </p>

        <h5>十五、隐私和数据保护</h5>
        <p>
          非常重视对您和您用户的个人信息的隐私保护（“个人信息”）。<b
            >通过使用服务，您认可并同意在收集、使用和披露这些个人信息时遵守《隐私政策》的约定。</b
          >
        </p>
        <p>
          <b>
            2.
            您理解并同意，您通过提供的产品或服务，收集、保存、上传、下载、分发、加工、使用以及通过其他方式处理的数据，以及利用可能配置的备份工具所备份的数据均为您的业务数据。您应对您的业务数据来源及内容的合法性与正当性负责，如您处理客户业务数据等行为违反法律规定，侵犯他人的肖像权、隐私权、个人信息、商业秘密或其他任何合法权益，给国家、社会或他人造成损害，您应自行承担全部责任。如因此给或其他第三方造成任何损失的，还应赔偿或其他第三方的一切损失。
          </b>
        </p>
        <p>
          <b>
            3.
            就您的业务数据，您授权我们及我们的关联公司为向您提供服务而处理。我们及我们的关联公司除执行您的服务要求之外，不对您的业务数据进行任何未经授权的处理，但以下情形除外：<br />
            （1）遵守法律法规的要求；<br />
            （2）为了解决您与我们之间的争议或第三方因您的行为与我们发生的争议;<br />
            （3）您与我们另行协商一致的其他情形。
          </b>
        </p>
        <p>
          <b>
            4.
            如您向提供或委托处理的数据中含有他人（如您的员工、终端用户等）的个人信息，您在向提供或委托处理该等个人信息前，应按照有关法律规定向相关个人告知的数据处理活动，并取得其合法、有效同意或具备其他合法事由（如需）；如相关个人拟行使个人信息权利，您应及时通过书面方式有效通知，以使能够及时、有效响应个人信息行权请求。
          </b>
        </p>

        <h5>十六、意见反馈</h5>
        <p>
          欢迎任何有关改进或增补服务的想法或建议。在任何情况下，您披露的任何想法、建议或相关材料，对服务、第三方服务或第三方服务商的评价（统称“反馈”）都不是保密信息，您也没有获得赔偿的预期。通过向提供反馈
          （无论是直接提交给还是任何主办的论坛或拥有的页面上发布），您放弃反馈中所有的权利，并且有权在未经您或任何第三方的许可的情况下根据需要自由实施和使用您所提供的反馈。您提交给针对第三方服务或第三方服务商的任何评论必须是您所知最准确的，并且不得是违法的、淫秽的、威胁的、诽谤的、侵犯隐私的、侵犯知识产权的，或以其他方式伤害第三方或令人反感的。<b
            >保留删除、编辑第三方服务或第三方服务商反馈的权利（但没有义务），没有定期检查发布的反馈的义务。</b
          >
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
