<template>
    <div>
        <div class="text-center pay-res">
			<span class="fa fa-times-rectangle-o pay-res-icon"></span>支付失败
		</div>
        <el-row>
            <el-col :span="4">&nbsp;</el-col>
            <el-col :span="4"><router-link to="/cart">返回购物车</router-link></el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name:'paymentFail'
}
</script>