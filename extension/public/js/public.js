$(function () {
    generateHtml()
})
function loginClick () {
	$(".mask-login").show()
}

function submitInfo () {
	if ($("input[name='companyName']").val() == ''||$("input[name='companyName']").val().length<5) {
		$("input[name='companyName']").siblings("p").show()
	}  else {
		$("input[name='companyName']").siblings("p").hide()
	}
	if ($("input[name='industry']").val() == '') {
		$("input[name='industry']").siblings("p").show()
	} else {
		$("input[name='industry']").siblings("p").hide()
	}
	if ($("input[name='count']").val() == '') {
		$("input[name='count']").siblings("p.info").show()
	} else {
		$("input[name='count']").siblings("p.info").hide()
	}
	if ($("input[name='name']").val() == '') {
		$("input[name='name']").siblings("p").show()
	} else {
		$("input[name='name']").siblings("p").hide()
	}
	if ($("input[name='phone']").val() == '') {
		$("input[name='phone']").siblings("p").show()
	} else {
		$("input[name='phone']").siblings("p").hide()
	}
    let count = 0;
    let redP = $("p.info");
    redP.each(function () {
        if ($(this).is(':hidden') == true) {
            count ++
        }
    })
	if ($("input[name='count']").val().substring(0,1) == '0') {
		$("input[name='count']").siblings("p.info").hide()
		$("input[name='count']").siblings("p.error").show()
		return false;
	}
    if (count == 5) {
		var url;
		if(window.location.host.indexOf("powerbuyin")>=0){
			url = 'https://oms-api.powerbuyin.top/company/company-register/submit';
		}else{
			url = 'https://oms-api..com/company/company-register/submit';
		}
        $.ajax({
            url:url,
            type: 'post',
            data:{
				"industry": $("input[name='industry']").val(),
				"leading_official": $("input[name='name']").val(),
				"company_name": $("input[name='companyName']").val(),
				"estimate_quantity": $("input[name='count']").val(),
				"mobile": $("input[name='phone']").val(),
				"degree": $('input[name="type"]:checked').val(),
            },
            success: function (res) {
				if (res.code == 0) {
					$(".mask-login").hide();
					$(".mask-success").show()	
				} else {
					alert(res.msg)
				}
            },
            error: function () {

            }
        })
    }
}

function checkVal (obj) {
	var input = $(obj);
	var iname = input.attr("name");
	var val = input.val().trim();
	if(iname=="companyName" && val.length<5){
		$(obj).siblings("p").show()
		return
	}else{
		$(obj).siblings("p").hide()
	}
}

function closeKuang () {
	$(".mask-login").hide()
	$(".mask-success").hide()
    $("input[name='companyName']").val('');
    $("input[name='industry']").val('');
    $("input[name='count']").val('');
    $("input[name='name']").val('');
    $("input[name='phone']").val('');
    $("p.red").hide()
}


function generateHtml () {
	let loginHtml = `
		<div class="mask-login">
		<div class="kuang">
			<p class="close-Img" onclick="closeKuang()">×</p>
			<p class="p1">开始建站</p>
			<p class="p2">提交后1-3个工作日将有专业对接经理与您联系</p>
			<div class="flex-lp" style="margin-bottom: 5px;">
			<label for=""></label>
			<p class="info">平台将人工验证公司信息，请填写完成公司名称</p>
			</div>
			<div class="flex-lp">
				<label for="">公司名称（必填）：</label>
				<input type="text" placeholder="请输入您的公司名称" name="companyName" oninput="checkVal(this)">
				<p class="red info">公司名称不可少于5个字，请修改</p>
			</div>
			<div class="flex-lp">
				<label for="">电商所属行业：</label>
				<input type="text" placeholder="请输入电商所属行业" name="industry" oninput="checkVal(this)" >
				<p class="red info">请输入电商所属行业</p>
			</div>
			<div class="flex-lp">
				<label for="">预计建站数量：</label>
				<input type="text" placeholder="请输入预计建站数量" name="count" oninput="checkVal(this)" onkeyup="replaceNum(this)">
				<p class="red info">请输入预计建站数量</p>
				<p class="red error">请输入正确的建站数量</p>
			</div>
			<div class="flex-lp">
				<label for="">联系人：</label>
				<input type="text" placeholder="请输入联系人" name="name" oninput="checkVal(this)">
				<p class="red info">请输入联系人</p>	
			</div>
			<div class="flex-lp">
				<label for="">电话：</label>
				<input type="text" placeholder="请输入您的电话" name="phone" oninput="checkVal(this)" onkeyup="replaceNum(this)">
				<p class="red info">请输入电话</p>	
			</div>
			<div class="flex-lp">
				<label for="">您对建站了解程度：</label>
				<span>
					<input type="radio" name="type" value="1" checked>新手
				</span>
				<span>
					<input type="radio" name="type" value="2">了解
				</span>
				<span>
					<input type="radio" name="type" value="3">资深
				</span>
			</div>
			<div class="flex-lp">
				<button onclick="submitInfo()">提交</button>
			</div>
		</div>
	</div>
    <div class="mask-success">
		<div class="kuang">
			<img src="images/bingo.png" alt="">
			<p class="p1">提交成功</p>
			<p class="p2">我们的专业对接经理将会尽快联系您！</p>
			<button onclick="closeKuang()">知道了</button>
		</div>
	</div>
	`
	$("body").append(loginHtml)
}


function replaceNum (obj) {
	var c = $(obj)
	if(/[^\d]/.test(c.val())){
		var temp= c.val().replace(/[^\d]/g,'');
		$(obj).val(temp);
	}
}