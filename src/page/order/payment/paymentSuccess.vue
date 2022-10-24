<template>
<div>
    <div class="text-center pay-res">
		<span class="fa fa-check-square-o pay-res-icon"></span>支付成功
	</div>
    <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="4"><router-link :to="{name:'orderinfo',query:{orderDetail:$route.query.orderDetail}}" >查看订单</router-link></el-col>
    </el-row>
</div>
</template>
<script>
export default {
    name:'paymentSuccess'
}
</script>