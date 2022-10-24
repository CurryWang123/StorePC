<template>
            <el-col :span="12">
                <div class="panel panel-default">
					<top/>
					<div class="panel-body">
						<!--地址显示-->
						<table class="table table-striped">
							<caption>收货地址列表</caption>
							<thead>
								<tr>
									<th>地址类型</th>
									<th>收货人姓名</th>
									<th>详细地址</th>
									<th>联系电话</th>
									<th colspan="3">操作</th>
								</tr>
							</thead>
							<tbody id="address-list">
								<tr v-for="(item,index) in addressList" :key="index">
									<td>{{item.tag}}</td>
									<td>{{item.name}}</td>
									<td>{{item.address}}</td>
									<td>{{item.phone}}</td>
									<td><button class="btn btn-xs btn-info" @click="getAddressByAid(item.aid)"><span class="fa fa-edit"></span> 修改</button></td>
									<td><button class="btn btn-xs add-del btn-info" @click="deleteAddr(item.aid)" ><span class="fa fa-trash-o"></span> 删除</button></td>
									<td><button class="btn btn-xs add-def btn-default" @click="setDefaultAddr(item.aid)">设为默认</button></td>
								</tr>
							</tbody>
						</table>
						<button @click="addDialog = true" class="btn btn-sm btn-primary"><span class="fa fa-plus"></span>新增收货地址</button>
						<!-- 修改地址界面弹出框 -->
						<el-dialog title="修改地址" :visible.sync="updateDialog">
							<el-form :model="address">
								<el-form-item label="收货人" :label-width="formLabelWidth">
									<el-input type="text" v-model="address.name"></el-input>
								</el-form-item>
								<el-form-item label="所在地址" :label-width="formLabelWidth">
									<el-row>
										<el-col :span="20">
										<el-input readonly v-model="address.locate"></el-input>
										</el-col>
										<el-col :span="4">
										<el-button @click="inner = true" type="primary" icon="el-icon-edit" circle></el-button>
										</el-col>
									</el-row>
									<!-- 修改所在地址对话框,最内层 -->
									<el-dialog title="修改所在地址" :visible.sync="inner" append-to-body>
										<el-cascader
										v-model="addressvalue"
										:options="addressOptions"
										@change="handleChange">
										</el-cascader>
										<div slot="footer" class="dialog-footer">
											<el-button @click="inner = false">取 消</el-button>
											<el-button type="primary" @click="inner = false">确 定</el-button>
										</div>
									</el-dialog>
								</el-form-item>
								<el-form-item label="详细地址" :label-width="formLabelWidth">
									<el-input type="text" v-model="address.address"></el-input>
								</el-form-item>
								<el-form-item label="手机号码" :label-width="formLabelWidth">
									<el-input type="text" v-model="address.phone"></el-input>
								</el-form-item>
								<el-form-item label="标签" :label-width="formLabelWidth">
									<el-select v-model="address.tag" placeholder="请选择">
										<el-option
										v-for="item in tagOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="是否默认" :label-width="formLabelWidth">
								<span v-if="address.isDefault == 1">是</span>
								<span v-else>否</span>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="updateDialog = false">取 消</el-button>
								<el-button type="primary" @click="update">确 定</el-button>
							</div>
						</el-dialog>
						<!-- 添加地址弹出框 -->
						<el-dialog title="添加地址" :visible.sync="addDialog">
							<el-form :model="address">
								<el-form-item label="收货人" :label-width="formLabelWidth">
									<el-input type="text" v-model="address.name"></el-input>
								</el-form-item>
								<el-form-item label="所在地址" :label-width="formLabelWidth">
									<el-cascader
										v-model="addressvalue"
										:options="addressOptions"
										@change="handleChange">
									</el-cascader>
								</el-form-item>
								<el-form-item label="详细地址" :label-width="formLabelWidth">
									<el-input type="text" v-model="address.address"></el-input>
								</el-form-item>
								<el-form-item label="手机号码" :label-width="formLabelWidth">
									<el-input type="text" v-model="address.phone"></el-input>
								</el-form-item>
								<el-form-item label="标签" :label-width="formLabelWidth">
									<el-select v-model="address.tag" placeholder="请选择">
										<el-option
										v-for="item in tagOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-form>
							<div slot="footer" class="dialog-footer">
								<el-button @click="addDialog = false">取 消</el-button>
								<el-button type="primary" @click="addAddress">确 定</el-button>
							</div>
						</el-dialog>
					</div>
				</div>
            </el-col>
