<template>
    <div class="box">
        <div class="title">
            <p>预约渠道数据统计</p>
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
        // 悬浮状态的提示
        tooltip: {
            trigger: 'item'
        },
        // 图标
        legend: {
            bottom: '10%',
            left: 'center',
            textStyle:{
                color:'while',
            }
        },
        // 系列
        series: [
            {
            name: '预约渠道统计',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            // 饼图显示的角度范围
            startAngle: 180,
            endAngle: 360,
            data: [
                { value: 1048, name: '携程旅行' },
                { value: 735, name: '去哪儿旅行' },
                { value: 580, name: '飞猪APP' },
                { value: 484, name: '途牛旅游' },
                { value: 300, name: '同程旅行' }
            ],
            label:{
                show:true,
                color:'white',
                fontSize:16
            }
            }
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
    background:url('../../images/dataScreen-main-rb.png') no-repeat;
    background-size: 100% 100%;
    .title{
        margin-left: 20px;
        p{
            color: white;
            font-size: 20px;
        }
    }
    .charts{
        width: 100%;
        height: calc(100% - 30px);
    }
}
</style>