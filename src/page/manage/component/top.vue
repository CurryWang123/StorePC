<template>
    <ul class="nav nav-tabs">
		<li :class="{active:isPassword}"><router-link to="/manage/password">修改密码</router-link></li>
		<li :class="{active:isUpload}"><router-link to="/manage/upload">上传头像</router-link></li>
		<li :class="{active:isUserData}"><router-link to="/manage/userData">个人资料</router-link></li>
		<li :class="{active:isAddress}"><router-link to="/manage/address">收货管理</router-link></li>
	</ul>
</template>
<script>
export default {
    name:'top',
	data(){
		return{
			isPassword:false,
			isUpload:false,
			isUserData:false,
			isAddress:false
		}
	},
	mounted()
	{
		if(this.$route.name === 'password')
		{
			this.isPassword = true
		}
		else if(this.$route.name === 'upload')
		{
			this.isUpload = true
		}
		else if(this.$route.name === 'userData')
		{
			this.isUserData = true
		}
		else if(this.$route.name === 'address')
		{
			this.isAddress = true
		}
	}
}
</script>