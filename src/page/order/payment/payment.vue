<template>
<div>
    <el-row class="oneRow">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="4">
            <span style="color:black">选择支付方式：</span>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="8">&nbsp;</el-col>
        <el-col :span="4">
            <el-radio-group v-model="radio">
                <el-radio :label="1">支付宝</el-radio>
                <el-radio :label="2">微信</el-radio>
                <el-radio :label="3">网银</el-radio>
            </el-radio-group>
        </el-col>
    </el-row>
    <el-row class="twoRow">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="4"><span>订单号：{{this.$route.query.oid}},支付金额：￥{{this.$route.query.totalPrice}}</span></el-col>
    </el-row>
    <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="4">
            <el-button type="primary" plain @click="toCart">返回购物车</el-button>
        </el-col>
        <el-col :span="8">
            &nbsp;
        </el-col>
        <el-col :span="4">
           <span class="pull-right"> 
            ￥{{this.$route.query.totalPrice}}
            <input @click="certain()" id="btn-create-order" type="button" value="确定付款" class="btn btn-primary btn-lg link-pay"/>
            </span>
        </el-col>
    </el-row>
    
</div>
    
</template>
<script>
import { mapActions,mapState,mapMutations } from 'vuex';
import {getOrderListItem,updateOrderStatus} from '@/api/order/order.js'
export default {
    name:'payment',
     data(){
        return{
            user: JSON.parse(localStorage.getItem('userInfo')),
            radio:1,
            orderDetail:{}
        }
    },
    methods:{
        certain()
        {
            this.addActive()
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
                this.addActive()
                this.$router.replace({
                    name:'paymentFail'
                })
              done();
            }
          }
        }).then(action => {
          this.addActive()
          updateOrderStatus({
            oid:this.$route.query.oid,
            status:1
          })
          getOrderListItem({
            uid:this.user.uid,
            oid:this.$route.query.oid
          }).then(res => {
            this.orderDetail = res.data.data
            this.$router.replace({
            name:'paymentSuccess',
            query:{
                orderDetail:this.orderDetail
            }
          })
          })
        
          this.$message({
            type: 'success',
            message: '支付成功！ '
          });
        });
        },
        toCart(){
            this.cleanActive()
            this.$router.push('/cart')
        },
        ...mapMutations(['addActive','cleanActive','subActive'])
    }
}
</script>
<style scoped>
    .oneRow{
        margin-top: 30px;
    }
    .twoRow{
        margin-top: 30px;
    }
</style>