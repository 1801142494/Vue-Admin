<template>
    <div class="box" ref="map">
        我是地图组件
    </div>
</template>

<script setup lang='ts'>
import { ref,onMounted } from 'vue';
// 引入echarts插件
import * as echarts from 'echarts'
// 引入中国地图的json数据
import chinaJSON from './china.json'
// 获取Dom元素
let map=ref<any>()
// 注册地图
echarts.registerMap('china',chinaJSON as any)
// 当组件挂载时初始化图表
onMounted(()=>{
    // 初始化charts实例
    let mychart=echarts.init(map.value)
    // 设置配置项
    mychart.setOption({
        // 地图组件geo
        geo: {
            map: 'china',//中国地图
            show:true, //是否展示
            roam:true, //鼠标缩放效果
            
            // 地图位置调试
            layoutCenter: ['50%', '60%'],//地图距离左侧和顶部的位置
            layoutSize: 800,//地图大小
            // 地图上文字设置
            label:{
                show:true,//是否显示
                color:'white',//文字颜色
                fontSize:12,//文字大小
            },
            // 每一个多边形的样式
            itemStyle:{
                // 地图背景颜色
                color:{
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#09347e' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#00133e' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },
                // 透明度
                opacity: 0.8,
                // 边框宽度
                borderWidth:1,
                // 边框颜色
                borderColor:'white',
            },
            // 地图高亮状态下的多边形和标签样式
            emphasis:{
                itemStyle:{
                    color:'#29fcff',
                },
                label:{
                    fontSize:30,
                }
            },
        },
        // 布局位置
        grid:{
            left:0,
            right:0,
            top:0,
            bottom:0,
        },
        // 系列
        series:[{
            type : 'lines',//航线的系列
            // 航线数据
            data:[
                {
                    coords: [
                        [ 116.405285,39.904989],  // 起点
                        [ 91.132212,29.660361]   // 终点
                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: "#29fcff" ,
                        width: 5 ,
                        type: 'solid' ,
                    },
                },
                {
                    coords: [
                        [ 116.405285,39.904989],  // 起点
                        [121.472644,31.231706]   // 终点
                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: "#29fcff" ,
                        width: 5 ,
                        type: 'solid' ,
                    },
                },
                {
                    coords: [
                        [ 116.405285,39.904989],  // 起点
                        [ 113.280637,23.125178]   // 终点
                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: "#29fcff" ,
                        width: 5 ,
                        type: 'solid' ,
                    },
                },
                {
                    coords: [
                        [121.472644,31.231706],  // 起点
                        [ 87.617733,43.792818]   // 终点
                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: "#29fcff" ,
                        width: 5 ,
                        type: 'solid' ,
                    },
                },
                {
                    coords: [
                        [121.472644,31.231706],  // 起点
                        [ 126.642464,45.756967]   // 终点
                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: "#29fcff" ,
                        width: 5 ,
                        type: 'solid' ,
                    },
                },
                {
                    coords: [
                        [ 126.642464,45.756967] ,  // 起点
                        [ 102.712251,25.040609]   // 终点
                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: "#29fcff" ,
                        width: 5 ,
                        type: 'solid' ,
                    },
                },
                {
                    coords: [
                        [ 111.670801,40.818311] ,  // 起点
                        [  119.306239,26.075302]   // 终点
                    ],
                    // 统一的样式设置
                    lineStyle: {
                        color: "#29fcff" ,
                        width: 5 ,
                        type: 'solid' ,
                    },
                },
            ],
            //线特效的配置
            effect:{
                show:true,
                symbol:'arrow',
                symbolSize:20,//特性大小
                color:'powderblue',
                trailLength : 0//特效尾焰
            }
        }]
    })
})
</script>

<style scoped>
.a{
    color:powderblue;
}
</style>