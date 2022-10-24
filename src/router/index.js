import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/page/index/index.vue'
import login from '@/page/login/login.vue'
import search from '@/page/search/search.vue'
import cart from '@/page/cart/cart.vue'
import err from '@/page/err/err.vue'
import order from '@/page/order/order.vue'
import orderinfo from '@/page/order/orderinfo.vue'
import reg from '@/page/reg/reg.vue'
import productDetail from '@/page/productDetail/productDetail.vue'
import evaluate from '@/page/productDetail/evaluate/evaluate.vue'
import manage from '@/page/manage/manage.vue'
import password from '@/page/manage/password/password.vue'
import upload from '@/page/manage/upload/upload.vue'
import userData from '@/page/manage/userData/userData'
import address from '@/page/manage/address/address'
import orderList from '@/page/manage/order/orderList.vue'
import collection from '@/page/collection/collection'
import orderConfirm from '@/page/order/orderConfirm'
import payment from '@/page/order/payment/payment'
import paymentSuccess from '@/page/order/payment/paymentSuccess'
import paymentFail from '@/page/order/payment/paymentFail'
import evaluateCenter from '@/page/evaluateCenter/evaluateCenter.vue'


Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const route= new VueRouter({
    routes:[
        {
            name:'login',
            path:'/login',
            component:login,
            meta:{isLogin:false}
        },
        {
            name:'index',
            path:'/index',
            component:index,
            meta:{isLogin:true}
        },
        {
            name:'search',
            path:'/search',
            component:search,
            meta:{isLogin:true}
        },
        {
            path:'*',
            redirect:'/index',
        },
        {
            name:'cart',
            path:'/cart',
            component:cart
        },
        {
            path:'/err',
            component:err
        },
        {
            path:'/order',
            name:'order',
            component:order,
            children:[
                {
                    path:'orderConfirm',
                    name:'orderConfirm',
                    component:orderConfirm
                },
                {
                    path:'payment',
                    name:'payment',
                    component:payment
                },
                {
                    path:'paymentSuccess',
                    name:'paymentSuccess',
                    component:paymentSuccess
                },
                {
                    path:'paymentFail',
                    name:'paymentFail',
                    component:paymentFail
                }
            ]
        },
        {
            path:'/orderinfo',
            name:'orderinfo',
            component:orderinfo
        },
        {
            path:'/product/detail',
            name:'productDetail',
            component:productDetail
        },
        {
            path:'/reg',
            name:'reg',
            component:reg
        },
        {
            path:'/collection',
            name:'collection',
            component:collection
        },
        {
            path:'/manage',
            name:'manage',
            component:manage,
            children:[
                {
                    path:'address',
                    name:'address',
                    component:address
                },
                {
                    path:'upload',
                    name:'upload',
                    component:upload
                },
                {
                    path:'password',
                    name:'password',
                    component:password
                },
                {
                    path:'userData',
                    name:'userData',
                    component:userData
                },
                {
                    path:'orderList',
                    name:'orderList',
                    component:orderList
                }
            ]
        },
        {
            path:'/evaluateCenter',
            name:'evaluateCenter',
            component:evaluateCenter
        }
        
    ]
})
route.beforeEach((to,from,next) =>
{
    let user = JSON.parse(localStorage.getItem('userInfo'))
    if (to.name === 'index' || to.name === 'login' || to.name === 'reg' || to.name === 'productDetail' || to.name === 'search' )
    {
        next()
    }else {
        if(user.username === '游客')
        {
            alert('你还未登录,请先登录！')
            next({
                name:'login'
            })
        }
        if((user.username != '游客') && (JSON.parse(sessionStorage.getItem('token')) == null))
        {
            alert('登录信息已过期,请重新登录！')
            next({
                name:'login'
            })
        }
        else{
            next()
        }
    }
    
 }
)
export default route