<template>
    <div>
		<MyHeader></MyHeader>
		<div class="container">
			<div class="row" id="myRow">
				<div class="col-md-2" id="indexMenu">
					<div class="block">
						<span class="demonstration" style="color:#E6A23C;">商品类型</span>
						<el-cascader
							v-model="value"
							:options="options"
							:props="{ expandTrigger: 'hover' }"
							:show-all-levels="false"
							@change="handleChange">
						</el-cascader>
					</div>
					
				</div>
				<div class="col-md-10">
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
								<img src="@/assets/images/index/index_banner1.png">
							</div>
							<div class="item">
								<img src="@/assets/images/index/index_banner2.png">
							</div>
							<div class="item">
								<img src="@/assets/images/index/index_banner3.png">
							</div>
							<div class="item">
								<img src="@/assets/images/index/index_banner4.png">
							</div>
							<div class="item">
								<img src="@/assets/images/index/index_banner5.png">
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
			</div>
			
			<!--推荐栏目-->
			<div class="row">
				<div class="col-md-6">
					<div class="panel panel-default">
						<div class="panel-heading">
							<p class="panel-title">热销排行</p>
						</div>
						<div class="panel-body panel-item">
							<div class="col-md-12" v-for="(item,index) in hotProductList" :key="index">
								<div class="col-md-7 text-row-2">
								<router-link :to="{
									name:'productDetail',
									query:{
										id:item.id
									}}">
								{{item.title}}
								</router-link>
								</div>
								<div class="col-md-2">￥{{item.price}}</div>
								<div class="col-md-3"><img :src="require('@/assets'+(item.image)+'collect.png')" class="img-responsive" /></div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="panel panel-default">
						<div class="panel-heading">
							<p class="panel-title">新到好货</p>
						</div>
						<div id="hot-list" class="panel-body panel-item">
							<div class="col-md-12" v-for="(item,index) in newProductList" :key="index">
								<div class="col-md-7 text-row-2">
								<router-link :to="{
									name:'productDetail',
									query:{
										id:item.id
									}}">
								{{item.title}}
								</router-link>
								</div>
								<div class="col-md-2">￥{{item.price}}</div>
								<div class="col-md-3"><img :src="require('@/assets'+(item.image)+'collect.png')" class="img-responsive" /></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<MyFooter></MyFooter>
	</div>

</template>
<script>
import { mapActions,mapState,mapMutations } from 'vuex'
import MyHeader from '@/components/header/myHeader.vue';
import MyFooter from '@/components/footer/myFooter.vue';
export default {
    name: "index",
	data(){
		return{
			value:[],
			options:[]
		}
	},
    methods: {
        // 获取热销榜前四
        ...mapActions("product", ["getHotList"]),
		// 查询最新到货的商品
		...mapActions("product", ["getProductsNew"]),
		// 获取商品级联选择器
		...mapActions("product", ["productCascader"]),
		...mapMutations(['cleanActive']),
		// 进入商品详情页
		handleChange(value) {
				this.$router.push({
					name:'productDetail',
					query:{
						id:value[1]
					}
				})
      						}
    },
    computed: {
        ...mapState("product", ["hotProductList"]),
		...mapState("product",["newProductList"])
    },
    mounted() {
        this.getHotList();
		this.getProductsNew();
		this.productCascader().then(
			res => this.options = res
		)
		this.cleanActive()
    },
    components: { MyHeader, MyFooter }
}
</script>
<style scoped>
	#myRow{
		margin-bottom: 30px;
	}
</style>