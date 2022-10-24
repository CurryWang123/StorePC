import {pageOrderListItem} from '@/api/order/order.js'
export default{
    namespaced:true,
    mutations:{
        GetPageOrderList(state,data)
        {
            state.pageOrderList = data
        }
    },
    actions:{
        async getPageOrderList(context,data){
            let res = await pageOrderListItem(data)
            if(res.data.state === 200)
            {
                context.commit('GetPageOrderList',res.data.data)
            }
            return res.data.data
        }
    },
    state:{
        pageOrderList:[]
    }
}