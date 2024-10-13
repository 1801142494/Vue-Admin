<template>
    <el-form label-width="100px">
        <el-form-item label="SKU名称">
            <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="SKU价格(元)" type="number" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(克)">
            <el-input placeholder="重量(克)" type="number" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="SKU描述" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item v-for="(item,index) in attrArr" 
                :key="item.id" :label="item.attrName">
                    <el-select v-model="item.attrIdAndValueId">
                        <el-option 
                        :value="`${item.id}:${attrValue.id}`"
                        v-for="(attrValue,index) in item.attrValueList" 
                        :key="attrValue.id" :label="attrValue.valueName">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item :label="item.saleAttrName" v-for="(item,index) in saleArr" :key="item.id">
                    <el-select v-model="item.saleIdAndSaleValueId">
                        <el-option 
                        :value="`${item.id}:${saleAttrValue.id}`"
                        :label="saleAttrValue.saleAttrValueName"
                        v-for="(saleAttrValue,index) in item.spuSaleAttrValueList"
                        :key="saleAttrValue.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgArr" ref="table">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{row,$index}">
                        <el-image :src="row.imgUrl"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{row,$index}">
                        <el-button type="primary" size="small" @click="handler(row)">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang='ts'>
// 引入请求api
import { reqAttr } from '@/api/product/attr';
import { reqSpuImage,reqSpuSaleAttr, reqAddSku } from '@/api/product/spu';
import { SkuData } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
// 自定义事件的方法
let $emit=defineEmits(['changeScene'])
//平台属性
let attrArr=ref<any>([])
// 销售属性
let saleArr=ref<any>([])
// 照片墙
let imgArr=ref<any>([])
// table表格实例对象
let table=ref<any>()
// 收集sku参数
let skuParams =reactive<SkuData>({
    category3Id: "", //三级分类的ID
    spuId: "", //已有的SPU的ID
    tmId: "", //SPU品牌的ID
    skuName: "", //sku名字
    price: "", //sku价格
    weight: "", //sku重量
    skuDesc: "", //sku的描述
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: "", //sku图片地址
})
// 初始化页面，获取并存储相关数据
const initSkuData=async (c1Id:number|string,c2Id:number|string,c3Id:number|string,spu:any)=>{
    // 收集数据
    skuParams.category3Id=c3Id
    skuParams.spuId=spu.id
    skuParams.tmId=spu.tmId
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
// 设置默认图片的方法回调
const handler=(row:any)=>{
    // 全部的复选框都不勾选
    imgArr.value.forEach((item:any)=>{
        table.value.toggleRowSelection(item,false)
    })
    // 勾选当前选中的复选框
    table.value.toggleRowSelection(row,true)
    // 存储默认照片地址
    skuParams.skuDefaultImg=row.imgUrl
}
// 保存的点击事件
const save=async ()=>{
    //整理参数
    // 平台属性
    skuParams.skuAttrValueList=attrArr.value.reduce((prev:any,next:any)=>{
        if(next.attrIdAndValueId){
            let [attrId,valueId] = next.attrIdAndValueId.split(':')
            prev.push({
                attrId,
                valueId
            })
        }
        return prev
    },[])
    // 销售属性
    skuParams.skuSaleAttrValueList=saleArr.value.reduce((prev:any,next:any)=>{
        if(next.saleIdAndSaleValueId){
            let [saleAttrId,saleAttrValueId] = next.saleIdAndSaleValueId.split(':')
            prev.push({
                saleAttrId,
                saleAttrValueId
            })
        }
        return prev
    },[])
    // 添加sku的请求
    let result:any=await reqAddSku(skuParams)
    if(result.code==200){
        //切换场景
        $emit('changeScene',{flag:0,params:''})
        // 提示信息
        ElMessage({
            type:'success',
            message:'添加SKU成功'
        })
    }else{
        ElMessage({
            type:'error',
            message:'添加SKU失败'
        })
    }
}
// 当前子组件方法对外暴露
defineExpose({
    initSkuData
})
</script>

<style scoped>
.el-select{
    width: 130px;
}
</style>