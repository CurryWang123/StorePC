<template>
	<div>
		<MyHeader></MyHeader>
	
    	<div class="container">
			<div class="col-md-offset-1 col-md-10">
				<h1>订单详情：</h1>
				<h2 class="page-header">状态信息：</h2>
				<div class="state-bar">
					订单号：{{orderDetail.oid}} ，当前状态：<span v-if="orderDetail.status == 0" >未支付</span>
												  <span v-if="orderDetail.status == 1">已支付</span>
												  <span v-if="orderDetail.status == 2">已取消</span>
												  <span v-if="orderDetail.status == 3">已关闭</span>
												  <span v-if="orderDetail.status == 4">已完成</span>
				</div>
				<ol class="order-flow">
					<li class="order-success">1.提交订单 <small>{{orderDetail.orderTime}}</small> <span class="fa fa-check-circle"></span></li>
					<li class="order-success" v-show="orderDetail.payTime !=null">2.付款成功 <small>{{orderDetail.payTime}}</small> <span class="fa fa-check-circle"></span></li>
					<li class="order-success">3.商城发货 <small>2022-8-1 08:13:34</small> <span class="fa fa-check-circle"></span></li>
					<li>4.用户收货</li>
					<li>5.购物评价</li>
				</ol>
				<h2 class="page-header">地址详情：</h2>
				<p>收货人姓名：{{orderDetail.recvName}}，邮政编码：100190，联系电话： {{orderDetail.recvPhone}}</p>
				<p>{{orderDetail.recvProvince}}{{orderDetail.recvCity}}
				{{orderDetail.recvArea}}{{orderDetail.recvAddress}}</p>
				<h2 class="page-header">物流信息：</h2>
				<p>发货时间：2022-8-1 08:13:34</p>
				<p>物流公司：顺丰快递</p>
				<p>快递单号：301111303203048</p>
				<p>物流信息：</p>
				<p>2022-8-1 08:13:34 您的快递在【北京国贸分拣中心】分拣完毕</p>
				<p>2022-8-1 08:39:50 您的快递在【北京国贸分拣中心】准备装车</p>
				<p>2022-8-1 12:20:07 您的快递到达【北京中关村分拣中心】</p>
				<h2 class="page-header">商品详情：</h2>
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">
               			订单号：{{orderDetail.oid}}，下单时间：{{orderDetail.payTime}} ， 收货人：{{orderDetail.recvName}}
            		</h3>
					</div>
					<div class="panel-body">
						<table class="orders-table">
							<thead>
								<tr>
									<th width="15%"></th>
									<th width="35%">商品</th>
									<th width="15%">单价</th>
									<th width="15%">数量</th>
									<th width="20%">小计</th>
								</tr>
							</thead>
							<tbody class="orders-body">
								<tr v-for="(item,index) in orderDetail.orderItemList" :key="index">
									<td><img :src="require('@/assets'+(item.image)+'collect.png')" class="img-responsive" /></td>
									<td>{{item.title}}</td>
									<td>¥<span>{{item.price}}</span></td>
									<td>{{item.num}}</td>
									<td>¥<span>{{item.num * item.price}}</span></td>
								</tr>
							</tbody>
						</table>
						<div>
							<span class="pull-right">订单总金额：¥{{orderDetail.totalPrice}}</span>
						</div>
					</div>
				</div>
				<router-link :to="{name:'orderList'}">返回</router-link>
			</div>
		</div>
		<MyFooter></MyFooter>
	</div>
</template>
<script>
import MyFooter from '@/components/footer/myFooter.vue';
import MyHeader from '@/components/header/myHeader.vue';
export default {
    name:'orderinfo',
	components:{MyFooter, MyHeader},
	data(){
		return{
			user: JSON.parse(localStorage.getItem('userInfo')),
			orderDetail:{}
		}
	},
	methods:{

	},
	created(){
		this.orderDetail = this.$route.query.orderDetail
	}
}
</script>