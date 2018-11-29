/*
* @Author: Pace
* @Date:   2018-11-26 20:54:01
* @Last Modified by:   Pace
* @Last Modified time: 2018-11-26 22:27:36
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
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'user-center'
		});
		//加载用户信息
		this.loadUserInfo();
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
	}
	
}
//调用初始化方法
$(function(){
	page.init();
});