/*
* @Author: Pace
* @Date:   2018-11-26 23:23:16
* @Last Modified by:   Pace
* @Last Modified time: 2018-11-26 23:41:15
*/
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide =  require('page/common/nav-side/index.js');
var _eb = require('util/eb.js');
var _user = require('service/user-service.js');

//page 逻辑部分
var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'user-pass-update'
		});
	},
	bindEvent : function(){
		var _this = this;
		//事件冒泡,点击提交按钮后的操作
		$(document).on('click','.btn-submit',function(){
			//获取属性
			var userInfo = {
				passwordOld : $.trim($('#password').val()),
				passwordNew : $.trim($('#passwordNew').val()),
				passwordConfirm : $.trim($('#passwordConfirm').val())
			},
			//验证字段信息
			validateResult = _this.formValidate(userInfo);
			if(validateResult.status){
				//更改用户密码
				_user.updatePassword({
					passwordOld : userInfo.passwordOld,
					passwordNew : userInfo.passwordNew
				},function(res,msg){
					_eb.successTips(msg);
					window.location.href = './user-center.html';
				},function(errMsg){
					_eb.errorTips(errMsg);
				});
			}else{
				_eb.errorTips(validateResult.msg);
			}
		})
	},
	//表单验证
	formValidate : function(formData){
		//初始化数据
		var result = {
			status : false,
			msg : ''
		};
		if(!_eb.validate(formData.passwordOld, 'require')){
			result.msg = '密码不能为空';
			return result;
		}
		// 验证新密码长度
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '密码长度不得少于6位';
            return result;
        }
        // 验证两次输入的密码是否一致
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
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