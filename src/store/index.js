import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product'
import user from './modules/user'
import cart from './modules/cart'
import address from './modules/address'
import collection from './modules/collection'
import order from './modules/order'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        product,
        user,
        cart,
        address,
        collection,
        order
    },
    state:{
        // 搜索框文字
        productTitle:'',
        // 订单头部状态
        active:0,
        // 倒计时时间
        durationTime:0
    },
    mutations:{
        updateTitle(state,value){
            state.productTitle = value
        },
        addActive(state)
        {
            state.active++
        },
        cleanActive(state)
        {
            state.active = 0
        },
        subActive(state)
        {
            state.active = 1
        },
        setDurationTime(state,param)
        {
            state.durationTime = param
        }
    }
    }
   )
export default store
