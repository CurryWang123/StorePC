<template>
            <el-col :span="12">
                	<div class="panel panel-default">
					<top/>
					<div class="panel-body">
						<!--上传头像表单开始-->
						<form id="form-change-avatar" class="form-horizontal" role="form">
							<div class="form-group">
								<label class="col-md-2 control-label">选择头像:</label>
								<div class="col-md-5">
									<img v-if="user.avatar != null " :src="require('@/assets/images/upload/'+(user.avatar))" class="img-responsive" />
									<img v-else src="@/assets/images/index/404_img1.png" class="img-responsive" />
								</div>
								<div class="clearfix"></div>
								<div class="col-md-offset-2 col-md-4">
									<input name="file" type="file" accept="image/png,image/jpeg" @change="updateAvatar" ref="photo"/>
								</div>
							</div>
						</form>
					</div>
				</div>
            </el-col>
</template>
<script>
import {changeAvatar} from '@/api/user/user.js'
import { mapActions } from 'vuex';
import top from '../component/top.vue'
export default {
    name: "upload",
    components: {top},
	data(){
		return{
			user: JSON.parse(localStorage.getItem('userInfo'))
		}
	},
	methods:{
		updateAvatar()
		{
			var f = this.$refs.photo;
			let param = new FormData();
			param.append('file', f.files[0]);//通过append向form对象添加数据
			param.append('uid',this.user.uid)
			param.append('username',this.user.username)
			changeAvatar(param).then(res =>{
				if(res.data.state === 200)
				{
					this.$message({
						showClose: true,
						message: '上传头像成功',
						type: 'success'
        					})
				this.getUserByUid({
					uid:this.user.uid
				}).then(res => {
					this.user = res
				})
				}else{
					this.$message({
							showClose: true,
							message: res.data.message,
							type: 'error'
							});
				}
			})
		},
		...mapActions('user',['getUserByUid'])
	}
}
</script>