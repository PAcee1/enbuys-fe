/*
* @Author: pace
* @Date:   2018-11-12 14:33:49
* @Last Modified by:   Pace
* @Last Modified time: 2018-11-26 14:49:15
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
	init : function(){
		this.bindEvent();
	},
	//初始化信息绑定事件
	bindEvent: function(){
		var _this = this;
		//登陆按钮点击
		$('#submit').click(function(){
			_this.submit();
		});
		//如果按下回车，也进行提交
		$('.input-default').keyup(function(e){
			//13为回车键
			if(e.keyCode === 13){
				_this.submit();
			}
		})
	},
	//提交表单
	submit: function(){
		var formData = {
				username : $.trim($('#username').val()),
				password : $.trim($('#password').val())
			},
			//表单验证结果
			validateResult = this.formValidate(formData);
		if(validateResult.status){
			//提交
			_user.login(formData,function(res){
				var url = _eb.getUrlParam('redirect');
				window.location.href = url || './index.html';
			},function(errMsg){
				formError.show(errMsg);
			});
		}else{
			//错误提示
			formError.show(validateResult.msg);
		}
	},
	//表单验证
	formValidate : function(formData){
		//初始化数据
		var result = {
			status : false,
			msg : ''
		};
		if(!_eb.validate(formData.username, 'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_eb.validate(formData.password, 'require')){
			result.msg = '密码不能为空';
			return result;
		}
		//通过验证，返回正确提示
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
}
//调用初始化方法
$(function(){
	page.init();
});