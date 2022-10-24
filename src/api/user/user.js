import {request} from '@/axios/index'

// 注册
export function reg(data){
    return request({
        url:'/user/reg',
        data:data,
        method:'post'
    })
}

// 用户名密码登录
export function login(data){
    return request({
        url:'/user/login',
        data:data,
        method:'post'
    })
}

// 修改密码
export function changePassword(data)
{
    return request({
        url:'/user/changePassword',
        data:data,
        method:'post'
    })
}

// 上传头像
export function changeAvatar(data)
{
    return request({
        url:'/users/change_avatar',
        method:'post',
        data:data
    })
}
// 根据uid获取用户数据
export function getByUid(data)
{
    return request({
        url:'/users/get_by_uid',
        data:data,
        method:'post'
    })
}

// 修改个人信息
export function changeInfo(data)
{
    return request({
        url:'/users/change_info',
        data:data,
        method:'post'
    })
}

// 退出登录
export function logout()
{
    return request({
        url:'/user/logout'
    })
}

// 获取手机验证码
export function getCode(param)
{
    return request({
        url:'/user/getCode',
        params:{
            phone:param
        }
    })
}

// 手机号登录
export function loginByCode(data)
{
    return request({
        url:'/user/loginByCode',
        method:'post',
        data:data,
        headers:{
            "Content-Type" : "multipart/form-data"
        }
    })
}