<template>
    <div>
        <!-- 三级分类全局组件 -->
        <Category></Category>
        <el-card style="margin-top: 10px;">
            <!-- 当3级分类存在，才可以操作添加 -->
            <el-button type="primary" size="default" @click="" :disabled="!catgoryStore.c3Id">添加属性</el-button>
            <el-table border style="margin: 10px 0px;">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" width="120px"></el-table-column>
                <el-table-column label="属性值名称"></el-table-column>
                <el-table-column label="操作" width="120px"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
//分类相关仓库
import useCatgoryStore from '@/store/modules/catgory';
let catgoryStore=useCatgoryStore()
</script>

<style scoped>

</style>