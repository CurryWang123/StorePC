<template>
        <el-col :span="12">
            <div class="panel panel-default">
					<top/>
					<div class="panel-body">
						<!--修改密码表单开始-->
						<form id="form-change-password" class="form-horizontal" role="form">
							<div class="form-group">
								<label class="col-md-2 control-label">原密码：</label>
								<div class="col-md-8">
									<input v-model="oldPassword" type="text" class="form-control" placeholder="请输入原密码" @blur="verifyOld">
								</div>
								<div style="color:crimson">{{oldInfo}}</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">新密码：</label>
								<div class="col-md-8">
									<input v-model="newPassword" type="text" class="form-control" placeholder="请输入新密码" @blur="verifyNew">
								</div>
								<div  v-if="verifyNum ===1" style="color:crimson">{{info}}</div>
							</div>
							<div class="form-group">
								<label class="col-md-2 control-label">确认密码：</label>
								<div class="col-md-8">
									<input v-model="checkPassword" type="text" class="form-control" placeholder="请再次输入新密码" @blur="verifyAgain">
								</div>
								<div  v-if="verifyNum ===2" style="color:crimson">两次新密码不一致</div>
							</div>
							<div class="form-group">
								<div class="col-sm-offset-2 col-sm-10">
									<input id="btn-change-password" type="button" class="btn btn-primary" value="修改" @click="change" />
								</div>
							</div>
						</form>
					</div>
				</div>
        </el-col>
</template>
<script>
import {changePassword} from '@/api/user/user.js'
import { mapMutations } from 'vuex';
import top from '../component/top.vue'
export default {
    name: "password",
    components: {top},
	data(){
		return{
			oldPassword:'',
			newPassword:'',
			checkPassword:'',
			// 通过验证的次数，每通过一次，数字加一
			verifyNum:0,
			oldInfo:'',
			// 表单验证提示语言
			info:'',
			user: JSON.parse(localStorage.getItem('userInfo'))
		}
	},
	methods:{
		// 旧密码验证
		verifyOld(){
			if(this.oldPassword === '')
			{
				this.$message({
					showClose: true,
					message: '原密码不能为空',
					type: 'warning'
        		});
				this.verifyNum = 0
				this.oldInfo = '原密码不能为空'
			}else{
				this.verifyNum = 1
				this.oldInfo = ''
			}
		},
		// 新密码验证
		verifyNew()
		{
			if(this.oldPassword === '')
			{
				this.$message({
					showClose: true,
					message: '原密码不能为空',
					type: 'warning'
        		});
				this.oldInfo = '原密码不能为空'
			}else{
					if(this.newPassword === '')
				{
					this.$message({
						showClose: true,
						message: '新密码不能为空',
						type: 'warning'
        		});
				this.verifyNum = 1
				this.info = '新密码不能为空'
				}else{
					if(this.newPassword === this.oldPassword)
					{
						this.$message({
						showClose: true,
						message: '新密码不能与旧密码一样',
						type: 'warning'
        				});
						this.info = '新密码不能与旧密码一样'
						this.verifyNum = 1
					}else{
						this.verifyNum = 2
					}
				}
			}
		
		},
		// 验证两次新密码是否一致
		verifyAgain()
		{
			if(this.newPassword === '')
				{
					this.$message({
						showClose: true,
						message: '新密码不能为空',
						type: 'warning'
        		});
				this.verifyNum = 1
				}else{
						if(this.newPassword !== this.checkPassword)
						{
							this.$message({
								showClose: true,
								message: '两次新密码不一致，请重新输入',
								type: 'warning'
							});
							this.verifyNum = 2
						}else{
							this.verifyNum = 3
						}
				}
		
		},
		// 修改密码
		change()
		{
			if(this.verifyNum < 3)
			{
				this.$message({
								showClose: true,
								message: '请先规范输入表单',
								type: 'warning'
							});
			}else{
				changePassword({
					uid:this.user.uid,
					username:this.user.username,
					oldPassword:this.oldPassword,
					newPassword:this.newPassword
				}).then(res => {
					if(res.data.state === 200)
					{
						this.$message({
							showClose: true,
							message: '修改密码成功,请重新登录',
							type: 'success'
        					});
						this.LoginOut()
						this.$router.replace('/login')
					}else{
						this.$message({
							showClose: true,
							message: res.data.message,
							type: 'error'
							});
					}
				})
			}
		},
		...mapMutations('user',['LoginOut'])
	}
}
</script>