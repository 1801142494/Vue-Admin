<template>
    <!-- card组件，显示用户信息 -->
    <el-card>
        <div class="box">
            <img :src="useStore.avatar" alt="头像" class="avatar">
            <div class="userInfo">
                <h3 class="title">{{getTime()}}好呀 {{ useStore.username }}</h3>
                <p class="subtitle">{{ setting.title }}</p>
            </div>
        </div>
    </el-card>
    <!-- 自定义组件，显示背景图 -->
    <div class="bottom">
        <svg-icon name="welcome" width="500px" height="400px"></svg-icon>
    </div>
</template>

<script setup lang='ts'>
// 引入用户相关仓库
import useUserStore from '@/store/modules/user';
// 引用获取当前时间的方法
import { getTime } from '@/utils/time';
// 引用setting
import setting from '@/setting';
// 获取存储用户数据仓库的对象
let useStore =useUserStore()
</script>

<style scoped lang="scss">
.box{
    display: flex;
    .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .userInfo{
        margin-left: 20px;
        .title{
            font-size: 30px;
            font-weight: 900;
            margin-bottom: 30px;
        }
        .subtitle{
            font-style: italic;
            color:darkcyan;
        }
    }
}
.bottom{
    display: flex;
    justify-content: center;
}
</style>