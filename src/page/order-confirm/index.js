/*
 * @Author: Pace 
 * @Date: 2018-11-29 21:23:38 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-11-30 00:39:46
 */
require('page/common/header/index.js');
require('./index.css');
var templateAddress =  require('./address-list.string');
var templateProduct =  require('./product-list.string');
var _product = require('service/product-service.js'); 
var _address = require('service/address-service.js'); 
var _order = require('service/order-service.js');
var nav = require('page/common/nav/index.js');
var _eb = require('util/eb.js');

var page = {
	//定义全局参数
	data : {
        selectedAddressId : null
	},
	//页面一加载便初始化
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad :function(){
		this.loadAddressList();
		this.loadProductList();
	},
	bindEvent : function(){
		var _this = this;
		//地址的选择
		 $(document).on('click', '.address-item', function(){
            //为其赋上Class信息
            $(this).addClass('active')
            .siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
            //获取省市收件人信息
            $('.sb-final-province').html($(this).find('.province').html());
            $('.sb-final-city').html($(this).find('.city').html());
            $('.sb-final-detail').html($(this).find('.personal-detail').html());
            $('.sb-final-name').html($(this).find('.name').html());
            $('.sb-final-phone').html($(this).find('.phone-number').html());
        });
        
	},
	//加载地址列表
	loadAddressList : function(){
		var _this = this;
		//loading
		/*$pageWrap.html('<div class="loading"></div>')*/
		//获取地址列表
		_address.getAddressList(function(res){
            var addressListHtml = _eb.renderHtml(templateAddress,res);
			$('.address-con').html(addressListHtml);
		},function(errMsg){
			$('.address-con').html('<p class="err-tip">地址加载失败，请联系管理员！</p>')
		});
    },
    //加载商品
	loadProductList : function(){
		var _this = this;
		//loading
		/*$pageWrap.html('<div class="loading"></div>')*/
		//获取订单商品
		_order.getProductList(function(res){
            var productListHtml = _eb.renderHtml(templateProduct,res);
            $('.product-con').html(productListHtml);
            //为订单总价赋值
            $('#final-total-price').html(res.productTotalPrice);
		},function(errMsg){
			$('.product-con').html('<p class="err-tip">商品加载失败，请联系管理员！</p>')
		});	
	},
	
	//处理数据
	filter : function(data){
		data.notEmpty = !!data.cartProductVoList.length;
	},
	//显示错误信息
	showCartError : function(){
		
	}
	
};
$(function(){
	page.init();
});