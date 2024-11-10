<template>
       <div class="box">
            <div class="title">
                <p>未来7天游客量趋势图</p>
                <img src="../../images/dataScreen-title.png" alt="">
            </div>
            <div class="charts" ref="line">

            </div>
        </div>
</template>

<script setup lang='ts'>
import { ref,onMounted } from 'vue';
// 引入echarts插件
import * as echarts from 'echarts'
// 获取节点
let line=ref<any>()
// 当组件挂载时初始化图表
onMounted(()=>{
    // 初始化charts实例
    let myCharts=echarts.init(line.value)
    // 配置
    myCharts.setOption({
        // 标题
        title:{
            text:'游客访问量趋势图',//主标题
            textStyle:{//主标题样式
                color:'skyblue'
            },
            left:'40%'
        },
        // x|y
        xAxis:{
            // 均匀分布
            type:'category',
            // 两侧不留白
            boundaryGap: false,
            // 不要分割线
            splitLine:{
                show : false
            },
            data:['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis:{
            // 不要分割线
            splitLine:{
                show : false
            },
            // 轴线设置
            axisLine:{
                show:true
            },
            // 轴线刻度
            axisTick:{
                show:true
            }
        },
        // 布局组件
        grid:{
            left:40,
            right:20,
            top:40,
            bottom:24
        },
        series:[
            {
                type:'line',
                data:[136,954,166,325,912,594,1200],
                //平滑曲线设置
                smooth:true,
                // 区域填充样式
                areaStyle:{
                    color:{
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'red' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            },
        ]
    })
})
</script>

<style scoped lang="scss">
.box{
    width: calc(100% - 60px);
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin: 0px 30px;
    .title{
        margin-left: 20px;
        p{
            color: white;
            font-size: 20px;
        }
    }
    .charts{
        height: calc(100% - 40px);
    } 
}
</style>