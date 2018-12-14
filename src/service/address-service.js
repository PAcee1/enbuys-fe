/*
 * @Author: Pace 
 * @Date: 2018-11-29 23:15:47 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-14 22:33:41
 */
var _eb = require('util/eb.js');

var _address = {
    // 获取购物车数量
    getAddressList : function(resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myShipping/list.do'),
            //url : "http://localhost:8080/myShipping/list.do",
            data : {
                pageSize : 50,
            },
            success : resolve,
            error   : reject
        });
    },
    // 新建收货地址
    save : function(addressInfo,resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myShipping/add.do'),
            //url : "http://localhost:8080/myShipping/add.do",
            data : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 修改收货地址
    update : function(addressInfo,resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myShipping/update.do'),
            //url : "http://localhost:8080/myShipping/update.do",
            data : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    //获取地址详细信息
    getAddress : function(shippingId,resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myShipping/select.do'),
            //url : "http://localhost:8080/myShipping/select.do",
            data : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    //删除地址
    deleteAddress : function(shippingId,resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myShipping/delete.do'),
            //url : "http://localhost:8080/myShipping/delete.do",
            data : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    }

}
module.exports = _address;