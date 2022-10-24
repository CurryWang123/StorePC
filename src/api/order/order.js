import {request} from '@/axios/index'

// 创建订单
export function create(data)
{
    return request({
        url:'/orders/create',
        method:'post',
        data:data
    })
}

/**
     * 分页查询订单
 */
export function pageOrderList(data)
{
    return request({
        url:'/orders/pageOrderList',
        method:'post',
        data:data
    })
}

/**
* 分页查询订单及其商品列表
 */
export function pageOrderListItem(data)
{
    return request({
        url:'/orders/pageOrderListItem',
        method:'post',
        data:data
    })
}

/**
     * 查询指定订单及其商品列表
     */
export function getOrderListItem(data)
{
    return request({
        url:'/orders/getOrderListItem',
        method:'post',
        data:data
    })
}

/**
     * 更新订单状态
     */
export function updateOrderStatus(data)
{
    return request({
        url:'/orders/updateOrderStatus',
        method:'post',
        data:data
    })
}