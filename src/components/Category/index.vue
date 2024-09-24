<template>
    <el-card>
        <el-form :inline="true">
            <el-form-item label="一级标题">
                <!-- change:选中值变化的时候调用 -->
                <el-select v-model="catgoryStore.c1Id" @change="handlerC1">
                    <!-- label:是展示的数据，value:是下拉框收集的数据 -->
                    <el-option v-for="c1 in catgoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级标题">
                <el-select v-model="catgoryStore.c2Id" @change="handlerC2">
                    <!-- label:是展示的数据，value:是下拉框收集的数据 -->
                    <el-option v-for="c2 in catgoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级标题">
                <el-select v-model="catgoryStore.c3Id">
                    <!-- label:是展示的数据，value:是下拉框收集的数据 -->
                    <el-option v-for="c3 in catgoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
            </el-form>
    </el-card>
</template>

<script setup lang='ts'>
// 引入生命周期钩子
import { onMounted } from 'vue';
// 引入分类相关仓库
import useCatgoryStore from '@/store/modules/catgory';
let catgoryStore=useCatgoryStore()
// 组件挂在完毕
onMounted(()=>{
    getC1()
})
// 通知仓库获取一级分类数据
const getC1=()=>{
    catgoryStore.getC1()
}
// 一级分类下拉菜单的change事件
const handlerC1=()=>{
    // 清空二级、三级数据
    catgoryStore.c2Id=''
    catgoryStore.c3Id=''
    // 通知仓库获取二级分类
    catgoryStore.getC2()
}
// 二级分类下拉菜单的change事件
const handlerC2=()=>{
    // 清空三级数据
    catgoryStore.c3Id=''
    // 通知仓库获取三级分类
    catgoryStore.getC3()
}
</script>

<style scoped>
.el-select{
    width: 150px;
}
</style>