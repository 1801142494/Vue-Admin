<template>
    <div class="top">
            <!-- 顶部左侧区域 -->
            <div class="left">
                <span class="lbtn" @click="goHome">首页</span>
            </div>
            <!-- 顶部中间区域 -->
            <div class="center">
                <div class="title">智慧旅游可视化大数据平台</div>
            </div>
            <!-- 顶部右侧区域 -->
            <div class="right">
                <span class="rbtn">统计报告</span>
                <span class="time">{{time}}</span>
            </div>
    </div>
</template>

<script setup lang='ts'>
import { ref,onMounted,onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
// 引入获取时间的插件
import moment from 'moment';
// 获取路由器对象
let $router=useRouter()
// 存储当前时间
let time=ref<any>(moment().format('YYYY年-MM月-DD日:hh时-mm分-ss秒'))
let timer=ref<any>('')
// 跳转到首页的按钮回调
const goHome=()=>{
    $router.push('/home')
}
// 组件挂在完毕，实时更新时间
onMounted(()=>{
    setInterval(()=>{
        timer=time.value=ref<any>(moment().format('YYYY年-MM月-DD日:hh时-mm分-ss秒'))
    },1000)
})
// 组件销毁之前，清除定时器
onBeforeUnmount(()=>{
    clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top{
    width: 100%;
    height: 40px;
    display: flex;
    .left{
        flex: 1.5;
        background: url('../../images/dataScreen-header-left-bg.png') no-repeat;
        background-size: 100% 100%;
        .lbtn{
            width: 150px; 
            height: 40px;
            float: right;
            background: url('../../images/dataScreen-header-btn-bg-l.png') no-repeat;
            background-size: 100% 100%;
            line-height: 40px;
            text-align: center;
            color: #29fcff;
            font-size: 20px;
        }
    }
    .center{
        flex: 2;
        .title{
            width: 100%;
            height: 74px;
            background: url('../../images/dataScreen-header-center-bg.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 74px;
            color: #29fcff;
            font-size: 32px;
        }
    }
    .right{
        flex: 1.5;
        background: url('../../images/dataScreen-header-right-bg.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rbtn{
           width: 150px; 
           height: 40px;
           float: left;
           background: url('../../images/dataScreen-header-btn-bg-r.png') no-repeat;
           background-size: 100% 100%;
           line-height: 40px;
           text-align: center;
           color: #29fcff;
           font-size: 20px;
        }
        .time{
            color: #29fcff;
            font-size: 18px;
        }
    }
}
</style>