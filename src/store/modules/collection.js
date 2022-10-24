import {selectColletions} from '@/api/collection/collection.js'
export default {
    namespaced:true,
    mutations:{
        FindCollections(state,data)
        {
            state.collectionList = data
        }
    },
    actions:{
        async findCollections(context,param){
            let res = await selectColletions(param)
            if(res.data.state === 200)
            {
                context.commit('FindCollections',res.data.data)
            }
        }
    },
    state:{
        collectionList:[]
    }
}