<template>
    <div class="tabbar">
        <!-- 左侧面包屑 -->
        <BreadCrumb></BreadCrumb>
        <!-- 右侧设置 -->
        <Setting></Setting>
    </div>
</template>

<script setup lang='ts'>
    import BreadCrumb from './breadcrumb/index.vue'
    import Setting from './setting/index.vue'
</script>

<script lang="ts">
export default{
    name:'Tabbar'
}
</script>

<style scoped lang="scss">
.tabbar{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(to right,rgb(255, 255, 255),rgb(237, 232, 232),rgb(238, 238, 238));
    .tabbar_left{
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    .tabbar_right{
        display: flex;
        align-items: center;
        margin-right: 10px;
    }
}
</style>