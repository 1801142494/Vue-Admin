<template>
    <template v-for="item in menuList" :key="item.path">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item 
            v-if="!item.meta.hidden" 
            :index="item.path"
            @click="goRoute">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
        </template>
        <!-- 有子路由，但只有一个 -->
        <el-menu-item 
        v-if="item.children&&item.children.length==1&&!item.children[0].meta.hidden" 
        :index="item.children[0].path"
        @click="goRoute">
            <template #title>
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <span>{{ item.children[0].meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 有多个子路由 -->
        <el-sub-menu 
        :index="item.path" v-if="item.children&&item.children.length>1&&!item.meta.hidden">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang='ts'>
// 引入路由
import { useRouter } from 'vue-router';
const $router =useRouter();
//获取父组件传递过来的全部路由数组
defineProps(['menuList'])
// 点击菜单的回调
const goRoute=(vc:any)=>{
    //编程式路由跳转
    $router.push(vc.index)
}
</script> 

<script lang="ts">
export default {
    name:'Menu'
}
</script>

<style scoped>

</style>