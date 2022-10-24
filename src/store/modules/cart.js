import {getVOByUid, updateNumByCid,deleteCart, addToCart} from '@/api/cart/cart'
export default {
    namespaced:true,
    state:{
        cartList:[]
    },
    mutations:{
         GetCartList(state,data)
        {
            state.cartList = data
        }
    },
    actions:{
        async getCartList(context,data)
        {
            let res = await getVOByUid(data)
            if(res.data.state == 200)
            {
                context.commit('GetCartList',res.data.data)
            }
        },
        async updateNum(context,data)
        {
            let res = await updateNumByCid(data)
            return res.data
        },
        async deleteCarts(context,data)
        {
            let res = await deleteCart(data)
            return res.data
        },
        async addCart(context,data)
        {
            let res = await addToCart(data)
            return res.data
        }
    }
}