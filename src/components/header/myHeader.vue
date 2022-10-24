<template>
			<!--电脑商城logo-->
			<div>
			<header class="header">
			<div class="row">
				<div class="col-md-3">
					<a>
						<img src="../pictures/logo.png" />
					</a>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当前用户：<span v-if="user!=null">{{user.username}}</span>
					<span v-else>游客</span>
					
				</div>
				<!--快捷选项-->
				<div class="col-md-9 top-item">
					<img v-if=" ( user.avatar != '') " :src="require('@/assets/images/upload/'+(user.avatar))" class="avatar" />
					<ul class="list-inline pull-right">
						<li><router-link to="/collection"><span class="fa fa-heart"></span>&nbsp;收藏</router-link></li>
						<li class="li-split">|</li>
						<li><a @click="getPageOrders()"><span class="fa fa-file-text"></span>&nbsp;订单</a></li>
						<li class="li-split">|</li>
						<li><router-link :to="{name:'cart'}"><span class="fa fa-cart-plus"></span>&nbsp;购物车</router-link></li>
						<li class="li-split">|</li>
						<li>
							<!--下列列表按钮 ：管理-->
							<div class="btn-group">
								<button type="button" class="btn btn-link dropdown-toggle" data-toggle="dropdown">
									<span id="top-dropdown-btn"><span class="fa fa-gears"></span>&nbsp;管理 <span class="caret"></span></span>
								</button>
								<ul class="dropdown-menu top-dropdown-ul" role="menu">
									<li><router-link to="/manage/password">修改密码</router-link></li>
									<li><router-link to="/manage/upload">上传头像</router-link></li>
									<li><router-link to="/manage/userData">个人资料</router-link></li>
									<li><router-link to="/manage/address">收货管理</router-link></li>
								</ul>
							</div>
						</li>
						<li class="li-split">|</li>
						<li v-show="(user.username == '游客')"><router-link :to="{name:'login'}"><span class="fa fa-user"></span>&nbsp;登录</router-link></li>
						<li v-show="(user.username != '游客')"><button @click.prevent="loginout()" ><span class="fa fa-user"></span>&nbsp;退出登录</button></li>
					</ul>
				</div>
				</div>
			</header>
				<!--  -->
				<!--导航 -->
		<!--分割导航和顶部-->
		<div class="row top-nav">
			<div class="col-md-6">
				<ul class="nav nav-pills">
					<li>
						<a href="#"></a>
					</li>
					<li class="active"><router-link to="/index"><span class="fa fa-home"></span></router-link></li>
					<li @click.prevent="err"><a >秒杀</a></li>
					<li @click.prevent="err"><a >优惠券</a></li>
					<li @click.prevent="err"><a >电脑VIP</a></li>
					<li @click.prevent="err"><a @click.prevent="err">外卖</a></li>
					<li @click.prevent="err"><a >超市</a></li>
				</ul>
			</div>
			<div class="col-md-6">
				<form class="form-inline pull-right" role="form">
					<div class="form-group">
						<input v-model="productTitle" type="text" class="form-control"  id="search" name="search" placeholder="请输入商品名称进行搜索">
					</div>
					<button class="btn btn-default btn-sm" @click.prevent="search()"><span class="fa fa-search"></span></button>
				</form>
			</div>
		</div>
			</div>

</template>
<script>
import { mapActions,mapMutations } from 'vuex';
import { mapState } from 'vuex';
import { logout } from '@/api/user/user';
export default {
    name:'myheader',
	data()
	{
		return{
			user: JSON.parse(localStorage.getItem('userInfo'))
		}
	},
	methods:{
		search(){
			let data = {
				page:{
				"current": 1, 
				"size": 12 
				},
				params:{
					title:this.productTitle
				}
			}
			this.pageProductList(data)
			console.log(this.$route.name)
			if(this.$route.name !=search)
			{
					this.$router.push({
						name:'search'
					         		})
			}
		
		},
		err(){
			this.$message({
          message: '改功能暂时未开放！',
          type: 'warning'
        });
		},
		...mapActions('product',['pageProductList']),
		...mapActions('order',['getPageOrderList']),
		loginout()
		{
			logout().then(res =>{
				this.LoginOut()
				console.log(res.data)
				this.$message({
						message: res.data.data,
						type: 'success'
        });
			this.$router.replace('/login')
			})
		},
		...mapMutations("user",['LoginOut']),
		getPageOrders()
		{
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
	computed:{
		productTitle:{
			get()
			{
				return this.$store.state.productTitle
			},
			set(value)
			{
				this.$store.commit('updateTitle', value)
			}
		},
		...mapState('user',['userInfo'])
	}
}
</script>
<style>
/*页眉的内填充*/
.header {
	padding: 20px 60px;
}
/*顶部选项总体*/
.top-item a {
	color: #777777;
	line-height: 40px;
}
/*顶部选项的li宽*/
.top-item li {
	width: 100px;
	text-align: center;
}
/*顶部选项竖线  |  的宽度*/
.top-item .li-split {
	width: 10px;
}
/*搜索文本框宽度*/
#search {
	width: 300px;
}
/*顶部导航条*/
.top-nav {
	background-color: #F2F2F2;
	height: 50px;
	padding-top: 6px;
	margin-bottom: 20px;
}
/*管理下拉框样式*/
#top-dropdown-btn {
	color: #777777;
}
/*管理下拉框li*/
.top-dropdown-ul li {
	width: 100%;
}
.avatar{
		width:70px; 
        height:50px; 
        border-radius:50%; 
}
</style>