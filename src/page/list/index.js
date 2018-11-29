/*
* @Author: Pace
* @Date:   2018-11-27 16:09:13
* @Last Modified by:   Pace
* @Last Modified time: 2018-11-27 20:59:34
*/
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var templateIndex =  require('./index.string');
var _product = require('service/product-service.js');
var Pagination      = require('util/pagination/index.js');
var _eb = require('util/eb.js');

var page = {
	//定义全局参数
	data : {
		listParam : {
			keyword : _eb.getUrlParam('keyword') || '',
			categoryId : _eb.getUrlParam('categoryId') || '', 
			orderBy : _eb.getUrlParam('orderBy') || 'default',
			pageNum : _eb.getUrlParam('pageNum') || 1,
			pageSize : _eb.getUrlParam('pageSize') || 10
		}
	},
	//页面一加载便初始化
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad :function(){
		this.loadList();
	},
	bindEvent : function(){
		var _this = this;
		//排序点击事件
		$('.sort-item').click(function(){
			//封装$this
			 var $this = $(this);
			 //页码置为1
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if($this.data('type') === 'default'){
                // 已经是active样式
                if($this.hasClass('active')) {
                    return;
                }
                // 其他
                else{ //删除active asc desc属性，并设置排序为默认排序
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if($this.data('type') === 'price'){
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                // 升序、降序的处理
                if(!$this.hasClass('asc')){//升序，删除降序添加升序
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
		});
	},
	//加载list，从接口中拿数据
	loadList : function(){
		var _this = this,
			listParam = this.data.listParam,
			listHtml = '',
			$pListCon   = $('.p-list-con');
		//先加载
		$pListCon.html('<div class="loading"></div>');
		// 删除参数中不必要的字段
        listParam.categoryId 
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        //请求接口，获取数据
		_product.getProductList(listParam,function(res){
			//成功返回，渲染html
			listHtml = _eb.renderHtml(templateIndex,{
				list : res.list
			});
			//将渲染后的html放入容器
			$pListCon.html(listHtml);
			//前端分页
			 _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
		},function(errMsg){
			//返回失败，弹窗提示错误信息
			_eb.errorTips(errMsg);
		})
	},
	//加载分页信息
	loadPagination : function(pageInfo){
		var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
	}
};
$(function(){
	page.init();
});