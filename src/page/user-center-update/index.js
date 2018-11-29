/*
* @Author: Pace
* @Date:   2018-11-26 21:01:54
* @Last Modified by:   Pace
* @Last Modified time: 2018-11-26 23:41:11
*/
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide =  require('page/common/nav-side/index.js');
var _eb = require('util/eb.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

//page 逻辑部分
var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'user-center'
		});
		//加载用户信息
		this.loadUserInfo();
	},
	bindEvent : function(){
		var _this = this;
		//事件冒泡,点击提交按钮后的操作
		$(document).on('click','.btn-submit',function(){
			//获取属性
			var userInfo = {
				phone : $.trim($('#phone').val()),
				email : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer : $.trim($('#answer').val())
			},
			//验证字段信息
			validateResult = _this.formValidate(userInfo);
			if(validateResult.status){
				//更改用户信息
				_user.updateUserInfo(userInfo,function(res,msg){
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
	//加载用户信息
	loadUserInfo : function(){
		var userHtml = '';
		_user.getInformation(function(res){
			//判断res里的role
			if(res.role == 0){
				res.level = '普通会员';
			}else{
				res.level = '管理员';
			}
			//成功需要渲染html
			userHtml = _eb.renderHtml(templateIndex,res);
			//将panel-body元素中代码改为userHtml
			$('.panel-body').html(userHtml);
		},function(errMsg){//失败返回错误信息
			_eb.errorTips(errMsg);
		})
	},
	//表单验证
	formValidate : function(formData){
		//初始化数据
		var result = {
			status : false,
			msg : ''
		};
		//验证手机号
		if(!_eb.validate(formData.phone, 'phone')){
			result.msg = '手机号格式不正确';
			return result;
		}
		//验证邮箱
		if(!_eb.validate(formData.email, 'email')){
			result.msg = '邮箱格式不正确';
			return result;
		}
		//验证密码提示问题是否为空
		if(!_eb.validate(formData.question, 'require')){
			result.msg = '密码提示问题不能为空';
			return result;
		}
		//验证密码提示问题答案是否为空
		if(!_eb.validate(formData.answer, 'require')){
			result.msg = '密码提示问题答案不能为空';
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