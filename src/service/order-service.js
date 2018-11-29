/*
 * @Author: Pace 
 * @Date: 2018-11-29 21:25:37 
 * @Last Modified by: Pace
 * @Last Modified time: 2018-11-29 23:22:29
 */
var _eb = require('util/eb.js');

var _order = {
    // 获取订单商品详细信息
    getProductList : function( resolve, reject){
        _eb.request({
            //url     : _eb.getServerUrl('/product/list.do'),
            url : "http://localhost:8081/myOrder/getOrderCartProduct.do",
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _order;