</template>
<script>
import { mapActions,mapState } from 'vuex';
import {findByAid,updateAddress,setDefault,deleteAddress,addNewAddress} from '@/api/address/address.js';
import { regionData, CodeToText } from 'element-china-area-data';
import top from '../component/top.vue'
export default {
    name:'addresss',
    components: {top },
	data(){
		return{
			user: JSON.parse(localStorage.getItem('userInfo')),
			updateDialog:false,
			addDialog:false,
			inner:false,
			address:{},
			formLabelWidth:'100px',
			tagOptions:[{label:'家',value:'家'},{label:'公司',value:'公司'},{label:'学校',value:'学校'}],
			addressvalue:[],
			addressOptions:regionData
		}
	},
	methods:{
		...mapActions('address',['getAddressList']),
		getAddressByAid(aid)
		{
			findByAid(aid).then(res =>{
				if(res.data.state === 200)
				{
					this.updateDialog = true
					this.address = res.data.data
				}
			})
		},
		// 地址三级联动
		 handleChange() {
				let codeText = ['1','2','3']
				let locate = ''
				if(this.addressvalue.length>0)
				{
					for(let i =0;i<this.addressvalue.length;i++)
				{
					codeText[i] = CodeToText[this.addressvalue[i]]
					locate += CodeToText[this.addressvalue[i]]
				}
				}
				
				this.address.provinceName = codeText[0]
				this.address.provinceCode = this.addressvalue[0]
				this.address.cityName = codeText[1]
				this.address.cityCode = this.addressvalue[1]
				this.address.areaName = codeText[2]
				this.address.areaCode = this.addressvalue[2]
				console.log(this.address.locate)
				this.address.locate = locate
   						 },
			update()
			{
				this.address.username = this.user.username
				updateAddress(this.address).then(res =>{
					if(res.data.state === 200)
					{
						 this.$message({
							message: '修改地址成功',
							type: 'success'
							});
						 this.getAddressList(this.user.uid)
						 this.updateDialog = false
						 this.address = {}
					}else{
						this.$message.error(res.data.message);
					}
				})
			},
			setDefaultAddr(aid)
			{
				setDefault({
					aid:aid,
					uid:this.user.uid,
					username:this.user.username
				}).then(res =>{
					if(res.data.state === 200)
					{
						this.$message({
							message: '修改默认地址成功',
							type: 'success'
							});
					}else{
						this.$message.error(res.data.message);
					}
				})
			},
			deleteAddr(aid)
			{
				deleteAddress({
					aid:aid,
					uid:this.user.uid,
					username:this.user.username
				}).then(res =>{
					if(res.data.state === 200)
					{
						this.$message({
							message: '删除地址成功',
							type: 'success'
							});
						this.getAddressList(this.user.uid)
					}else{
						this.$message.error(res.data.message);
					}
				})
			},
			addAddress(){
				this.address.uid = this.user.uid
				this.address.username = this.user.username
				addNewAddress(this.address).then(res => {
					if(res.data.state === 200)
					{
						this.$message({
							message: '添加地址成功',
							type: 'success'
							});
						this.addDialog = false
						this.getAddressList(this.user.uid)
						this.address = {}
					}else{
						this.$message.error(res.data.message);
					}
				})
			}
	},
	created(){
		this.getAddressList(this.user.uid)
	},
	computed:{
		...mapState('address',['addressList']),
	}
}
</script>