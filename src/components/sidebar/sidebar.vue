<template>
    	<div class="panel-group" id="accordion">
					<div class="panel panel-default">
						<div class="panel-heading">
							<!--主选项：我的订单-->
							<p class="panel-title">
								<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">我的订单</a>
							</p>
						</div>
						<div id="collapseOne" class="panel-collapse collapse">
							<div class="panel-body">
								<div><a @click="getPageOrders()">全部订单</a></div>
								<div><a @click="getPageOrders(0)">待付款</a></div>
								<div><a @click="getPageOrders(1)">待收货</a></div>
								<div><a @click="getPageOrders(4)">待评价</a></div>
								<div><a @click="getPageOrders(3)">退货退款</a></div>
							</div>
						</div>
					</div>
					<div class="panel panel-default">
						<div class="panel-heading">
							<!--主选项：资料修改-->
							<p class="panel-title">
								<a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">资料修改</a>
							</p>
						</div>
						<div id="collapseTwo" class="panel-collapse collapse in">
							<div class="panel-body">
								<li><router-link to="/manage/password">修改密码</router-link></li>
								<li><router-link to="/manage/upload">上传头像</router-link></li>
								<li ><router-link to="/manage/userData">个人资料</router-link></li>
								<li><router-link to="/manage/address">收货管理</router-link></li>
							</div>
						</div>
					</div>
				</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name:'sidebar',
	data()
    {
        return{
            user: JSON.parse(localStorage.getItem('userInfo'))
        }
    },
	methods:{
		getPageOrders(status)
		{
			if((typeof status == 'number'))
			{
				this.getPageOrderList({
				page:{
					size:2,
					current:1
				},
				params:{
					uid:this.user.uid,
					status:status
				}
									})
				this.$router.push({
					name:'orderList',
					query:{
						status:status
					}
				})
			}else{
				this.getPageOrderList({
				page:{
					size:2,
					current:1
				},
				params:{
					uid:this.user.uid
				}
									})
				this.$router.push('/manage/orderList')
			}
			},
			...mapActions('order',['getPageOrderList'])
		},
	}
</script>