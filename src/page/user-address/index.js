/*
 * @Author: Pace 
 * @Date: 2018-12-20 15:57:55 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-21 09:59:19
 */
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
require('page/distpicker/dist/distpicker.js');

var templateAddress =  require('./index.string');
var _address = require('service/address-service.js'); 
var navSide =  require('page/common/nav-side/index.js');
var _eb = require('util/eb.js');

//page 逻辑部分
var page = {
    data : {
        isUpdate : false
    },
	init : function(){
        this.$modalWrap = $('.panel-body');
        this.onLoad();
        this.bindEvent();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'user-address'
        });
        this.loadAddressList();
    },
    //加载地址列表
	loadAddressList : function(){
		var _this = this;
		//loading
		$('.panel-body').html('<div class="loading"></div>');
		//获取地址列表
		_address.getAddressList(function(res){
            var addressListHtml = _eb.renderHtml(templateAddress,res);
            $('.panel-body').html(addressListHtml);
            $('#selectadd').distpicker();
		},function(errMsg){
			$('.panel-body').html('<p class="err-tip">地址加载失败，请联系管理员！</p>')
        });
    },
    loadModal : function(isUpdate,data){
        //渲染页面
        var addressModalHtml = _eb.renderHtml(templateAddress,{
            isUpdate : isUpdate,
            data : data
        });
        //放入html
        $('.modal-contaniner').html(addressModalHtml);
        $('#selectadd').distpicker();
    },
    bindEvent : function(){
        var _this = this;
        // 保存修改收货地址
        $(document).on('click','#submit-save-address',function(){
            debugger;
            var receiverInfo = _this.getReceiverInfo(), //获取收件人信息
                isUpdate = _this.data.isUpdate;
            //添加新地址，且验证通过
            if(!isUpdate && receiverInfo.status){
                _address.save(receiverInfo.data,function(res){
                    _eb.successTips('地址添加成功');
                    _this.loadAddressList();
                },function(errMsg){
                    _eb.errorTips(errMsg);
                })
            }
            //更新收件人，并验证通过
            else if(isUpdate && receiverInfo.status){
                _address.update(receiverInfo.data,function(res){
                    _eb.successTips('地址修改成功');
                    _this.loadAddressList();
                },function(errMsg){
                    _eb.errorTips(errMsg);
                });
            }else{
                _eb.errorTips(receiverInfo.errMsg || '出问题了');
            }
        });
        //地址的修改，需要回显数据
		$(document).on('click','.address-update',function(e){
			//禁止事件冒泡
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId,function(res){
				//成功刷新页面lis，并修改isUpdate为true
					_this.data.isUpdate = true;
					_this.loadModal(true,res);
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
                    _eb.successTips('地址删除成功');
					//成功重新加载列表
					_this.loadAddressList();
				},function(errMsg){
					_eb.errorTips(errMsg);
				});			
			}

        });
        // 取消
        $(document).on('click','#submit-cancel-address',function(){
            _this.data.isUpdate = false;
            _this.loadAddressList();
        });
    },
    //获取表单里地址信息，并做表单验证
    getReceiverInfo : function(){
        var receiverInfo = {},
            result = {
                status : false
            };
        //赋值
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = $.trim(this.$modalWrap.find('#receiver-province').val());
        receiverInfo.receiverCity = $.trim(this.$modalWrap.find('#receiver-city').val());
        receiverInfo.receiverDistrict = $.trim(this.$modalWrap.find('#receiver-area').val());
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverPostcode = $.trim(this.$modalWrap.find('#receiver-postcode').val());
        if(this.data.isUpdate){
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val()
        }
        //做验证
        if(!receiverInfo.receiverName){
            result.errMsg = '请输入收件人姓名';
        }else if(!receiverInfo.receiverProvince){
            result.errMsg = '请选择收件人所在省份';
        }else if(!receiverInfo.receiverCity){
            result.errMsg = '请选择收件人所在城市';
        }else if(!receiverInfo.receiverDistrict){
            result.errMsg = '请选择收件人所在地区';
        }else if(!receiverInfo.receiverAddress){
            result.errMsg = '请输入收件人详细地址';
        }else if(!receiverInfo.receiverPhone || !_eb.validate(receiverInfo.receiverPhone, 'phone') ){
            result.errMsg = '请输入11位手机号';
        }//所有验证都通过
        else{
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    }
	
}
//调用初始化方法
$(function(){
	page.init();
});