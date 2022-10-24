import {request} from '@/axios/index'

// 获取购物车列表
export function getVOByUid(param)
{
    return request({
      url:'/carts/getVOByUid',
      params:{
        'uid':param
      }
    })
} 

// 修改购物车数量
export function updateNumByCid(data)
{
  return request({
    url:'/carts/updateNumByCid',
    data:data,
    method:'post'
  })
}

// 删除购物车
export function deleteCart(data)
{
  return request({
    url:'/carts/deleteCart',
    data:data,
    method:'post'
  })
}

// 加入购物车
export function addToCart(data)
{
  return request({
    url:'/carts/add_to_cart',
    data:data,
    method:'post'
  })
}

//    根据cids字符串查询购物车列表
export function getVOByCids(param)
{
  return request({
    url:'/carts/getVOByCids',
    params:{
      cids:param
    }
  })
}