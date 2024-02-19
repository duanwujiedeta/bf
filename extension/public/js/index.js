$(function(){
    $(window).scroll(function(){
        let s_height = $(window).scrollTop();
        let height = $(this).height() + $(this).scrollTop()

        if(s_height <= height){
            $("#top_btn").show();
        }

		if ($('.website-advantage ul li:eq(0)').offset().top < height) {
			$('.website-advantage ul li:eq(0)').addClass('animate__bounceInLeft');
		} else {
			$('.website-advantage ul li:eq(0)').removeClass('animate__bounceInLeft');
		}
		if ($('.website-advantage ul li:eq(1)').offset().top < height) {
			$('.website-advantage ul li:eq(1)').addClass('animate__bounceInRight');
		} else {
			$('.website-advantage ul li:eq(1)').removeClass('animate__bounceInRight');
		}
		if ($('.website-advantage ul li:eq(2)').offset().top < height) {
			$('.website-advantage ul li:eq(2)').addClass('animate__bounceInLeft');
		} else {
			$('.website-advantage ul li:eq(2)').removeClass('animate__bounceInLeft');
		}
		if ($('.website-advantage ul li:eq(3)').offset().top < height) {
			$('.website-advantage ul li:eq(3)').addClass('animate__bounceInRight');
		} else {
			$('.website-advantage ul li:eq(3)').removeClass('animate__bounceInRight');
		}
		if ($('.website-advantage ul li:eq(4)').offset().top < height) {
			$('.website-advantage ul li:eq(4)').addClass('animate__bounceInLeft');
		} else {
			$('.website-advantage ul li:eq(4)').removeClass('animate__bounceInLeft');
		}
		// if ($('.success-case').offset().top < height) {
		// 	$('.success-case').addClass('animate__rotateInDownLeft');
		// } else {
		// 	$('.success-case').removeClass('animate__rotateInDownLeft');
		// }
		
		
		// if ($(".fine-template").offset().top < height) {
		// 	$(".fine-template").addClass('animate__rotateInDownRight');
		// } else {
		// 	$(".fine-template").removeClass('animate__rotateInDownRight');
		// }

		// if ($(".cooperation-partner").offset().top < height) {
		// 	$(".cooperation-partner").addClass('animate__rotateInDownLeft');
		// } else {
		// 	$(".cooperation-partner").removeClass('animate__rotateInDownLeft');
		// }

		// if ($(".immediately-start").offset().top < height) {
		// 	$(".immediately-start").addClass('animate__rotateInDownRight');
		// } else {
		// 	$(".immediately-start").removeClass('animate__rotateInDownRight');
		// }
		
		if ($("header").offset().top < height) {
			$("header").hide()
			$(".header").show()
		}

		if ($(document).scrollTop()<=0){
			$("header").show()
			$(".header").hide()
            $("#top_btn").hide();
		}
    })
    $("#top_btn").click(function(){
		$("html,body").animate({scrollTop: 0}, 600);
	});
    var swiper = new Swiper('.swiper-container-recently', {
        slidesPerView: 2,
        spaceBetween: 24,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
	$(".cooperation-partner ul li").click(function() {
		$(this).addClass("active").siblings().removeClass('active');
		$("div.off-div").hide().eq($(this).index()).show();
	});

    // 首屏背景视频
   /*  var bv = new Bideo();
    bv.init({
        // Video元素
        videoEl: document.querySelector('#background_video'),
        // 容器元素
        container: document.querySelector('#banner'),
        // 自适应调整
        resize: true,
        // autoplay: false,
        isMobile: window.matchMedia('(max-width: 768px)').matches,
        playButton: document.querySelector('#play'),
        pauseButton: document.querySelector('#pause'),
        // 加载视频源, 根据实际业务更换自己的视频源文件
        src: [
            {
                src: './images/shutterstock_12702443.mov',
                type: 'video/mp4'
            }
        ],
    
        // 一旦视频加载后即将视频封面隐藏
        onLoad: function () {
            document.querySelector('#video_cover').style.display = 'none';
        }
    }); */

    //开始建站箭头hover
    $(".website-advantage ul li a").hover(function(){
        $(this).find("img").attr("src","./images/arrow-hover.jpg");
    },function(){
        $(this).find("img").attr("src","./images/arrow-default.jpg");
    });
})

function scrollElement (str) {
    let eleTop = $(str).offset().top - 150
    $("html,body").stop().animate({scrollTop:eleTop},600);
}

// function freeRegister (obj) {
//     let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
//     if ($(obj).siblings().val() == '') {
//         alert("请输入邮箱")
//         return false
//     }
//     if (!reg.test($(obj).siblings().val())) {
//         alert("您输入的邮箱不正确")
//         return false
//     }
// }

