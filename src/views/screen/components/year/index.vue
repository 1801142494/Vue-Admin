<template>
    <div class="box">
        <div class="title">
            <p>年度游客量对比</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <!-- 图形图标的容器 -->
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
    // 一个容器可以同时展示多种类型的图形图标
    let myCharts=echarts.init(charts.value)
    // 配置
    let option = {
        // 背景颜色
        color: ['#80FFA5', '#00DDFF', '#37A2FF'],
        // 鼠标悬浮时候的提示
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
            }
        },
        // 图例
        legend: {
            data: [
                {
                    name:'2022年',
                    textStyle:{
                        color:'white'
                    }
                },
                {
                    name:'2023年',
                    textStyle:{
                        color:'white'
                    }
                },
                {
                    name:'2024年',
                    textStyle:{
                        color:'white'
                    }
                }],
            left: '40%' ,
            top: 'auto' ,
            right: 'auto' ,
            bottom: 'auto' ,
        },
        // 实现下载图标图片的功能
        toolbox: {
            feature: {
                saveAsImage: {}
            },
            itemSize:'26',
            bottom :'90%'
        },
        // 布局
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        // x|y轴
        xAxis: [
            {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月',]
            }
        ],
        yAxis: [
            {
            type: 'value'
            }
        ],
        // 系列
        series: [
            {
            name: '2022年',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: 'rgb(128, 255, 165)'
                },
                {
                    offset: 1,
                    color: 'rgb(1, 191, 236)'
                }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250,140, 232, 101, 264, 90]
            },
            {
            name: '2023年',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: 'rgb(0, 221, 255)'
                },
                {
                    offset: 1,
                    color: 'rgb(77, 119, 255)'
                }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [120, 282, 111, 234, 220, 340, 310,120, 282, 111, 234, 220]
            },
            {
            name: '2024年',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: 'rgb(55, 162, 255)'
                },
                {
                    offset: 1,
                    color: 'rgb(116, 21, 219)'
                }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [320, 132, 201, 334, 190, 130, 220,320, 132, 201, 334, 190]
            },
        ]
    }
    // 使用配置项
    myCharts.setOption(option)
})
</script>

<style scoped lang="scss">
.box{
    width: 100%;
    height: 100%;
    background:url('../../images/dataScreen-main-rc.png') no-repeat;
    background-size: 100% 100%;
    margin: 20px 0px;
    .title{
        margin-left: 20px;
        p{
            color: white;
            font-size: 20px;
        }
    }
    .charts{
        width: 100%;
        height: 100%;
    }
}
</style>