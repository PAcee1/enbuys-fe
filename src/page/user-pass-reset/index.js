/*
* @Author: Pace
* @Date:   2018-11-23 23:04:31
* @Last Modified by:   Pace
* @Last Modified time: 2018-11-25 22:47:38
*/
'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _eb = require('util/eb.js');
var _user = require('service/user-service.js');

//表单中错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text();
	}
};

//page 逻辑部分
var page = {
	data:{
		username : '',
		question : '',
		answer : '',
		token : ''
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	//页面一加载便执行的事件
	onLoad : function(){
		//显示第一步
		this.loadStepUsername();
	},
	//初始化信息绑定事件
	bindEvent: function(){
		var _this = this;
		//用户名下一步按钮点击
		$('#submit-username').click(function(){
			_this.submitUsername();
		});
		// 输入密码提示问题答案中的按钮点击
        $('#submit-question').click(function(){
			_this.submitQuestion();
		});
		//输入新密码后下一步按钮点击
		$('#submit-password').click(function(){
			_this.submitPassword();
		});
		//用户敲击回车触发事件
		$('.input-default').keyup(function(e){
			//13为回车键,并且判断元素是否显示
			if(e.keyCode === 13 && !$('.step-username').is(':hidden')){
				_this.submitUsername();
			}
			if(e.keyCode === 13 && !$('.step-question').is(':hidden')){
				_this.submitQuestion();
			}
			if(e.keyCode === 13 && !$('.step-password').is(':hidden')){
				_this.submitPassword();
			}
		});
	},
	submitUsername : function(){
		var _this = this;
		var username = $('#username').val();
		if(username){
			//如果不为空，调用接口，获取Question
			_user.getQuestion(username,function(res){
				_this.data.username = username;
				_this.data.question = res;
				//_this.loadStepQuestion();
				_this.loadStepQuestion();
			},function(errMsg){
				formError.show(errMsg);
			})
		}else{
			formError.show('请输入用户名');
		}
	},
	submitQuestion : function(){
		var _this = this;
        var answer = $.trim($('#answer').val());
        // 密码提示问题答案存在
        if(answer){
            // 检查密码提示问题答案
            _user.checkAnswer({
                username : _this.data.username,
                question : _this.data.question,
                answer   : answer
            }, function(res){
                _this.data.answer   = answer;
                _this.data.token    = res;
                _this.loadStepPassword();
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 用户名不存在
        else{
            formError.show('请输入密码提示问题答案');
        }
    },
	submitPassword : function(){
		var _this = this;
		var password = $('#password').val();
		//密码提示问题存在
		if(password && password.length >= 6){
			//修改密码的提交
			_user.resetPassword({
				username : _this.data.username,
                newPassword : password,
                forgetToken   : _this.data.token
			},function(res){
				window.location.href = './result.html?type=pass-reset';
			},function(errMsg){
				//window.location.href = './result.html?type=pass-reset';
				formError.show(errMsg);
			});

		}else{
			formError.show('请输入不少于6位的新密码');
		}
	},
	//加载输入用户名的一步
	loadStepUsername : function(){
		$('.step-username').show();
	},
	//加载密码提示问题的一步
	loadStepQuestion : function(){
		//隐藏上一步的错误信息
		formError.hide();
		//做容器切换
		$('.step-username').hide().siblings('.step-question')
			.show().find('.question').text(this.data.question);
	},
	//加载输入密码的一步
	loadStepPassword : function(){
		//隐藏上一步的错误信息
		formError.hide();
		//做容器切换
		$('.step-question').hide().siblings('.step-password').show();
	}

}
//调用初始化方法
$(function(){
	page.init();
});