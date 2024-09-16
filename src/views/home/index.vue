<template>
    <div>
        <h1>我是一级路由,展示登录成功后的数据</h1>
    </div>
</template>

<script setup lang='ts'>
//引入组合式API生命周期函数
import { onMounted } from 'vue';
// 获取仓库
import useUserStore from '@/store/modules/user';
let userStore=useUserStore()
// 目前首页挂载完毕，发请求获取用户信息
onMounted(() => {
    userStore.userInfo();
})
</script>

<style scoped>

</style>