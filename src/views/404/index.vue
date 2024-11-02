<template>
    <div class="box">
        <img src="../../assets//images//error_images//404.png" alt="404">
        <el-button size="default" @click="goHome">去首页</el-button>
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
let $router =useRouter()
const goHome=()=>{
    $router.push('/')
}
</script>

<style scoped lang="scss">
.box{
    height: 100vh;
    width: 100vw;
    img{
        width: 60vw;
        height: 60vh;
        position: absolute;
        left: 33%;
        top: 20%;
    }
    button{
        width: 70px;
        position: fixed;
        top: 10%;
        left: calc(50% - 35px)
    };
}
</style>