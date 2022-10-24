<template>
    <div>
        <MyHeader/>
        <el-row :gutter="50">
            <el-col :span="4">
                 &nbsp;
            </el-col>
            <el-col :span="4">
                <Sidebar/>
            </el-col>
            <router-view/>
            <el-col :span="4">
                 &nbsp;
            </el-col>
        </el-row>
        <MyFooter/>
    </div>
</template>
<script>
import MyHeader from '@/components/header/myHeader.vue';
import MyFooter from '@/components/footer/myFooter.vue';
import Sidebar from '@/components/sidebar/sidebar.vue';
export default {
    name:'manage',
    components:{
        MyHeader,
        MyFooter,
        Sidebar
    }

}
</script>