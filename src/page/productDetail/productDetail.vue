<template>
		<div>
		<MyHeader></MyHeader>
    	<div class="container">
			<!-- 商品详情区 -->
			<div class="row">
				<div class="col-md-6">
					<div id="myCarousel" class="carousel slide">
						<!-- 轮播（Carousel）指标 -->
						<ol class="carousel-indicators">
							<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
							<li data-target="#myCarousel" data-slide-to="1"></li>
							<li data-target="#myCarousel" data-slide-to="2"></li>
							<li data-target="#myCarousel" data-slide-to="3"></li>
							<li data-target="#myCarousel" data-slide-to="4"></li>
						</ol>
						<!-- 轮播（Carousel）项目 -->
						<div class="carousel-inner" align="center">
							<div class="item active">
								<img :src="require('@/assets'+(product.image)+'1_big.png')">
							</div>
							<div class="item">
								<img :src="require('@/assets'+(product.image)+'2_big.png')">
							</div>
							<div class="item">
								<img :src="require('@/assets'+(product.image)+'3_big.png')">
							</div>
							<div class="item">
								<img :src="require('@/assets'+(product.image)+'4_big.png')">
							</div>
							<div class="item">
								<img :src="require('@/assets'+(product.image)+'5_big.png')">
							</div>
						</div>
						<!-- 轮播（Carousel）导航 -->
						<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
							<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
							<span class="sr-only">Previous</span>
						</a>
						<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
							<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
							<span class="sr-only">Next</span>
						</a>
					</div>
				</div>
				<div class="col-md-6">
					<h3 id="product-title" class="col-md-12 title-row-1">{{product.title}}</h3>
					<p id="product-sell-point" class="col-md-12 text-row-1"><small>{{product.sellPoint}}</small></p>
					<div class="col-md-12 price-bar">
						<small>售价：</small> ¥<span id="product-price">{{price}}</span>
						<div><small>*退货补运费 *7天无理由退货 *24小时快速退款 </small></div>
					</div>
					<form class="form-inline product-form col-md-12" role="form">
						<div class="col-md-12 form-space">
							<label for="num">数量：</label>
							<input id="numDown" type="button" value="-" class="num-btn" @click="num>0?num--:num=0" />
							<input id="num" type="text" size="2" class="num-text" v-model="num">
							<input id="numUp" class="num-btn" type="button" value="+" @click="num++" />
						</div>
						<div class="col-md-12 form-space">
							<p><small><b>电脑商城</b>发货并提供售后服务,今日下单,明日送达</small></p>
						</div>
						<div class="col-md-12 form-space">
							<input @click="purchase" class="btn btn-primary btn-lg btn-block" type="button" value="立即购买">
						</div>
						<div class="col-md-12 form-space">
							<button id="btn-add-to-cart" type="button" class="btn btn-default go-cart" @click="addCart()"><span class="fa fa-cart-plus"></span> 加入购物车</button>
							<button id="btn-add-to-collect" type="button" class="btn btn-default" @click="addToCollection"><span class="fa fa-heart-o"></span> 加入收藏</button>
						</div>
					</form>
				</div>
			</div>
			<!-- 评论区 -->
			<el-row>
				<evaluate/>
			</el-row>
        </div>
		<MyFooter></MyFooter>
		</div>
</template>
<script>
import MyFooter from '@/components/footer/myFooter.vue';
import MyHeader from '@/components/header/myHeader.vue';
import evaluate from '@/page/productDetail/evaluate/evaluate.vue'
import {mapActions} from 'vuex'
import {addToCart} from '@/api/cart/cart.js'
import {addCollection} from '@/api/collection/collection.js'
export default {
    name: "productDetail",
    components: { MyFooter, MyHeader ,evaluate},
	data(){
		return{
			id:this.$route.query.id,
			product:{},
			num:1,
			user: JSON.parse(localStorage.getItem('userInfo'))
		}
	},
	computed:{
		price(){
			return this.product.price * this.num
		}
	},
	methods:{
		...mapActions('product',['productById']),
		addCart(){
			if(this.user.username === '游客')
			{
				this.$message('你还未登录,请先登录');
				this.$router.replace('/login')
			}else{
						let data={
				username:this.user.username,
				uid:this.user.uid,
				pid:this.id,
				amount:this.num
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
		addToCollection()
		{
			if(this.user.username === '游客')
			{
				this.$message('你还未登录,请先登录');
				this.$router.replace('/login')
			}else{
						addCollection({
				pid:this.id,
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
		purchase()
		{
			if(this.user.username === '游客')
			{
				this.$message('你还未登录,请先登录');
				this.$router.replace('/login')
			}else{
				this.$router.push({
				name:'orderConfirm',
				query:{
					product:this.product,
					num:this.num
				}
			})
			}
			
		}
	},
	created(){
		this.productById(this.id).then(
			res => this.product = res
		)
	}
}
</script>
<style scoped>
	.item{
		width: 500px;
		height: 300px;
	}
	
</style>