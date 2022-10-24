<template>
    <div>
        <MyHeader/>
        <el-row>
            <el-col :span="3">
				<el-col :span="6"><div class="grid-content bg-white"></div></el-col>
			</el-col>
            <!-- 主体 -->
			<el-col :span="18">
                <h3 style="text-align: center">评价中心</h3>
                <el-row>
                    <el-col :span="6">&nbsp;</el-col>
                    <el-col :span="18">
                        <div class="panel panel-default">
                        <div class="panel-body">
						    <table class="orders-table" width="50%">
							    <thead>
							    	<tr>
                                        <th width="15%"></th>
                                        <th width="30%">商品</th>
                                        <th width="8%">单价</th>
                                        <th width="8%">数量</th>
                                        <th width="9%">小计</th>
                                    </tr>
                                </thead>
                                <tbody class="orders-body">
                                    <tr v-for="(product,i) in orderItemList" :key="i">
                                        <td><img :src="require('@/assets'+(product.image)+'collect.png')" class="img-responsive" /></td>
                                        <td>{{product.title}}</td>
                                        <td>¥<span>{{product.price}}</span></td>
                                        <td>{{product.num}}件</td>
                                        <td>¥<span>{{product.price * product.num}}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                    
                        </div>
                    </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">&nbsp;</el-col>
                    <el-col :span="18">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="商品评价">
                                <el-rate
                                    v-model="form.level"
                                    :colors="colors">
                                </el-rate>
                            </el-form-item>
                            <el-form-item label="文字评价">
                                <el-input type="textarea" v-model="form.content"></el-input>
                            </el-form-item>
                            <el-form-item label="晒图">
                                <el-upload
                                    action="http://localhost:8087/evaluate-center/evaluate/uploadPhoto"
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-success="uploadSuccess"
                                    	>
                                    <i class="el-icon-plus"></i>
                                 </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" class="comment">立即评价</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">&nbsp;</el-col>
                    <el-col :span="4"><router-link :to="{name:'orderList'}" >返回</router-link></el-col>
                </el-row>
            </el-col>
        </el-row>
        <MyFooter/>
    </div>
</template>
<script>
import MyHeader from "@/components/header/myHeader.vue";
import MyFooter from "@/components/footer/myFooter.vue";
import {addAvaluate} from "@/api/evaluate/evaluate.js";
export default {
    name:'evaluateCenter',
    components: { MyFooter,MyHeader },
    data(){
        return {
            user: JSON.parse(localStorage.getItem('userInfo')),
            orderItemList:this.$route.query.orderItemList,
            form:{
                level:0,
                content:'',
                photoList:[]
            },
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    methods:{
         uploadSuccess(file) {
            console.log(file.data)
         this.form.photoList.push(file.data)
      },
         handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      onSubmit()
      {
        let pidList = [];
        for(let i = 0;i<this.orderItemList.length;i++)
        {
            pidList.push(this.orderItemList[i].pid)
        }
        let data = {
            uid:this.user.uid,
            username:this.user.username,
            content:this.form.content,
            level:this.form.level,
            evaluatePhotos:this.form.photoList,
            pidList:pidList
        }
        addAvaluate(data).then(res =>{
            if(res.data.state === 200)
            {
                		this.$message({
						message: '评价成功',
						type: 'success'
                                        });
            }
        })
      }
    }
}
</script>
<style scoped>
    .comment{
        margin-top: 80px;
    }
</style>