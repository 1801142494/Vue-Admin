<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请你输入SPU名称" v-model="SpuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select v-model="SpuParams.tmId">
                <el-option v-for="item in AllTradeMark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请你输入描述" v-model="SpuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
            <!-- 
                file-list：要显示的图片数据，要遵循规定的结构
                action：上次图片的地址
                list-type:文件列表的类型
            -->
            <el-upload
                v-model:file-list="imagList"
                action="/api/admin/product/fileUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :before-upload="handleUpload"
            >
                <el-icon><Plus /></el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%"/>
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <!-- 展示销售属性下拉菜单 -->
            <el-select v-model="SpuParams.spuSaleAttrList">
                <el-option v-for="item in allSaleAttr" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-button style="margin-left: 20px;" type="primary" size="default" icon="Plus" @click="">添加销售属性</el-button>
            <!-- table展示销售属性和属性值 -->
            <el-table border style="margin-top: 10px;" :data="saleAttr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="属性值">
                    <template #="{row,$index}">
                        <!-- row为spu已有的销售属性 -->
                        <el-tag v-for="item in row.spuSaleAttrValueList" :key="row.id" class="tap" closable>
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-button v-show="flag" type="primary" size="small" icon="Plus" @click="flag"></el-button>
                        <!-- <el-input v-show="!flag" placeholder="" size="normal" clearable @change=""></el-input> -->
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{row,$index}">
                        <el-button type="primary" size="small" icon="Delete" @click="saleAttr.splice($index,1)"></el-button>
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
import { ref } from 'vue';
import { AllTrademark, SaleAttrResponseData,SpuData, SpuImg,SpuHasImg,HasSaleAttrResponseData,Trademark, SaleAttr, HasSaleAttr  } from '@/api/product/spu/type';
import { reqAllTradeMark,reqSpuImage,reqSpuSaleAttr,reqAllSaleAttr } from '@/api/product/spu';
import { ElMessage } from 'element-plus';
// 获取自定义事件
let $emit = defineEmits(['changeScene'])
// 存储spu数据
let AllTradeMark =ref<Trademark[]>([])
let imagList =ref<SpuImg[]>([])
let saleAttr =ref<SaleAttr[]>([])
let allSaleAttr=ref<HasSaleAttr[]>([])
// 存储已有的spu对象
let SpuParams=ref<SpuData>({
    category3Id:'',//收集三级分类Id
    spuName:'',//spu名字
    description:'',//spu描述
    tmId:'',//品牌id
    spuImageList:[],//商品图片
    spuSaleAttrList:[]//商品属性
})
// 对话框的显示和隐藏
let dialogVisible =ref<boolean>(false)
// 存储预览图片的地址
let dialogImageUrl=ref<string>('')
// 添加销售属性的button和input切换
let flag=ref(true)
// 点击取消，通知父组件切换场景，展示已有spu
const cancel=()=>{
    $emit('changeScene',0)
}
// 子组件的方法
const initGetHasSpuData =async (spu:SpuData)=>{
    // 存储已有的spu对象
    SpuParams.value=spu
    // spu:父组件传来的已有spu对象
    // 获取全部的spu的商品数据
    let result:AllTrademark =await reqAllTradeMark()
    // 获取全部的spu的商品照片
    let result1:SpuHasImg =await reqSpuImage(spu.id as number)
    //获取某个spu的销售属性
    let result2:SaleAttrResponseData =await reqSpuSaleAttr(spu.id as number)
    // 获取全部的销售属性
    let result3:HasSaleAttrResponseData =await reqAllSaleAttr()
    // 存储全部的数据
    AllTradeMark.value =result.data
    // 存储spu的图片
    imagList.value=result1.data.map(item=>{
        return{
            name:item.imgName,
            url:item.imgUrl
        }
    })
    //存储某个spu的销售属性
    saleAttr.value=result2.data
    //存储全部的销售属性
    allSaleAttr.value=result3.data
}
// 照片墙点击预览按钮触发的钩子
const handlePictureCardPreview =(file:any)=>{
    //弹出对话框
    dialogVisible.value=true
    // 存储预览图片
    dialogImageUrl.value=file.url
}
// 上次文件成功之前，用来约束文件
const handleUpload =(file:any)=>{
    if(file.type=='image/png'||file.type=='image/jpeg'||file.type=='image/gif'){
        if(file.size/1024/1024 <4){
            return true
        }else{
            ElMessage({
            type:'error',
            message:'上传的文件大小必须小于4MB'
            })
            return false
        }
    }else{
        ElMessage({
            type:'error',
            message:'上传文件格式必须是PNG|JPG|GIF'
        })
        return false
    }
}
// 对外暴露子组件方法
defineExpose({initGetHasSpuData})
</script>
<style scoped>
.el-select{
    width: 170px;
}
.tap{
    margin: 0px 5px;
}
</style>