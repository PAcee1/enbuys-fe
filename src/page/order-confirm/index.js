/*
 * @Author: Pace 
 * @Date: 2018-11-29 21:23:38 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-20 16:35:23
 */
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('page/common/nav/index.js');
require('page/distpicker/dist/distpicker.js');
require('./index.css');
var templateAddress =  require('./address-list.string');
var templateProduct =  require('./product-list.string');
var _product = require('service/product-service.js'); 
var _address = require('service/address-service.js'); 
var _order = require('service/order-service.js');
var addressModal = require('./address-modal.js');
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
			$('.sb-final-district').html($(this).find('.district').html());
            $('.sb-final-detail').html($(this).find('.personal-detail').html());
            $('.sb-final-name').html($(this).find('.name').html());
            $('.sb-final-phone').html($(this).find('.phone-number').html());
		});
		//订单的提交按钮
		$(document).on('click','#create-order',function(){
			//判断地址是否存在
			var shippingId = _this.data.selectedAddressId;
			if(shippingId){
				//验证成功,生成订单
				_order.createOrder({
					shippingId : shippingId
				},function(res){
					window.location.href = './payment.html?orderNumber='+res.orderNo;
				},function(errMsg){
					_eb.errorTips(errMsg);
				})
			}else{
				_eb.errorTips('请选择地址后提交');
			}
		});
        //地址的添加
		$(document).on('click','.address-add',function(){
			addressModal.show({
				isUpdate : false,
				onSuccess : function(){
					_this.loadAddressList();
				}
			});
		});
		//地址的修改，需要回显数据
		$(document).on('click','.address-update',function(e){
			//禁止事件冒泡
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId,function(res){
				//成功打开modal窗口
				addressModal.show({
					isUpdate : true,
					data : res,
					onSuccess : function(){
						_this.loadAddressList();
					}
				});
			},function(errMsg){
				_eb.errorTips(errMsg);
			});			
		});
		//删除地址
		$(document).on('click','.address-delete',function(e){
			//禁止事件冒泡
			e.stopPropagation();
			var id = $(this).parents('.address-item').data('id');
			//询问是否要删除改地址
			if(window.confirm('确认要删除该地址吗')){
				_address.deleteAddress(id,function(res){
					//成功重新加载列表
					_this.loadAddressList();
				},function(errMsg){
					_eb.errorTips(errMsg);
				});			
			}

		});
	},
	//加载地址列表
	loadAddressList : function(){
		var _this = this;
		//loading
		$('.address-con').html('<div class="loading"></div>');
		//获取地址列表
		_address.getAddressList(function(res){
			_this.addressFilter(res);
            var addressListHtml = _eb.renderHtml(templateAddress,res);
			$('.address-con').html(addressListHtml);
		},function(errMsg){
			$('.address-con').html('<p class="err-tip">地址加载失败，请联系管理员！</p>')
		});
	},
	//处理地址列表中选择状态
	addressFilter : function(data){
		//判断是否存在此Id
		if(this.data.selectedAddressId){
			var selectedAddressIdFlag = false;
			for(var i = 0,length = data.list.length;i<length;i++){
				if(data.list[i].id === this.data.selectedAddressId){
					data.list[i].isActive = true;
					selectedAddressIdFlag = true;
				}
			};
			//如果以前选中的地址不在列表(被删除)，将id删除
			if(!selectedAddressIdFlag){
				this.data.selectedAddressId = null;
			}

		}
	},
    //加载商品
	loadProductList : function(){
		var _this = this;
		//loading
		$('.product-con').html('<div class="loading"></div>');
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
	}
	
};
$(function(){
	page.init();
});