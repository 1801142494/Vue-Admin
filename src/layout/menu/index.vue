<template>
    <template v-for="item in menuList" :key="item.path" >
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item 
            v-if="!item.meta.hidden" 
            :index="item.path">
            <template #title>
                <span>标&nbsp;</span>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
        </template>
        <!-- 有子路由，但只有一个 -->
        <el-menu-item 
        v-if="item.children&&item.children.length==1&&!item.children[0].meta.hidden" 
        :index="item.children[0].path">
            <template #title>
                <span>标&nbsp;</span>
                <span>{{ item.children[0].meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 有多个子路由 -->
        <el-sub-menu 
        :index="item.path" v-if="item.children&&item.children.length>1&&!item.meta.hidden">
            <template #title>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang='ts'>
//获取父组件传递过来的全部路由数组
defineProps(['menuList'])
</script> 

<script lang="ts">
export default {
    name:'Menu'
}
</script>

<style scoped>

</style>