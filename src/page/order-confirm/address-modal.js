/*
 * @Author: Pace 
 * @Date: 2018-11-30 12:04:59 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-11-30 20:34:16
 * 添加/修改地址
 */
var templateAddressModal =  require('./address-modal.string');
var _address = require('service/address-service.js'); 
var _eb = require('util/eb.js');

var addressModal = {
	show : function(option){
        // option绑定
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap');
        //渲染页面
        this.loadModal();
        //绑定事件
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        //提交收货地址
        this.$modalWrap.find('.submit-save-address').click(function(){
            var receiverInfo = _this.getReceiverInfo(), //获取收件人信息
                isUpdate = _this.option.isUpdate;
            //添加新地址，且验证通过
            if(!isUpdate && receiverInfo.status){
                _address.save(receiverInfo.data,function(res){
                    _eb.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function'
                        && _this.option.onSuccess(res);
                },function(errMsg){
                    _eb.errorTips(errMsg);
                })
            }
            //更新收件人，并验证通过
            else if(isUpdate && receiverInfo.status){
                _address.update(receiverInfo.data,function(res){
                    _eb.successTips('地址修改成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function'
                        && _this.option.onSuccess(res);
                },function(errMsg){
                    _eb.errorTips(errMsg);
                });
            }else{
                _eb.errorTips(receiverInfo.errMsg || '出问题了');
            }
        });
        //点X或空白区关闭弹窗
        this.$modalWrap.find('.close').click(function(){
            _this.hide();
        });
        //防止modal关闭事件冒泡
        this.$modalWrap.find('.modal-contaniner').click(function(e){
            e.stopPropagation();
        });
    },
    loadModal : function(){
        //渲染页面
        var addressModalHtml = _eb.renderHtml(templateAddressModal,{
            isUpdate : this.option.isUpdate,
            data : this.option.data
        });
        //放入html
        this.$modalWrap.html(addressModalHtml);
        //加载省份,城市，区县，使用distpicker组件
        $('#linkage').distpicker();
        
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
        if(this.option.isUpdate){
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
    },
    //关闭弹窗
    hide: function(){
        this.$modalWrap.empty();
    }
};
module.exports = addressModal;