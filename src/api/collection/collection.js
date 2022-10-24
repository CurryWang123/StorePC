import {request} from '@/axios/index'

/**搜索收藏夹*/
export function selectColletions(param)
{
    return request({
        url:'/collection/selectColletions',
        params:{
            uid:param
        }
    })
}

/**删除收藏夹*/
export function deleteCollection(param)
{
    return request({
        url:'/collection/deleteCollection',
        params:{
            collectId:param
        }
    })
}

/**添加收藏夹*/
export function addCollection(data)
{
    return request({
        url:'/collection/addCollection',
        method:'post',
        data:data
    })
}