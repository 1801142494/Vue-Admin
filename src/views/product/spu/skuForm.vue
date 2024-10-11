<template>
    <el-form label-width="100px">
        <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="SKU价格(元)" type="number"></el-input>
        </el-form-item>
        <el-form-item label="重量(克)">
            <el-input placeholder="重量(克)" type="number"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="SKU描述"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item v-for="(item,index) in attrArr" 
                :key="item.id" :label="item.attrName">
                    <el-select>
                        <el-option v-for="(attrValue,index) in item.attrValueList" 
                        :key="attrValue.id" :label="attrValue.valueName"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item :label="item.saleAttrName" v-for="(item,index) in saleArr" :key="item.id">
                    <el-select>
                        <el-option :label="saleAttrValue.saleAttrValueName"
                         v-for="(saleAttrValue,index) in item.spuSaleAttrValueList"
                          :key="saleAttrValue.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgArr">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{row,$index}">
                        <el-image :src="row.imgUrl"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{row,$index}">
                        <el-button type="primary" size="small" @click="">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang='ts'>
// 引入请求api

import { reqAttr } from '@/api/product/attr';
import { reqSpuImage,reqSpuSaleAttr } from '@/api/product/spu';
import { ref } from 'vue';
// 自定义事件的方法
let $emit=defineEmits(['changeScene'])
//平台属性
let attrArr=ref<any>([])
// 销售属性
let saleArr=ref<any>([])
// 照片墙
let imgArr=ref<any>([])
// 当前子组件方法对外暴露
const initSkuData=async (c1Id:number|string,c2Id:number|string,c3Id:number|string,spu:any)=>{
    // 获取平台属性
    let result:any= await reqAttr(c1Id,c2Id,c3Id)
    // 获取对应的销售属性
    let result1:any= await reqSpuSaleAttr(spu.id)    
    // 获取照片墙
    let result2:any= await reqSpuImage(spu.id)

    // 存储对应数据
    attrArr.value=result.data
    saleArr.value=result1.data
    imgArr.value=result2.data
}
// 取消按钮回调
const cancel=()=>{
    $emit('changeScene',{flag:0,params:''})
}
// 对外暴露的方法
defineExpose({
    initSkuData
})
</script>

<style scoped>
.el-select{
    width: 130px;
}
</style>