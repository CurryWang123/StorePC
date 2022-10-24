import {request} from '@/axios/index'

/**根据uid获取地址列表*/
export function getAddressByUid(param)
{
    return request({
        url:'/addresses/getByUid',
        params:{
            'uid':param
        }
    })
}

/**
     * 更新地址信息
     */
export function updateAddress(data)
{
    return request({
        url:'/addresses/updateAddress',
        method:'post',
        data:data
    })
}

/**删除地址*/
export function deleteAddress(param)
{
    return request({
        url:'/addresses/delete',
        params:param
    })
}

   /**用户添加地址*/
export function addNewAddress(data)
{
    return request({
        url:'/addresses/add_new_address',
        method:'post',
        data:data
    })
}

 /**设置默认地址*/
 export function setDefault(param)
 {
    return request({
        url:'/addresses/set_default',
        params:param
    })
 }

 /**
     * 根据aid获取详情
     */
export function findByAid(param)
{
    return request({
        url:'/addresses/findByAid',
        params:{
            "aid":param
        }
    })
}