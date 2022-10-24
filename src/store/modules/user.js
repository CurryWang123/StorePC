import { login, reg ,getByUid,loginByCode } from "@/api/user/user"

export default {
    namespaced:true,
    mutations:{
        UserLogin(state,data){
            state.userInfo = data.userInfo
            let user = JSON.stringify(state.userInfo)
            let token = JSON.stringify(data.token)
            localStorage.setItem('userInfo',user)
            sessionStorage.setItem('token',token)
        },
        UserLoginByCode(state,data){
            state.userInfo = data.userInfo
            let user = JSON.stringify(state.userInfo)
            let token = JSON.stringify(data.token)
            localStorage.setItem('userInfo',user)
            sessionStorage.setItem('token',token)
        },
        LoginOut(state){
            state.userInfo = {
                username:'游客',
                uid:'',
                password:'',
                phone:'',
                email:'',
                avatar:'',
                gender:0
            }
            let user = JSON.stringify(state.userInfo)
            localStorage.setItem('userInfo',user)
            sessionStorage.removeItem('token')
        },
        GetByUid(state,data)
        {
            state.userInfo = data
            let user = JSON.stringify(state.userInfo)
            localStorage.setItem('userInfo',user)
        }
    },
    actions:{
        async userLogin(context,data)
        {
            let res = await login(data)
            if (res.data.state == 200)
            {
                context.commit('UserLogin',res.data.data)
            }
            return res.data
        },
        async userLoginByCode(context,data)
        {
            let res = await loginByCode(data)
            if (res.data.state == 200)
            {
                context.commit('UserLoginByCode',res.data.data)
            }
            return res.data
        },
        async register(context,data)
        {
            let res = await reg(data)
            return res.data
        },
        async getUserByUid(context,data)
        {
            let res = await getByUid(data)
            if (res.data.state == 200)
            {
                context.commit('GetByUid',res.data.data)
            }
            return res.data.data
        }
         },
    state:{
        userInfo:{
            username:'游客',
            uid:'',
            password:'',
            phone:'',
            email:'',
            avatar:'',
            gender:0
        }
    }
}
