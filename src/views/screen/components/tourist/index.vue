<template>
    <div class="box">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="subtitle"></p>
            <p class="right">可预约总量<span>999999</span>人</p>
        </div>
        <div class="number">
            <span v-for="(item,index) in people" :key="index">{{ item }}</span>
        </div>
        <!-- 展示图形图表 -->
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang='ts'>
import { ref,onMounted } from 'vue';
// 引入echarts插件
import * as echarts from 'echarts'
// 水球图拓展插件
import 'echarts-liquidfill'
// 游客人数
let people=ref<string>('315908人')
// 获取节点
let charts=ref<any>()
// 当组件挂载时
onMounted(()=>{
    //获取charts类的实例
    let myCharts =echarts.init(charts.value)
    // 设置实例的配置项
    myCharts.setOption({
        // 标题组件
        title:{
            text:''
        },
        // x|y轴组件
        xAxis:{},
        yAxis:{},
        // 系列：决定展示什么样的图形图表
        series:{
            type: 'liquidFill',//系列
            data: [0.6, 0.4, 0.3],//展示的数据
            waveAnimation: true,//是否有动画
            radius:'90%',//半径大小
            shape: 'circle',//容积形状
            name: '游客统计',
            
        },
        // 布局组件
        grid:{
            left:0,
            right:0,
            top:0,
            bottom:0
        },
        tooltip: {
        show: true
    }
    })
})
</script>

<style scoped lang="scss">
.box{
    background: url('../../images/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
    .top{
        margin-left: 20px;
        .title{
            color: white;
            font-size: 20px;
        }
        .subtitle{
            margin-top: 10px;
            width: 68px;
            height: 7px;
            background: url('../../images/dataScreen-title.png');
            background-size: 100% 100%;
        }
        .right{
            float: right;
            color: white;
            font-size: 18px;
            span{
                color: yellowgreen;
            }
        }
    }
    .number{
        padding: 10px;
        margin-top: 30px;
        display: flex;
        span{
            flex: 1;
            height: 50px;
            text-align: center;
            line-height: 50px;
            background: url('../../images/total.png') no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
            font-size: 30px;
        }
    }
    .charts{
        width: 100%;
        height: 240px;
    }
}
</style>