/*
* @Author: S1
* @Date:   2018-11-21 17:11:36
* @Last Modified by:   Pace
* @Last Modified time: 2018-11-27 16:04:02
*/

// var $ = require('jquery');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
require('util/slider/index.js');
var templateBanner =  require('./banner.string');
var navSide =  require('page/common/nav-side/index.js');
var _eb = require('util/eb.js');

$(function(){
	//渲染banner的html
	var bannerHtml  = _eb.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //初始化banner
	var $slider = $('.banner').unslider({
		dots : true
	});
	// 前一张和后一张点击事件
	$('.banner-con .banner-arrow').click(function(){
		//判断前还是后
		var forward = $(this).hasClass('prev')? 'prev' : 'next';
		$slider.data('unslider')[forward]();
	});
});
