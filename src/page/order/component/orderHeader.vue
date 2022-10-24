<template>
        <el-row class="headRow">
            <el-col :span="4">
                &nbsp;
            </el-col>
            <el-col :span="16">
                <el-steps :active="activeNum" finish-status="success" simple>
                    <el-step title="1.确认订单信息" icon="el-icon-edit"></el-step>
                    <el-step title="2.在线支付" icon="el-icon-upload"></el-step>
                    <el-step title="3.付款成功" icon="el-icon-picture"></el-step>
                </el-steps>
            </el-col>
            <el-col :span="4">&nbsp;</el-col>
        </el-row>
</template>
<script>
export default {
    name:'orderHeader',
    props:['activeNum'],
    data(){
        return{
            
        }
    }
}
</script>
<style scoped>
 .headRow{
    margin-bottom: 30px;
 }
</style>