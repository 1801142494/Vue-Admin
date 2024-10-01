<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请你输入SPU名称"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select>
                <el-option label="小米"></el-option>
                <el-option label="华为"></el-option>
                <el-option label="苹果"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请你输入描述"></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
            <el-upload
                v-model:file-list="fileList"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
            >
                <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <!-- 展示销售属性下拉菜单 -->
            <el-select>
                <el-option label="小米"></el-option>
                <el-option label="华为"></el-option>
                <el-option label="苹果"></el-option>
            </el-select>
            <el-button style="margin-left: 20px;" type="primary" size="default" icon="Plus" @click="">添加销售属性</el-button>
            <!-- table展示销售属性和属性值 -->
            <el-table border style="margin-top: 10px;">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名" width="120px"></el-table-column>
                <el-table-column label="属性值"></el-table-column>
                <el-table-column label="操作" width="120px"></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { AllTrademark, SaleAttrResponseData,SpuData, SpuImg,SpuHasImg,HasSaleAttrResponseData,Trademark, SaleAttr, HasSaleAttr  } from '@/api/product/spu/type';
import { reqAllTradeMark,reqSpuImage,reqSpuSaleAttr,reqAllSaleAttr } from '@/api/product/spu';
// 获取自定义事件
let $emit = defineEmits(['changeScene'])
// 存储spu数据
let AllTradeMark =ref<Trademark[]>([])
let imagList =ref<SpuImg[]>([])
let saleAttr =ref<SaleAttr[]>([])
let allSaleAttr=ref<HasSaleAttr[]>([])
// 点击取消，通知父组件切换场景，展示已有spu
const cancel=()=>{
    $emit('changeScene',0)
}
// 子组件的方法
const initGetHasSpuData =async (spu:SpuData)=>{
    // spu:父组件传来的已有spu对象
    // 获取全部的spu的商品数据
    let result:AllTrademark =await reqAllTradeMark()
    // 获取全部的spu的商品照片
    let result1:SpuHasImg =await reqSpuImage(spu.id as number)
    //获取某个spu的销售属性
    let result2:SaleAttrResponseData =await reqSpuSaleAttr(spu.id as number)
    // 获取全部的销售属性
    let result3:HasSaleAttrResponseData =await reqAllSaleAttr()
    // 存储全部的spu数据
    AllTradeMark.value =result.data
    imagList.value=result1.data
    saleAttr.value=result2.data
    allSaleAttr.value=result3.data
}
// 对外暴露子组件方法
defineExpose({initGetHasSpuData})
</script>
<style scoped>
.el-select{
    width: 170px;
}
</style>