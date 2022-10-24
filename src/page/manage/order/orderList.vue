<template>
            <el-col :span="14">
                <div class="panel panel-default" v-for="(item,index) in pageOrderList.records" :key="index" v-show="pageOrderList.records.length >0">
					<div class="panel-heading">
						<p class="panel-title">
							订单号：{{item.oid}}，下单时间：{{item.orderTime}} ，收货人：{{item.recvName}}
						</p>
					</div>
					<div class="panel-body">
						<table class="orders-table" width="100%">
							<thead>
								<tr>
									<th width="15%"></th>
									<th width="30%">商品</th>
									<th width="8%">单价</th>
									<th width="8%">数量</th>
									<th width="9%">小计</th>
									<th width="10%">售后</th>
									<th width="10%">状态</th>
									<th width="10%">操作</th>
								</tr>
							</thead>
							<tbody class="orders-body">
								<tr v-for="(product,i) in item.orderItemList" :key="i">
									<td><img :src="require('@/assets'+(product.image)+'collect.png')" class="img-responsive" /></td>
									<td>{{product.title}}</td>
									<td>¥<span>{{product.price}}</span></td>
									<td>{{product.num}}件</td>
									<td>¥<span>{{product.price * product.num}}</span></td>
									<td><a href="#">申请售后</a></td>
									<td>
										<div>
                                            <span v-if="item.status == 0" >未支付</span>
											<span v-if="item.status == 1">已支付</span>
											<span v-if="item.status == 2">已取消</span>
											<span v-if="item.status == 3">已关闭</span>
											<span v-if="item.status == 4">已完成</span>
                                        </div>
										<div><router-link :to="{name:'orderinfo',query:{orderDetail:item}}">订单详情</router-link></div>
									</td>
									<td>
										<a class="btn btn-default btn-xs">
											<span v-if="(item.status == 0)" @click="payment(item.oid,1)">去付款</span>
											<span v-if="(item.status == 1)" @click="arrival(item.oid,4)" >确认收货</span>
											<span v-if="(item.status == 4)" @click="evaluate(item.orderItemList)">去评价</span>
										</a>
									</td>
								</tr>
							</tbody>
						</table>
						<div>
							<span class="pull-right">订单总金额：¥{{item.totalPrice}}</span>
						</div>
					</div>
				</div>
				<el-row v-show="pageOrderList.records.length >0">
					<div class="mypagination">
						<el-pagination
							background
							layout="prev, pager, next"
							:total="pageOrderList.total"
							:page-size="2"
							:current-page="pageOrderList.current"
							@current-change="handleCurrentChange"
							>
						</el-pagination>
					</div>
				</el-row>
				<el-row v-show="pageOrderList.records.length == 0">
					<h1 style="color:#409EFF;">空空如也</h1>
				</el-row>
            </el-col>
</template>
<script>
import { mapActions,mapState } from 'vuex';
import {updateOrderStatus} from '@/api/order/order.js'
export default {
    name:'orderList',
	data(){
		return{
			user: JSON.parse(localStorage.getItem('userInfo'))
		}
	},
    methods:{
        ...mapActions('order',['getPageOrderList']),
		handleCurrentChange(value)
		{
			if((typeof this.$route.query.status == 'number'))
			{
				this.getPageOrderList({
				page:{
					size:2,
					current:value
				},
				params:{
					uid:this.user.uid,
					status:this.$route.query.status
				}
									})
			}else{
				this.getPageOrderList({
				page:{
					size:2,
					current:value
				},
				params:{
					uid:this.user.uid
				}
									})
			}
		},
		arrival(oid,status)
		{
			updateOrderStatus({
            oid:oid,
            status:status
          }).then(res => {
			if(res.data.state === 200)
			{
				this.$message({
				type: 'success',
				message: '收货成功,快去评价吧!'
			});
					this.getPageOrderList({
				page:{
					size:2,
					current:1
				},
				params:{
					uid:this.user.uid,
					status:4
				}
									})
			}
		  })
		},
		payment(oid,status){
			const h = this.$createElement;
			 this.$msgbox({
          title: '消息',
          message: h('p', null, [
            h('span', null, '确认支付吗 '),
          ]),
          showCancelButton: true,
          confirmButtonText: '支付',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action =>{
			updateOrderStatus({
            oid:oid,
            status:status
          }).then(res => {
			if(res.data.state === 200)
			{
				this.$message({
				type: 'success',
				message: '付款成功!'
			});
				this.getPageOrderList({
				page:{
					size:2,
					current:1
				},
				params:{
					uid:this.user.uid
				}
									})
			}
		  })
		})
		},
		evaluate(orderItemList){
			this.$router.push({
				name:'evaluateCenter',
				query:{
					orderItemList:orderItemList
				}
			})
		},
		...mapActions('order',['getPageOrderList'])
    },
    data()
    {
        return{
            user: JSON.parse(localStorage.getItem('userInfo'))
        }
    },
    computed:{
        ...mapState('order',['pageOrderList'])
    }
}
</script>