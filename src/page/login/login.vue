<template>
    <!--主体-->
	    <div>
		<MyHeader></MyHeader>
		<div class="container mycontent text-left">
			<!--透明层 -->
			<div class="loginDiv">
				<el-tabs v-model="activeName" type="card" >
					<el-tab-pane label="用户名密码登录" name="first">
						<!--表单开始-->
						<form id="form-login" class="form-horizontal" role="form">
							<!--用户名-->
							<div class="form-group">
								<label for="username" class="col-md-3 control-label">用户名：</label>
								<div class="col-md-8">
									<input name="username" type="text" class="form-control" id="username" placeholder="请输入用户名" v-model="username">
								</div>
							</div>
							<!--密码-->
							<div class="form-group">
								<label for="password" class="col-md-3 control-label"> 密码：</label>
								<div class="col-md-8">
									<input name="password" type="text" class="form-control" id="password" placeholder="请输入密码" v-model="password">
								</div>
							</div>
							
							<!--提交按钮-->
							<div class="form-group">
								<label class="col-md-3 control-label"></label>
								<div class="col-md-8">
									<input id="btn-login" class="btn btn-primary" type="button" value="登录" @click="login()" />
									<span class="pull-right"><small>还没有账号？</small><router-link to="/reg">注册</router-link></span>
								</div>
							</div>
						</form>
					</el-tab-pane>
					<el-tab-pane label="手机号登录" name="second">
						<form id="form-login" class="form-horizontal" role="form">
							<div class="form-group">
								<label for="username" class="col-md-3 control-label">手机号：</label>
								<div class="col-md-8">
									<input name="phone" type="text" class="form-control"  placeholder="请输入手机号" v-model="phone">
								</div>
							</div>
							<div class="form-group" >
								<label for="username" class="col-md-3 control-label">验证码：</label>
								<div class="col-md-8">
									<input name="code" type="text" class="form-control"   v-model="code">
									<a v-if="durationTime === 0" @click="getPhoneCode()">点击获取验证码</a>
									<span v-else>
										<countdown v-slot="timeObj" :time="time" ref="mycountdown">
											<div class="count-down">
												<div class="icon"></div>
												{{timeObj.ss}}秒
											</div>
										</countdown>
									</span>
								</div>
							</div>
							<div class="form-group">
								<label class="col-md-3 control-label"></label>
								<div class="col-md-8">
									<input id="btn-login" class="btn btn-primary" type="button" value="登录" @click="loginByCode()" />
									<span class="pull-right"><small>还没有账号？</small><router-link to="/reg">注册</router-link></span>
								</div>
							</div>
						</form>
					</el-tab-pane>
				</el-tabs>
				
			</div>
		</div>
		<MyFooter/>
		</div>
</template>
<script>
import MyFooter from '@/components/footer/myFooter.vue'
import MyHeader from '@/components/header/myHeader.vue'
import { mapActions } from 'vuex';
import {getCode} from '@/api/user/user.js';
import countdown from './components/countdown.vue';
export default {
    name: "login",
    data() {
        return {
            username: "",
            password: "",
			activeName: 'first',
			phone:'',
			code:'',
			time:0,
			// 计时器
			timer:null
        };
    },
    methods: {
        login() {
			if(this.username == '')
			{
				 this.$message({
          		 message: '用户名不能为空',
          		 type: 'warning'
        					  });
			}else{
				if(this.password == '')
			{
				 this.$message({
          		 message: '密码不能为空',
          		 type: 'warning'
        					  });
			}else{
				const res = this.userLogin({
				username:this.username,
				password:this.password
				}).then(res =>{
					if (res.state == 200)
				{
					this.$router.push('/index')
				}else{
					this.$message.error(res.message);
				}							
							  })

			}
			}

        },
		loginByCode(){
			let param = new FormData();
			param.append('phone',this.phone)
			param.append('code',this.code)
			this.userLoginByCode(param).then(res =>{
					if (res.state == 200)
				{
					this.$router.push('/index')
				}else{
					this.$message.error(res.message);
				}							
							  })
		},
		 ...mapActions('user',['userLogin','userLoginByCode']),
		getPhoneCode()
		{
			getCode(this.phone).then(res => {
				if(res.data.state === 200)
				{
					this.$message({
						message: '发送短信成功',
						type: 'success'
						});
					this.time = res.data.data
					this.$store.commit('setDurationTime',1)
				}else{
					this.$message.error(res.data.message);
				}
			})
		}
    },
    components: { MyFooter, MyHeader,countdown },
	computed:{
		durationTime(){
        return this.$store.state.durationTime
    }
	}
}
</script>
<style>
.loginDiv {
	height: 280px;
	width: 500px;
	background-color: rgba(255, 255, 255, 0.85);
	float: right;
	margin: 130px 60px 0 0;
	border-radius: 10px;
	color: #666666;
	padding: 8px;
}
/* 索引页大背景*/
.mycontent {
	background-image: url(~@/assets/images/index/bg1.png);
	background-repeat: no-repeat;
	width: 100%;
	height: 561px;
}
/*索引页半透明层*/
.inputDiv {
	height: 371px;
	width: 270px;
	background-color: rgba(255, 255, 255, 0.7);
	float: right;
	margin: 100px 60px 0 0;
	text-align: center;
	color: cadetblue;
	line-height: 40px;
}
/*索引页几个链接按钮*/
.inputDiv a {
	margin: 8px;
	font-size: 16px;
}
/*按钮宽度	*/
.inputDiv .btn {
	width: 90%;
}
h1{
        Text-align:center
    }
</style>