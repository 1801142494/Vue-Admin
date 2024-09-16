<template>
     <div class="tabbar_right">
        <el-button icon="Refresh" circle @click="refresh"></el-button>
        <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
        <el-button icon="Setting" circle @click=""></el-button>
        <img :src="userStore.avatar" style="width: 30px; height: 30px; margin: 0px 10px; border-radius: 50%;">
        <!-- 下拉菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                {{userStore.username}}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
            </span>
            <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
// 引入tabbar设置相关仓库
import useLayoutSettingStore from '@/store/modules/setting.ts'
// 引入用户相关仓库
import useUserStore from '@/store/modules/user';
let userStore =useUserStore()
let layoutSettingStore = useLayoutSettingStore()
// 获取路由器对象
let $router =useRouter()
// 获取路由对象
let $route =useRoute()
// 刷新按钮点击回调
const refresh=()=>{
    layoutSettingStore.refresh=!layoutSettingStore.refresh
}
// 全屏按钮点击回调
const fullScreen=()=>{
    // Dom对象的一个属性，用来判断当前是不是全屏[全屏：true,不是全屏：false]
    let full=document.fullscreenElement
    if(!full){
        // 利用文档根节点的requestFullscreen，实现全屏
        document.documentElement.requestFullscreen()
    }else{
        //退出全屏
        document.exitFullscreen()
    }
}
// 退出登录点击回调
const logout=()=>{
    // 第一件事：向服务器发送请求
    // 第二件事：清除仓库当中关于用户相关的数据
    // 第三件事：跳转到登录页面
    userStore.userLogout();
    $router.push({path:'/login',query:{redirect:$route.path}})
}
</script>

<script lang="ts">
export default {
    name:'Setting'
}
</script>

<style scoped>

</style>