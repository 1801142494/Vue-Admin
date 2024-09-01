<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules">
            <h1>Hello</h1>
            <h2>欢迎来到后台管理系统</h2>
            <el-form-item porp="username">
                <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item porp="password">
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
    // 引入路由器
    import { useRouter } from 'vue-router';
    // 引入element-plus 
    import { ElNotification } from 'element-plus';
    // 引入获取当前时间的函数
    import { getTime } from '@/utils/time';
    let useStore =useUserStore()
    //数据
    let loginForm=reactive({username:'admin',password:'111111'})
    let isLoading=ref(false)
    //获取路由器实例
    let $route =useRouter();
    // 登录的按钮回调
    const login=async ()=>{
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
            $route.push('/')
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
    // 定义表单验证配置对象
    const rules={
        username:[
            { required: true, message: '用户名不能为空', trigger: 'change' },
        ],
        password:[]
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