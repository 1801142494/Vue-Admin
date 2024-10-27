<template>
    <div class="box">
        <div class="title">
            <p>男女比例</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="sex">
            <div class="man">
                <img src="../../images//man.png" alt="">
            </div>
            <div class="women">
                <img src="../../images//woman.png" alt="">
            </div>
        </div>
        <div class="rate">
            <p>男士58%</p>
            <p>女士42%</p>
        </div>
        <div class="charts" ref="charts">

        </div>
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
    // 配置
    myCharts.setOption({
        // 组件标题
        title:{
            // text:'男女比例',//主标题
            // textStyle:{//主标题样式
            //     color:'skyblue'
            // },
            // left:'40%'
        },
        // x|y
        xAxis:{
            show:false,
            min:0,
            max:100,
        },
        yAxis:{
            show:false,
            type:'category'
        },
        // 系列
        series:[
            {
                type:'bar',
                data:[58],
                barWidth:20,
                z:100,
                itemStyle:{
                    color:'#007afe',
                    borderRadius:20
                }
            },
            {
                type:'bar',
                data:[100],
                barWidth:20,
                // 调整女士柱条的位置
                barGap:'-100%',
                itemStyle:{
                    color:'#ff4b7a',
                    borderRadius:20
                }
            }
        ],
        // 布局组件
        grid:{
            left:75,
            right:75,
            top:0,
            bottom:20
        },
    })
})
</script>

<style scoped lang="scss">
.box{
    width: 100%;
    height: 100%;
    background:url('../../images//dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin: 20px 0px;
    .title{
        margin-left: 20px;
        p{
            color: white;
            font-size: 20px;
        }
    }
    .sex{
        display: flex;
        justify-content: center;
        margin-top: 20px;
        .man{
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px 30px;
            width: 111px;
            height: 115px;
            background: url('../../images/man-bg.png') no-repeat;
        }
        .women{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 111px;
            height: 115px;
            margin: 20px 30px;
            background: url('../../images/woman-bg.png') no-repeat;
        }
       
    }
    .rate{
        display: flex;
        justify-content: space-evenly;
        color: white;
    }
    .charts{
        height: 80px;
    }
}  
</style>