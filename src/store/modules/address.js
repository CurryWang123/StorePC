import {getAddressByUid} from '@/api/address/address.js'
export default{
    namespaced:true,
    mutations:{
        GetAddressList(state,data)
        {
            state.addressList = data
        }
    },
    actions:{
        async getAddressList(context,param)
        {
            let res = await getAddressByUid(param)
            if(res.data.state === 200)
            {
                context.commit('GetAddressList',res.data.data)
            }
        }

    },
    state:{
        addressList:[]
    }
}