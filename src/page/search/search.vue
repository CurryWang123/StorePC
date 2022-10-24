<template>
	<div>
		<MyHeader/>
		
		<el-row class="itemTypeRow">
			<el-col :span="3">
				<el-col :span="6"><div class="itemTypecontent bg-white"></div></el-col>
			</el-col>
			<el-col :span="3" v-for="(item,index) in itemTypeList" :key="index" class="item">
				<a @click.prevent="search(item)">{{item}}</a>
			</el-col>
			<el-col :span="5">
				&nbsp;
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="3">
				<el-col :span="6"><div class="grid-content bg-white"></div></el-col>
			</el-col>
			<!-- 主体 -->
			<el-col :span="18">
				<el-row :gutter="20">
					<el-col :span="6" v-for="(item,index) in pageList.records" :key="index">
					<div class="grid-content bg-purple">
						<el-row><img :src="require('@/assets'+(item.image)+'collect.png')" class="myimg"/></el-row>
						<el-row><span class="moneySpan">￥{{item.price}}</span></el-row>
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
							<el-button type="warning" icon="el-icon-star-off" circle @click="addToCollection(item.id)">加入收藏</el-button>
							<el-button type="primary" icon="el-icon-s-goods" circle @click="addCart(item.id)">加入购物车</el-button>
						</el-row>
					</div>
					</el-col>
				</el-row>
				<!-- 查询结果为空时显示 -->
				<el-row v-show="pageList.records == '' ">
					<el-alert
						title="没有你想要的商品"
						:closable="false"
						center
						type="warning">
					</el-alert>
				</el-row>
				<el-row>
					<div class="mypagination">
						<el-pagination
							background
							layout="prev, pager, next"
							:total="pageList.total"
							:page-size="12"
							:current-page="pageList.current"
							@current-change="handleCurrentChange"
							>
						</el-pagination>
					</div>
				</el-row>
			</el-col>
		</el-row>
		<MyFooter/>
	</div>
</template>
<script>
import MyHeader from "@/components/header/myHeader.vue";
import MyFooter from "@/components/footer/myFooter.vue";
import { mapState,mapActions,mapMutations } from "vuex";
import {addToCart} from '@/api/cart/cart.js'
import {addCollection} from '@/api/collection/collection.js'
export default {
    name: "search",
	data(){
		return{
			user: JSON.parse(localStorage.getItem('userInfo'))
		}
	},
    components: { MyHeader,MyFooter },
	methods:{
		...mapActions('product',['pageProductList']),
		addCart(pid){
			if(this.user.username === '游客')
			{
				this.$message('你还未登录，请先登录！')
				this.$router.push('/login')
			}else{
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
			}
		
		},
		 handleCurrentChange(val) {
			let data = {
				page:{
				"current": val, 
				"size": 12 
				},
				params:{
					title:this.productTitle
				}
			}
			this.pageProductList(data)
      },
	  addToCollection(id)
		{
			if(this.user.username === '游客')
			{
				this.$message('你还未登录，请先登录！')
				this.$router.push('/login')
			}else{
						addCollection({
				pid:id,
				uid:this.user.uid,
				username:this.user.username
			}).then(res =>{
						if(res.data.state === 200)
				{
					this.$message({
						message: '收藏成功',
						type: 'success'
        });
				}
			})
			}
	
		},
			search(itemType){
			let data = {
				page:{
				"current": 1, 
				"size": 12 
				},
				params:{
					itemType:itemType
				}
			}
			this.pageProductList(data)
			if(this.$route.name !=search)
			{
					this.$router.push({
						name:'search'
					         		})
			}
		
		},
		...mapActions('product',['pageProductList']),
		...mapMutations('product',['GetItemTypeList'])
	},
	created(){
		this.GetItemTypeList()
	},
	computed:{
		productList(){
			return this.$route.query.productList
		},
		...mapState('product',['pageList','itemTypeList']),
		...mapState(['productTitle'])
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
  .itemTypecontent
  {
	min-height:100px;
  }
  .itemTypeRow{
	background-color: rgb(238, 225, 215);
  }
  .item
  {
	margin-top: 10px;
  }

</style>