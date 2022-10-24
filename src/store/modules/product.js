import {findHotList, findProductsNew, getPageProductList, getProductById, getProductCascader,findAllItemType} from '@/api/product/product'
export default {
    namespaced:true,
    mutations:{
        GetHotList(state,value)
        {
            state.hotProductList = value.data
        },
        GetProductsNew(state,value)
        {
            state.newProductList = value.data
        },
        PageProductList(state,value)
        {
            state.pageList = value
        },
        async GetItemTypeList(state)
        {
            let res = await findAllItemType()
            state.itemTypeList = res.data.data
        }
    },
    actions:{
        async getHotList(context)
        {
            let res = await findHotList()
                if(res.data.state == 200)
                {
                    context.commit('GetHotList',res.data)
                }else{
                    Promise.reject(new Error("失败"))
                }
        },
        async productById(context,param)
        {
            let res = await getProductById(param)
            return res.data.data
        },
        async getProductsNew(context)
        {
            let res = await findProductsNew()
            if(res.data.state == 200)
                {
                    context.commit('GetProductsNew',res.data)
                }else{
                    Promise.reject(new Error("失败"))
                }
        },
        async productCascader(context)
        {
            let res = await getProductCascader()
            return res.data.data
        },
        // 分页查询商品列表
        async pageProductList(context,data)
        {
            let res = await getPageProductList(data)
            if(res.data.state == 200)
                {
                    console.log(res.data.data)
                    context.commit('PageProductList',res.data.data)
                }else{
                    Promise.reject(new Error("失败"))
                }
        }
    },
    state:{
        hotProductList:[],
        newProductList:[],
        // 搜索页商品列表
        pageList:[],
        // 商品类型
        itemTypeList:[]
    }
}