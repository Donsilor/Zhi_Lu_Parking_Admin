$(function() {
	var leftColumn = $('.left_column');
	var leftColumn_ToggleBtn = $('.left_column > .toggleBtn');
	var box = $('body > .box');
	leftColumn_ToggleBtn.on('click', function() {
		leftColumn.toggleClass('simplify');
		box.toggleClass('simplify');
	});

	var selectDiv_toggleBtn = $('.selectDiv .toggleBtn');
	selectDiv_toggleBtn.on('click', function() {
		var parentsSelectDiv = $(this).parents('.selectDiv');
		if(parentsSelectDiv.hasClass('show')) {
			parentsSelectDiv.removeClass('show');
			parentsSelectDiv.children('ul').slideUp(300);
			parentsSelectDiv.find('.toggleBtn').children('img').css('transform', 'rotate(-90deg)');
		} else {
			parentsSelectDiv.addClass('show');
			parentsSelectDiv.children('ul').slideDown(300);
			parentsSelectDiv.find('.toggleBtn').children('img').css('transform', 'rotate(0)');
		}
	});

	/* 左侧菜单 展开收缩
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * */

	$(".allch").click(function() {
		if($(".allch").is(':checked')) {
			$("input[name='checkbox']").attr("checked", "true");
		} else {
			$("input[name='checkbox']").removeAttr("checked");
		}
	});

	var toggleDiv = $('.toggleDiv');
	$('.ss').click(function() {
		if(toggleDiv.is(':hidden')) {
			toggleDiv.css("display", 'block');
			$(this).find('img').attr('src', 'images/icon_t_arrow2.png');
			$(this).find('span').html('收起搜索');
		} else {
			toggleDiv.css("display", 'none');
			$(this).find('img').attr('src', 'images/icon_b_arrow.png');
			$(this).find('span').html('展开搜索');
		}
	});
	/*
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * */

});


function change(id) {
	var ul = document.getElementById(id);
	var lis = ul.children;
	for(var i = 0; i < lis.length; i++) {
		lis[i].onclick = function() {
			for(var i = 0; i < lis.length; i++) {
				lis[i].className = '';
			}
			this.className = 'current';
		}
	}
}

