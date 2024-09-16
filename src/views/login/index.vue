<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
            <h1>Hello</h1>
            <h2>欢迎来到后台管理系统</h2>
            <el-form-item prop="username">
                <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" :prefix-icon="Lock" show-password v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :loading="isLoading" type="primary" class="login_btn" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
    import {User,Lock} from '@element-plus/icons-vue'
    import { reactive,ref } from 'vue';
    // 引入用户相关小仓库
    import useUserStore from '@/store/modules/user';
    // 引入路由器和路由
    import { useRouter,useRoute } from 'vue-router';
    // 引入element-plus 
    import { ElNotification } from 'element-plus';
    // 引入获取当前时间的函数
    import { getTime } from '@/utils/time';
    // 路由对象
    let $route =useRoute()
    let useStore =useUserStore()
    //数据
    let loginForm=reactive({username:'admin',password:'111111'})
    let isLoading=ref(false)
    // 获取el-form组件
    let loginForms =ref()
    //获取路由器实例
    let $router =useRouter();
    // 登录的按钮回调
    const login=async ()=>{
        // 保证表单全部校验后再发请求
        await loginForms.value.validate()
        //登录按钮加载状态
        isLoading.value=true
        //点击登录后
        // 1.通知仓库发送登录请求
        // 2.请求成功--首页展示数据的地方
        // 3.请求失败--弹出登录失败信息
        try{
            //保证登录成功
            await useStore.userLogin(loginForm)
            // 通过编程式路由跳到首页
            // 判断登录的时候，路径是否携带query
            let redirect:any =$route.query.redirect
            $router.push({path:redirect||'/'})
            // 登录成功提示信息
            ElNotification({
                type:'success',
                message:'欢迎回来',
                title:`HI,${getTime()}好`
            })
            //登录按钮加载状态
            isLoading.value=false
        }catch(error){
            // 登录失败提示信息
            ElNotification({
                type:'error',
                message:(error as Error).message
            })
            //登录按钮加载状态
            isLoading.value=false
        }
    }
    // 自定义表单验证
    const validateUsername =(rule: any, value: any, callback: any)=>{
        if (value === '') {
            callback(new Error('输入不能为空'))
        }
        if (value.length >= 5) {
            callback()
        }else{
            callback(new Error('账号长度至少五位'))
        }
    }
    const validatePassword =(rule: any, value: any, callback: any)=>{
        if (value === '') {
            callback(new Error('输入不能为空'))
        }
        if (value.length >= 6) {
            callback()
        }else{
            callback(new Error('密码长度至少六位'))
        }
    }
    // 定义表单验证配置对象
    const rules={
        username: [
            // 规则对象属性：
            // required，这个字段必须校验
            // min,max长度限制
            // message，信息提示
            // trigger 触发校验的时机
            { validator: validateUsername, trigger: 'blur' }
        ],
        password:[
            { validator: validatePassword, trigger: 'blur' }
        ]
    }
</script>

<style scoped>
    .login_container{
        width: 100%;
        height: 100vh;
        background-image: url('@/assets/images/background.jpg');
        background-size: cover;
        .login_form{
        position: relative;
        width: 80%;
        top: 30vh;
        background-image: url('@/assets/images/login_form.png');
        padding: 40px;
        h1{
            color: white;
            font-size: 40px;
        }
        h2{
            color: white;
            font-size: 20px;
            margin: 20px 0px;
        }
        .login_btn{
            width: 100%;
        }
    }
    }
    
</style>