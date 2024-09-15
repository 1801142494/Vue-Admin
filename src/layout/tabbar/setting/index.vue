<template>
     <div class="tabbar_right">
        <el-button icon="Refresh" circle @click="refresh"></el-button>
        <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
        <el-button icon="Setting" circle @click=""></el-button>
        <img src="../../../../public/pamu.png" style="width: 30px; height: 30px; margin: 0px 10px;">
        <!-- 下拉菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                admin
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
            </span>
            <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang='ts'>
// 引入tabbar设置相关仓库
import useLayoutSettingStore from '@/store/modules/setting.ts'
let layoutSettingStore = useLayoutSettingStore()
// 刷新点击事件回调
const refresh=()=>{
    layoutSettingStore.refresh=!layoutSettingStore.refresh
}
// 全屏事件回调
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
</script>

<script lang="ts">
export default {
    name:'Setting'
}
</script>

<style scoped>

</style>