change('ul'); //左边导航栏事件
//
//弹窗
$(document).ready(function() {
	var topli=$('.boxtop-nav ul li');
	topli.click(function(){
		$(this).addClass('nav-active');
		$(this).siblings('li').removeClass('nav-active');
	});
	
	
	
	$('.add').click(function() {
		$(".main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});
	$('.ck').click(function() {
		$(".main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});

	$('.edit').click(function() {
		$(".main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});

	$('.modify').click(function() {
		$(".main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});

	$('.view').click(function() {
		$(".main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});

	//点击删除弹出提示
	$('.delete').click(function() {
		$(".delete_prompt").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});

	$('.import').click(function() {
		$(".import-main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});

	$('.RenewalExtension').click(function() {
		$(".main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});
	$('.bj').click(function() {
		$(".main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});
	$('.fees').click(function() {
		$(".main1").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});
	$('.registration').click(function() {
		$(".main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});
	$('.nonreg').click(function() {
		$(".nonreg-main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});
	$('.plechoose').click(function() {
		$(".vehreg-main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});
	$('.choose-equ').click(function() {
		$(".traffic-main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});

	$('.choose-equ').click(function() {
		$(".traffic-main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});

	$('.ap-choose').click(function() {
		$(".ap-main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});

	$('.bj').click(function() {
		$(".main").show();
		$('.depwd').draggable({
			handle: "div.top-nav"
		}, {
			containment: "parent"
		}); //控制弹窗出现和限制拖拽范围
	});
	$(".close").click(function() {
		$(".main").hide(); //关闭弹窗
		$(".import-main").hide(); //关闭弹窗
		$(".nonreg-main").hide();
	});
	$(".qx").click(function() {
		$(".main").hide(); //关闭弹窗
		$(".delete_prompt").hide(); //关闭弹窗
		$(".nonreg-main").hide();
		$(".vehreg-main").hide(); //关闭弹窗    
	});

	$(".qr").click(function() {
		$(".main").hide(); //关闭弹窗
		$(".nonreg-main").hide();
		$(".vehreg-main").hide(); //关闭弹窗
	});
	$(".v-close").click(function() {
		$(".vehreg-main").hide(); //关闭弹窗
	});
	$(".v-qx").click(function() {
		$(".vehreg-main").hide(); //关闭弹窗
	});
	$(".v-qr").click(function() {
		$(".vehreg-main").hide(); //关闭弹窗
	});
	$(".v-choose").click(function() {
		$(".vehreg-main").hide(); //关闭弹窗
	});
	$(".traffic-qx").click(function() {
		$(".traffic-main").hide(); //关闭弹窗
	});
	$(".traffic-qr").click(function() {
		$(".traffic-main").hide(); //关闭弹窗
	});
	$(".traffic-close").click(function() {
		$(".traffic-main").hide(); //关闭弹窗
	});

	$(".ap-clear").click(function() {
		$(".ap-main").hide(); //关闭弹窗
	});
	$(".ap-search").click(function() {
		$(".ap-main").hide(); //关闭弹窗
	});
	$(".choose-parkingnumber").click(function() {
		$(".ap-main").hide(); //关闭弹窗
	});
	$(".ap-close").click(function() {
		$(".ap-main").hide(); //关闭弹窗
	});
	$(".fees-close").click(function() {
		$(".main1").hide(); //关闭弹窗
	});
	$(".fees-save").click(function() {
		$(".main1").hide(); //关闭弹窗
	});
	$(".fees-add").click(function() {
		$(".main1").hide(); //关闭弹窗
	});

	$(".upload").click(function() {
		$(".import-main").hide(); //关闭弹窗
	});

	$(".choose-hover").click(function() {
		$(".vehreg-main").hide(); //关闭弹窗
	});

});

//验证弹窗里面input输入的信息
// 验证电话号码
function isPhoneNo(phone) {
	var pattern = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;
	return pattern.test(phone);
}

//验证手机号码
function isMobileNo(mobile) {
	var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;
	return pattern.test(mobile);
}

// 验证密码
function isPhoneNo(psw) {
	var pattern = /^[a-zA-Z0-9]{6,8}$/;
	return pattern.test(psw);
}

function main() {
	var num = 0;
	var user = $(".user").val();
	var psw = $(".psw").val();
	var ppsw = $(".ppsw").val();
	var tel = $.trim($(".tel").val());
	//判断是否输入电话号码
	if(tel.length == 0) {
		$('.telremind').css('display', 'block');
		$(".tel").css('border-color', '#ff0000');
		$(".tel").focus();
	}

	//判断手机号码
	else {
		if(tel.substring(0, 1) == 1) {
			if(isMobileNo(tel) == false) {
				$('.telremind').css('display', 'block');
				$(".tel").css('border-color', '#ff0000');
				$(".tel").focus();
			} else {
				$('.telremind').css('display', 'none');
				$(".tel").css('border-color', '#999');
				num++;
			}
		}
		//判断电话号码
		else if(tel.substring(0, 1) == 0) {
			if(isPhoneNo(tel) == false) {
				$('.telremind').css('display', 'block');
				$(".tel").css('border-color', '#ff0000');
				$(".tel").focus();
			} else {
				$('.telremind').css('display', 'none');
				$(".tel").css('border-color', '#999');
				num++;
			}
		} else {
			$('.telremind').css('display', 'block');
			$(".tel").css('border-color', '#ff0000');
			$(".tel").focus();
		}
	}

	//判断密码
	if(psw.length == 0) {
		$('.pswremind').css('display', 'block');
		$(".psw").css('border-color', '#ff0000');
		$(".psw").focus();
	}
	//判断电话号码是否正确
	else {
		if(isPhoneNo(psw) == false) {
			$('.pswremind').css('display', 'block');
			$(".psw").css('border-color', '#ff0000');
			$(".psw").focus();
		} else {
			$('.pswremind').css('display', 'none');
			$(".psw").css('border-color', '#999');
		}
	}
	//确认密码
	if(ppsw.length == 0) {
		$('.ppswremind').css('display', 'block');
		$(".ppsw").css('border-color', '#ff0000');
		$(".ppsw").focus();
	}
	//判断电话号码是否正确
	else {
		if(isPhoneNo(ppsw) == false) {
			$('.ppswremind').css('display', 'block');
			$(".ppsw").css('border-color', '#ff0000');
			$(".ppsw").focus();
		}
		//判断密码是否一致
		else {
			if(psw == ppsw) {
				$('.ppswremind').css('display', 'none');
				$(".ppsw").css('border-color', '#999');
				num++;
			} else {
				$('.ppswremind').css('display', 'block');
				$(".ppsw").css('border-color', '#ff0000');
				$(".psw").focus();
			}
		}
	}
	if(num == 2) {
		$(".depwd").hide();
	}
}

$(".acknowledgement").on('click', function() {
	main();
}); //回调函数 当button确认被点击的时候触发main（）函数


