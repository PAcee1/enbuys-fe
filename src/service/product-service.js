/*
* @Author: Pace
* @Date:   2018-11-27 16:13:42
 * @Last Modified by: Pace
 * @Last Modified time: 2018-12-14 22:39:54
*/
var _eb = require('util/eb.js');

var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myProduct/list.do'),
            //url : "http://localhost:8080/myProduct/list.do",
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _eb.request({
            url     : _eb.getServerUrl('/myProduct/detail.do'),
            //url : "http://localhost:8080/myProduct/detail.do",
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;