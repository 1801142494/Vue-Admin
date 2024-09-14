<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                 <el-menu background-color="$base-menu-background" text-color="white" 
                 :default-active="$route.path"
                 active-text-color="yellowgreen">
                    <!-- 根据路由动态生成菜单 -->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                 </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">
            <!-- 顶部导航tabbar组件 -->
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区 -->
        <div class="layout_main">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang='ts'>
// 获取路由对象,用于当页面刷新时候依然定位当前页面
import { useRoute } from 'vue-router';
//引入左侧logo子组件
import Logo from './logo/index.vue'
// 引入菜单组件
import Menu from './menu/index.vue'
// 右侧内容展示区
import Main from './main/index.vue'
// 右侧tabbar
import Tabbar from './tabbar/index.vue'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user';
let userStore=useUserStore()
const $route=useRoute();
</script>

<style scoped lang="scss">
    .layout_container{
        width: 100%;
        height: 100vh;
        .layout_slider{
            width: $base-menu-width;
            height: 100vh;
            background: $base-menu-background;
            .scrollbar{
                height: calc(100vh - $base-menu-logo-height);
                .el-menu{
                    border-right: none;
                }
            }
        }
        .layout_tabbar{
            position: fixed;
            top: 0px;
            left: $base-menu-width;
            width: calc(100% - $base-menu-width);
            height: $base-tabbar-height;
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