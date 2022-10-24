<template>
<div>
     <h2>商品评价:</h2>
     <el-row>
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="20">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <el-col :span="2"><img  src="@/assets/images/index/404_img1.png" class="avatar" /></el-col>
                         <el-col :span="10">小王</el-col>
                         <el-col :span="12">
                                <el-rate
                                    disabled
                                    v-model="val"
                                    :colors="colors">
                                </el-rate>
                         </el-col>
                    </div>
                    <div  class="text item">
                        <el-row>
                        牛牛牛------------------------------------------------------------------
                        </el-row>
                        <el-row>
                            <img  src="@/assets/images/index/404_img1.png" class="img-responsive" />
                        </el-row>
                    </div>
                </el-card>
                 <el-card class="box-card">
                    <div slot="header" class="clearfix">
                         <el-col :span="2"><img  src="@/assets/images/index/404_img1.png" class="avatar" /></el-col>
                         <el-col :span="10">小王</el-col>
                         <el-col :span="12">
                                <el-rate
                                    disabled
                                    v-model="val"
                                    :colors="colors">
                                </el-rate>
                         </el-col>
                    </div>
                    <div  class="text item">
                        <el-row>
                        牛牛牛------------------------------------------------------------------
                        </el-row>
                        <el-row>
                            <img  src="@/assets/images/index/404_img1.png" class="img-responsive" />
                        </el-row>
                    </div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                          <el-col :span="2"><img  src="@/assets/images/index/404_img1.png" class="avatar" /></el-col>
                         <el-col :span="10">小王</el-col>
                         <el-col :span="12">
                                <el-rate
                                    disabled
                                    v-model="val"
                                    :colors="colors">
                                </el-rate>
                         </el-col>
                    </div>
                    <div  class="text item">
                        <el-row>
                        牛牛牛------------------------------------------------------------------
                        </el-row>
                        <el-row>
                            <img  src="@/assets/images/index/404_img1.png" class="img-responsive" />
                        </el-row>
                    </div>
                </el-card>
        </el-col>
     </el-row>
</div>
   
</template>
<script>
export default {
    name:'evaluate',
    data(){
        return{
            val:3,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900']
        }
    }
}
</script>
<style scoped>


  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1000px;
    margin-bottom: 30px;
  }
</style>