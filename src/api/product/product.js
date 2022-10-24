import {request} from '@/axios/index'

// 获取热销榜单前四名
export function findHotList()
{
    return request({
        url:'/product/hot_list'
    })
}

// 获取商品详情
export function getProductById(param)
{
    return request({
        url:'/product/'+param+'/details'
    })
}

// 查询最新到货的商品
export function findProductsNew()
{
    return request({
        url:'/product/findProductsNew'
    })
}

// 获取商品级联选择器
export function getProductCascader()
{
    return request({
        url:'/product/getProductCascader'
    })
}

// 分页查询商品列表
export function getPageProductList(data)
{
    return request({
        url:'/product/pageProductList',
        data:data,
        method:'post'
    })
}

// 查询所有的商品类型
export function findAllItemType()
{
    return request({
        url:'/products/findAllItemType'
    })
}

















