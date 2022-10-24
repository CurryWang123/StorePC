import {request} from '@/axios/index'

 /**
     * 新增评价
     */
export function addAvaluate(data)
{
    return request({
        url:'/evaluate/addAvaluate',
        method:'post',
        data:data
    })
}