/*
 * @Author: Pace 
 * @Date: 2018-11-30 21:13:48 
 * @Last Modified by: Pace
 * @Last Modified time: 2019-01-03 21:52:47
 */
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide =  require('page/common/nav-side/index.js');
var _eb = require('util/eb.js');
var Pagination      = require('util/pagination/index.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

//page 逻辑部分
var page = {
    data : {
        listParam : {
            pageNum : 1,
            pageSize : 5
        }
    },
	init : function(){
        this.onLoad();
        this.bindEvent();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'order-list'
		});
		//加载订单List
		this.loadOrderList();
    },
    bindEvent : function(){
        var _this = this;
           
        //取消订单
        $(document).on('click','.cancel-order',function(){
            orderNo = $(this).parents('.order-item').data('order-no');
            _order.cancelOrder(orderNo,function(res){
				//成功打开modal窗口
                _eb.successTips('该订单取消成功');
                _this.loadOrderList();
			},function(errMsg){
				_eb.errorTips(errMsg);
			});
        });
        //确认收货
        $(document).on('click','.confirm-order',function(){
           alert('尚未开发，请等待');
        });
    },
	//加载订单信息
	loadOrderList : function(){
        var _this = this, 
            $listCon = $('.content.with-nav');
            orderListHtml = '';
        $listCon.html('<div class="loading"></div>');
		_order.getOrderList(this.data.listParam,function(res){
            //数据过滤
            _this.dataFilter(res);
            //渲染
			orderListHtml = _eb.renderHtml(templateIndex,res);
            $listCon.html(orderListHtml);
            //判断订单支付状态，已取消的订单移除active
            //加载分页信息
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage        : res.prePage,
                hasNextPage    : res.hasNextPage,
                nextPage       : res.nextPage,
                pageNum        : res.pageNum,
                pages          : res.pages
            });
		},function(errMsg){//失败返回错误信息
			$listCon.html('<p class="err-tip">订单加载失败，请联系管理员！</p>')
		})
    },
    //数据适配,判断订单是否关闭
    dataFilter : function (data) {
        var _list = data.list;
        for(var i = 0,length = _list.length;i<length;i++){
            if(_list[i].status == 0){ // 订单已取消，需要修改样式
                _list[i].isCancel = true;
            }
            if(_list[i].status == 20){ // 订单成功支付，修改按钮
                _list[i].isPay = true;
            }
        }
    },
    // 加载分页信息
    loadPagination: function (pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container   : $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
	
}
//调用初始化方法
$(function(){
	page.init();
});