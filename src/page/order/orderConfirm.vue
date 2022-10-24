<template>
    <div>
        <el-row>
            <el-col :span="4">&nbsp;</el-col>
            <el-col :span="2"><label class="myLabel">请选择收货地址:</label></el-col>
            <el-col :span="12">
                <el-select v-model="address" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in addressList"
                    :key="index"
                    :label="`${item.locate}`+'---'+`${item.address}`"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">&nbsp;</el-col>

        </el-row>
        <el-row>
            <el-col :span="4">&nbsp;</el-col>
            <el-col :span="16">
                <div class="panel panel-primary">
					<div class="panel-heading">
						<p class="panel-title">订单商品信息：</p>
					</div>
					<div class="panel-body">
						<table class="cart-table" width="100%">
							<thead>
								<tr>
									<th width="15%"></th>
									<th width="35%">商品</th>
									<th width="15%">单价</th>
									<th width="15%">数量</th>
									<th width="20%">金额</th>
								</tr>
							</thead>
							<tbody id="cart-list" class="cart-body">
								<tr v-for="(cart,index) in cartList" :key="index">
									<td><img :src="require('@/assets'+(cart.image)+'collect.png')" class="img-responsive" /></td>
									<td>{{cart.title}}</td>
									<td>¥<span>{{cart.price}}</span></td>
									<td>{{$route.query.num}}</td>
									<td><span>{{cart.price}}</span></td>
								</tr>
							</tbody>
						</table>
						<div class="total-bar">
							 &nbsp;
							<span class="pull-right">已选商品
								<span id="all-count">{{selectedNum}}</span>件 总价¥
								<span id="all-price">{{totalPrice}}</span>元
							</span>
						</div>
					</div>
				</div>
                <div class="pay-bar">
					<el-button type="primary" plain @click="toCart">返回购物车</el-button>
					<span class="pull-right"><input @click="payment()" id="btn-create-order" type="button" value="在线支付" class="btn btn-primary btn-lg link-pay"/></span>
				</div>
            </el-col>
        </el-row>
    </div>
    
</template>
<script>
import { mapActions,mapState,mapMutations } from 'vuex';
import {getVOByCids} from '@/api/cart/cart.js';
import {create,updateOrderStatus} from '@/api/order/order.js';
export default {
    name:'orderConfirm',
    data(){
        return{
            user: JSON.parse(localStorage.getItem('userInfo')),
            address:'',
            selectedNum:0,
            totalPrice:0,
            cartList:[],
            order:{}
            
        }
    },
    methods:{
      ...mapActions('address',['getAddressList']),
      payment()
      {
        if(this.$route.query.cids == null)
        {
            this.cartList[0].pid = this.cartList[0].id
            
        }
        create({
            username:this.user.username,
            uid:this.user.uid,
            cartList:this.cartList,
            address:{
                name:this.address.name,
                phone:this.address.phone,
                provinceName:this.address.provinceName,
                cityName:this.address.cityName,
                areaName:this.address.areaName,
                address:this.address.address
            },
            totalPrice:this.totalPrice
        }).then(res =>{
            if(res.data.state === 200)
            {
                this.addActive()
                this.order = res.data.data
                this.$router.replace({
                    name:'payment',
                    query:{
                        oid:this.order.oid,
                        totalPrice:this.order.totalPrice
                    }
                    })
            }
        })
      },
      toCart(){
            this.cleanActive()
            this.$router.push('/cart')
        },
      ...mapMutations(['addActive','cleanActive'])
    },
    created(){
        this.getAddressList(this.user.uid)
        if(this.$route.query.cids != null)
        {
            getVOByCids(this.$route.query.cids).then(res =>{
            if(res.data.state === 200)
            {
                this.cartList = res.data.data
                for(let i =0;i<this.cartList.length;i++)
                {
                    this.selectedNum += this.cartList[i].num
                    this.totalPrice += this.cartList[i].num * this.cartList[i].price
                }
            }
        })
        }else{
            this.cartList.push(this.$route.query.product)
            this.selectedNum = this.$route.query.num
            this.cartList[0].num = this.$route.query.num
            this.totalPrice = (this.cartList[0].price * this.$route.query.num)
        }
     
    },
    computed:{
        ...mapState('address',['addressList'])
    }
}
</script>
<style scoped>
.el-row {
    margin-bottom: 30px;
  }
  .myLabel{
    color: black;
  }
</style>