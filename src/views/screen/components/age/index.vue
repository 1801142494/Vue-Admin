<template>
    <div class="box">
        <div class="title">
            <p>年龄比例</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <!-- 图形图表的容器 -->
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang='ts'>
import { ref,onMounted } from 'vue';
// 引入echarts插件
import * as echarts from 'echarts'
// 获取节点
let charts=ref<any>()
// 当组件挂载时初始化图表
onMounted(()=>{
    // 初始化charts实例
    let myCharts=echarts.init(charts.value)
    // 设置配置项
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 40,
            right: 20,
            orient:'vertical',//图例组件方向
            textStyle:{
                color:'while',
                fontSize:16,
            }
        },
        series: [
            {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
            },
            label: {
                show: true,
                position: 'inside',//饼图数据显示位置
                formatter:'{d}%'
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 735, name: '10岁以下' },
                { value: 1048, name: '10~18岁' },
                { value: 580, name: '18~35岁' },
                { value: 523, name: '35~50岁' },
                { value: 484, name: '50~60岁' },
                { value: 300, name: '60岁以上' }
            ],
            }
        ],
    };
    myCharts.setOption(option)
    
})
</script>

<style scoped>
.box{
    width: 100%;
    height: 100%;
    background:url('../../images//dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    .title{
        margin-left: 20px;
        p{
            color: white;
            font-size: 20px;
        }
    }
    .charts{
        height: 100%;
    }
}
</style>