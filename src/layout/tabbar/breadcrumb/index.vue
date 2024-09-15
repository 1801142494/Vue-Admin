<template>
    <div class="tabbar_left">
        <!-- 顶部左侧静态 -->
        <el-icon style="margin-right: 10px;" @click="changeIcon">
            <component :is="LayoutSettingStore.fold?'Fold':'Expand'"></component>
        </el-icon> 
        <!-- 左侧面包屑 -->
        <el-breadcrumb separator-icon="ArrowRight">
            <!-- 动态展示 -->
            <el-breadcrumb-item v-for="(item,index) in $router.matched" :key="index" v-show="item.meta.title" :to="item.path">
                <!-- 图标 -->
                <el-icon  style="vertical-align: middle;">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <!-- 面包屑标题 -->
                <span  style="margin: 0px 5px;">{{ item.meta.title }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import useLayoutSettingStore from '@/store/modules/setting';
// 获取路由
import {useRoute} from 'vue-router'
let $router =useRoute();
// 获取layout配置相关的仓库
let LayoutSettingStore=useLayoutSettingStore()
// 定义响应式数据控制图标切换
let fold=ref(false)
// 点击图标的方法
const changeIcon =()=>{
    // 图标切换
    LayoutSettingStore.fold=!LayoutSettingStore.fold
}
</script>

<script lang="ts">
export default {
    name:'Breadcrumb'
}
</script>

<style scoped>

</style>