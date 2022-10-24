<template>
    <div>
        <MyHeader/>
        <el-row>
			<el-col :span="3">
				<el-col :span="6"><div class="grid-content bg-white"></div></el-col>
			</el-col>
			<!-- 主体 -->
			<el-col :span="18">
				<el-row :gutter="20">
					<el-col :span="6" v-for="(item,index) in collectionList" :key="index">
					<div class="grid-content bg-purple">
						<el-row><img :src="require('@/assets'+(item.image)+'collect.png')" class="myimg"/></el-row>
						<el-row><span class="moneySpan">￥{{item.price}}</span>&nbsp;&nbsp;&nbsp;&nbsp;{{item.collectionNum}}收藏</el-row>
						<span>
							<router-link :to="{
									name:'productDetail',
									query:{
										id:item.id
									}}">
								{{item.title}}
								</router-link>
						</span>
						<el-row>
							<el-button type="warning" icon="el-icon-star-off" circle @click="deleteCollect(item.collectId)">移除收藏</el-button>
							<el-button type="primary" icon="el-icon-s-goods" circle @click="addCart(item.pid)">加入购物车</el-button>
						</el-row>
					</div>
					</el-col>
				</el-row>
				<!-- 查询结果为空时显示 -->
				<el-row v-show="collectionList == '' ">
					<el-alert
						title="你还没有收藏任何商品哦，快去收藏吧！"
						:closable="false"
						center
						type="warning">
					</el-alert>
				</el-row>
			</el-col>
		</el-row>
        <MyFooter/>
    </div>
    
</template>
<script>
import MyHeader from "@/components/header/myHeader.vue";
import MyFooter from "@/components/footer/myFooter.vue";
import {addToCart} from '@/api/cart/cart.js'
import { mapActions, mapState } from "vuex";
import {deleteCollection} from '@/api/collection/collection.js'
export default {
    name: 'Mycollection',
    components: { MyFooter,MyHeader },
    data(){
        return{
            user: JSON.parse(localStorage.getItem('userInfo'))
        }
    },
    methods:{
        ...mapActions('collection',['findCollections']),
        addCart(pid){
			let data={
				username:this.user.username,
				uid:this.user.uid,
				pid:pid,
				amount:1
			}
			addToCart(data).then(res =>{
				if(res.data.state === 200)
				{
					this.$message({
						message: '加入购物车成功',
						type: 'success'
        });
				}
			})
		},
		deleteCollect(collectId)
		{
			deleteCollection(collectId).then(res =>{
				if(res.data.state === 200)
				{
					this.findCollections(this.user.uid)
				}
			})
		}
    },
    created(){
        this.findCollections(this.user.uid)
    },
    computed:{
        ...mapState('collection',['collectionList'])
    }
}
</script>
<style scoped>
.el-row {
    margin-bottom: 15px;
  }
  .el-col {
    border-radius: 50px;
  }
  .bg-purple {
    background: #f3efef;
  }
  .bg-white {
    background: #fffbfb;
  }
  .grid-content {
    min-height: 380px;
	border-radius: 20px;
	margin-bottom: 30px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .myimg{
	width: 100%;
	padding:15px;
	vertical-align: middle;
  }
  .mypagination{
	text-align: center;
  }
  .moneySpan{
	color: rgb(239, 204, 5);
  }
</style>