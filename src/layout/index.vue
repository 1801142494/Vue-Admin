<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{fold:LayoutSettingStore.fold}">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                 <el-menu background-color="#001529"
                  text-color="white"
                 :default-active="$route.path"
                 :collapse="LayoutSettingStore.fold"
                 active-text-color="yellowgreen">
                    <!-- 根据路由动态生成菜单 -->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                 </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{fold:LayoutSettingStore.fold}">
            <!-- 顶部导航tabbar组件 -->
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区 -->
        <div class="layout_main" :class="{fold:LayoutSettingStore.fold}">
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
import useLayoutSettingStore from '@/store/modules/setting';
// 获取layout配置相关的仓库
let LayoutSettingStore=useLayoutSettingStore()
let userStore=useUserStore()
const $route=useRoute();
</script>

<script lang="ts">
    export default {
        name:'Layout'
    }
</script>
<style scoped lang="scss">
    .layout_container{
        width: 100%;
        height: 100vh;

        .layout_slider{
            width: $base-menu-width;
            height: 100vh;
            transition: all 0.3s;
            background: $base-menu-background;
            .scrollbar{
                height: calc(100vh - $base-menu-logo-height);
                .el-menu{
                    border-right: none;
                }
            }
            //当菜单折叠，缩小左侧菜单宽度
            &.fold{
                width: $base-menu-min-width;
            }
        }
        .layout_tabbar{
            position: fixed;
            top: 0px;
            left: $base-menu-width;
            width: calc(100% - $base-menu-width);
            height: $base-tabbar-height;
            transition: all 0.3s;

            //当菜单折叠，改变当前布局
            &.fold{
                width: calc(100% - $base-menu-min-width);
                left: $base-menu-min-width;
            }
        }
        .layout_main{
            position: absolute;
            top: $base-tabbar-height;
            left: $base-menu-width;
            width: calc(100% - $base-menu-width);
            height: calc(100vh - $base-tabbar-height);
            padding: 20px;
            overflow: auto;
            transition: all 0.3s;
            //当菜单折叠，改变当前布局
            &.fold{
                width: calc(100% - $base-menu-min-width);
                left: $base-menu-min-width;
            }
        }
    }
</style>