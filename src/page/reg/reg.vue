<template>
    <div>
    <MyHeader/>
    <el-container direction="vertical" class="myContainer">
    <el-row><h1>用户注册</h1></el-row>
    <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">&nbsp;</div></el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple-light">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                <el-input v-model.number="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            </div>
        </el-col>
    </el-row>
    </el-container>
    <MyFooter/>
    </div>
</template>
<script>
import MyHeader from '@/components/header/myHeader.vue';
import MyFooter from '@/components/footer/myFooter.vue';
import { mapActions } from 'vuex';
export default {
    name: "reg",
    components: { MyHeader,MyFooter },
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话号码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
              callback();
            }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validateUser = (rule, value, callback) =>{
        if(value === '')
        {
            callback(new Error('请输入用户名'));
        }else{
            callback();
        }
      };
      return {
        ruleForm: {
          username:'',
          password: '',
          checkPass: '',
          phone: ''
        },
        rules: {
          username:[
            { validator: validateUser, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.register(this.ruleForm).then(res =>{
                if(res.state == 200)
                {
                    this.$message({
                        message: '注册成功!',
                        type: 'success'
                 })
                 this.$router.push('/login')
                }else{
                    this.$message.error(res.message);
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      ...mapActions('user',['register'])
    }
  }
</script>
<style scoped>
    h1{
        Text-align:center;
        font-family: "Microsoft YaHei";
    }
    .myContainer{
        background-image: url('@/assets/images/index/bg1.png');
        Background-size:cover
    }
</style>