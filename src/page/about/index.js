/*
 * @Author: Pace 
 * @Date: 2018-12-01 23:19:17 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-01 23:20:13
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
			name : 'about'
		});
	}
	
}
//调用初始化方法
$(function(){
	page.init();
});