<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                 <el-menu background-color="$base-menu-background" text-color="white">
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-menu-item index="2">数据大屏</el-menu-item>
                    <!-- 折叠菜单 -->
                    <el-sub-menu index="3">
                        <template #title>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="3-1">用户管理</el-menu-item>
                        <el-menu-item index="3-2">角色管理</el-menu-item>
                        <el-menu-item index="3-3">菜单管理</el-menu-item>
                    </el-sub-menu>
                 </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">456</div>
        <!-- 内容展示区 -->
        <div class="layout_main">789</div>
    </div>
</template>

<script setup lang='ts'>
//引入左侧logo子组件
import Logo from './logo/index.vue'
</script>

<style scoped lang="scss">
    .layout_container{
        width: 100%;
        height: 100vh;
        background-color: skyblue;
        color: white;
        .layout_slider{
            width: $base-menu-width;
            height: 100vh;
            background: $base-menu-background;
            .scrollbar{
                height: calc(100vh - $base-menu-logo-height);
            }
        }
        .layout_tabbar{
            position: fixed;
            top: 0px;
            left: $base-menu-width;
            width: calc(100% - $base-menu-width);
            height: $base-tabbar-height;
            background: yellow;
        }
        .layout_main{
            position: absolute;
            top: $base-tabbar-height;
            left: $base-menu-width;
            width: calc(100% - $base-menu-width);
            height: calc(100vh - $base-tabbar-height);
            background: orchid;
            padding: 20px;
            overflow: auto;
        }
    }
</style>