<template>
    <div class="box">
        <div class="title">
            <p>热门景区排行</p>
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
    // 配置项
    myCharts.setOption({
        // x|y轴
        xAxis:{
            show:false,
        },
        yAxis:{
            show:true,
            type: 'category',
            data:[
                {
                    value: '北京故宫',
                    // 突出周一
                    textStyle: {
                        color: 'white'
                    }
                },
                {
                    value: '九寨沟',
                    // 突出周一
                    textStyle: {
                        color: 'white'
                    }
                },
                {
                    value: '北京长城',
                    // 突出周一
                    textStyle: {
                        color: 'white'
                    }
                },
                {
                    value: '西安兵马俑',
                    // 突出周一
                    textStyle: {
                        color: 'white'
                    }
                },
                {
                    value: '张家界',
                    // 突出周一
                    textStyle: {
                        color: 'white'
                    }
                }
            ],
            inverse:true,//反向
            // 坐标线设置
            axisLine :{
                show:false,
            },
            // 坐标线刻度设置
            axisTick:{
                show:false,
            }
        },
        // 布局
        grid:{
            top:'10%',
            left:'30%',
            right:'30%',
            bottom:'10%'
        },
        // 系列
        series:[
            {
                type:'bar',
                barWidth:20,
                data:[80,60,50,40,30],
                itemStyle:{
                    borderRadius:20
                },
                // 图标上的文字
                label:{
                    show:true,
                    position: 'right',
                    color:'white',
                    formatter:'{c}w'
                },
                // 显示背景
                showBackground:true,
                // 柱状图的背景
                backgroundStyle:{
                    borderColor:'#29fcff',
                    borderWidth:1,
                    borderRadius:20
                }
            }
        ],

    })
})
</script>

<style scoped lang="scss">
.box{
    width: 100%;
    height: 100%;
    background:url('../../images/dataScreen-main-rt.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
    .title{
        margin-left: 20px;
        p{
            color: white;
            font-size: 20px;
        }
    }
    .charts{
        width:  100%;
        height: 100%;
    }
}
</style>