<template>
	<div>
	<MyHeader></MyHeader>
    <div class="container">
			<div class="col-md-offset-1 col-md-10">
				<div class="panel panel-primary">
					<div class="panel-heading">
						<p class="panel-title"><span class="fa fa-shopping-cart"></span> 购物车</p>
					</div>
					<div class="panel-body">
						<form role="form" >
							<!--购物车表格开始-->
							<table class="cart-table" width="100%">
								<thead>
									<tr>
										<th width="8%">
											<input type="checkbox" class="ckall" @click="checkall" v-model="allcheck"/>全选</th>
										<th width="110"></th>
										<th width="29%">商品</th>
										<th width="11%">单价</th>
										<th width="15%">数量</th>
										<th width="11%">金额</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody id="cart-list" class="cart-body">
									<tr v-for="(cartdata,index) in cartList" :key="index">
										<td>
											<input type="checkbox" class="ckitem" v-model="cartdata.ischeck" @change="comtotalcheck(index)"/>
										</td>
										<td><img :src="require('@/assets'+(cartdata.image)+'collect.png')" class="img-responsive" /></td>
										<td>{{cartdata.title}}</td>
										<td>¥<span id="goodsPrice1">{{cartdata.price}}</span></td>
										<td>
											<input type="button" value="-" class="num-btn" @click="sub(index)" />
											<input id="goodsCount1" type="text" size="2" readonly="readonly" class="num-text" :value="cartdata.num">
											<input class="num-btn" type="button" value="+" @click="add(index)" />
										</td>
										<td>¥<span id="goodsCast1">{{cartdata.price * cartdata.num}}</span></td>
										<td>
											<input type="button"  class="cart-del btn btn-default btn-xs" value="删除" @click="deleteSingleCart(cartdata.num,cartdata.price)" v-if="cartdata.ischeck" />
										</td>
									</tr>
								</tbody>
							</table>
							<div class="total-bar">
								<span class="pull-right">已选商品
								<span id="selectCount">{{selectCount}}</span>件 总价¥
								<span id="selectTotal">{{totalprice}}</span>元
								</span>
							</div>
							<div>
								<span class="pull-left">
								<input type="button" value="  删  除  " class="btn btn-primary btn-lg link-account"  @click="deleteCarts"/>
							</span>
							</div>
							<div>
								<span class="pull-right">
								<input type="button" value="  结  算  " class="btn btn-primary btn-lg link-account"  @click="account"/>
							</span>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<MyFooter></MyFooter>
		</div>
</template>
<script>

import MyFooter from '@/components/footer/myFooter.vue';
import MyHeader from '@/components/header/myHeader.vue';
import {deleteCart} from '@/api/cart/cart.js'
import { mapActions, mapState } from 'vuex';
export default {
    name: "cart",
    data() {
        return {
            allcheck: false,
            selectCount: 0,
            totalprice: 0,
			checkRwo:0,
			cids:'',
			user: JSON.parse(localStorage.getItem('userInfo'))
        };
    },
    methods: {
        del(index) {
            if (confirm("你确定要删除吗")) {
                this.cartList.splice(index, 1);
            }
        },
        checkall() {
            if (!this.allcheck) {
                for (let i = 0; i < this.cartList.length; i++) {
                    this.cartList[i].ischeck = true;
                    this.selectCount += this.cartList[i].num;
                    this.totalprice += this.cartList[i].num * this.cartList[i].price;
					if(this.cids === '')
					{
						this.cids += this.cartList[i].cid;
					}else{
						this.cids += (","+this.cartList[i].cid);
					}
                }
				this.checkRwo = this.cartList.length
            }
            else {
                for (let i = 0; i < this.cartList.length; i++) {
                    this.cartList[i].ischeck = false;
                    this.selectCount = 0;
                    this.totalprice = 0;
					this.checkRwo = 0;
                }
				this.cids = ''
            }
        },
        sub(index) {
            if (this.cartList[index].num > 0) {
                this.cartList[index].num--;
				this.updateNum({
				cid:this.cartList[index].cid,
				num:this.cartList[index].num,
				modifiedUser:this.user.username
			})
			if (this.cartList[index].ischeck) {
                this.selectCount--
                this.totalprice -= this.cartList[index].price;
            }
            }
        },
        add(index) {
            this.cartList[index].num++;
			this.updateNum({
				cid:this.cartList[index].cid,
				num:this.cartList[index].num,
				modifiedUser:this.user.username
			})
			if (this.cartList[index].ischeck) {
                this.selectCount++
                this.totalprice += this.cartList[index].price;
            }
        },
		// 选中单选框
        comtotalcheck(index) {
            if (this.cartList[index].ischeck == true) {
				this.checkRwo++;
                this.selectCount += this.cartList[index].num;
                if (this.checkRwo == this.cartList.length) {
                    this.allcheck = true;
                }
                this.totalprice += this.cartList[index].num * this.cartList[index].price;
				if(this.cids === '')
				{
					this.cids += this.cartList[index].cid;
				}else{
					this.cids += (","+this.cartList[index].cid);
				}
				
            }
            else {
				this.checkRwo--;
                this.selectCount -= this.cartList[index].num;
                this.allcheck = false;
                this.totalprice -= this.cartList[index].num * this.cartList[index].price;
					if(this.cids.indexOf(',')>0)
					{
						let replaceStr = (","+this.cartList[index].cid)
						this.cids = this.cids.replace(replaceStr,"")
					}else{
						this.cids = ''
					}
					
				
            }
        },
        err() {
            this.$message({
                message: "结算功能暂时未开放哦！",
                type: "warning"
            });
        },
		deleteCarts(){
			deleteCart({cids:this.cids}).then(res =>{
				if(res.data.state == 200)
				{
					this.getCartList(this.user.uid)
					for(let i=0;i<this.cartList.length;i++)
					{
						if(this.cartList[i].ischeck)
						{
							this.selectCount -= this.cartList[i].num
							this.totalprice -= (this.cartList[i].price * this.cartList[i].num)
						}
					}
				}
			})
		},
		deleteSingleCart(num,price)
		{
			deleteCart({cids:this.cids}).then(res =>{
				if(res.data.state == 200)
				{
					this.getCartList(this.user.uid)
					this.totalprice -= (price * num)
					this.selectCount -= num
				}
			})
		},
		account()
		{
			if(this.selectCount<1)
			{
				this.$message.error('你未选择任何商品')
			}else{
					this.$router.push({
					name:'orderConfirm',
					query:{
						cids:this.cids
					}
			})
			}
			
		},
		...mapActions('cart',['getCartList','updateNum'])
    },
	created(){
		this.getCartList(this.user.uid)
	},
    components: { MyFooter, MyHeader },
	computed:{
		...mapState('cart',['cartList'])
	}
}
</script>
<style>
/*表格文字居中*/
.cart-table {
	text-align: center;
}
/*表头文字居中*/
.cart-table th {
	text-align: center;
}
/*数量数字居中*/
.cart-table input {
	text-align: center;
}
/*加减按钮宽度*/
.num-btn {
	width: 30px;
}
/*每行间隙*/
.cart-table tbody tr {
	border-top: 1px dashed #cccccc;
}
/*总价条*/
.total-bar {
	margin: 20px 0;
	background-color: #f0f7fe;
	padding: 15px;
	border-radius: 5px;
}
</style>