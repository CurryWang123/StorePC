<template>
            <el-col :span="12">
                		<div class="panel panel-default">
					<top/>
					<div class="panel-body">
						<!--修改资料表单开始-->
						<form id="form-change-info" class="form-horizontal" role="form">
							<div class="form-group">
								<label class="col-md-2 control-label">用户名：</label>
								<div class="col-md-8">
									<input id="username" type="text" class="form-control" v-model="user.username" readonly="readonly">
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">电话号码：</label>
								<div class="col-md-8">
									<input id="phone" name="phone" type="text" class="form-control" placeholder="请输入电话号码" v-model="user.phone">
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">电子邮箱：</label>
								<div class="col-md-8">
									<input id="email" name="email" type="text" class="form-control" placeholder="请输入电子邮箱" v-model="user.email">
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">性别：</label>
								<div class="col-md-8">
									<label class="radio-inline">
										<input id="gender-male" type="radio" name="gender"  value="1" checked>男
									</label>
									<label class="radio-inline">
										<input id="gender-female" type="radio" name="gender" value="0">女
									</label>
								</div>
							</div>
							<div class="form-group">
								<div class="col-sm-offset-2 col-sm-10">
									<input id="btn-change-info" type="button" class="btn btn-primary" value="修改" @click="updateInfo" />
								</div>
							</div>
						</form>
					</div>
				</div>
            </el-col>
</template>
<script>
import {changeInfo} from '@/api/user/user.js';
import { mapActions } from 'vuex';
import top from '../component/top.vue'
export default {
    name:'userData',
    components: {top},
	data()
	{
		return{
			user: JSON.parse(localStorage.getItem('userInfo'))
		}
	},
	methods:{
		updateInfo(){
			changeInfo({
				username:this.user.username,
				phone:this.user.phone,
				email:this.user.email,
				gender:this.user.gender,
				uid:this.user.uid
			}).then(res =>{
				if(res.data.state === 200)
				{
					this.$message({
                        message: '修改信息成功!',
                        type: 'success'
                 })
				 this.getUserByUid({uid:this.user.uid})
				}else{
					this.$message.error(res.data.message)
				}

			})
		},
		...mapActions('user',['getUserByUid'])
	}
}
</script>