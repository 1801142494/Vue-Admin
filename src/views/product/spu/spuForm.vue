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
            <el-select v-model="saleAttrIdAndValueName" :placeholder="unSelectSaleAttr.length?`还未选择${unSelectSaleAttr.length}个`:'无'">
                <el-option :value="`${item.id}:${item.name}`" v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name"></el-option>
            </el-select>
            <el-button :disabled="!saleAttrIdAndValueName" style="margin-left: 20px;" type="primary" size="default" icon="Plus" @click="addSaleAttr">添加销售属性</el-button>
            <!-- table展示销售属性和属性值 -->
            <el-table border style="margin-top: 10px;" :data="saleAttr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="属性值">
                    <template #="{row,$index}">
                        <!-- row为spu已有的销售属性 -->
                        <el-tag v-for="(item,index) in row.spuSaleAttrValueList" :key="row.id" class="tap" closable
                        @close="row.spuSaleAttrValueList.splice(index,1)">
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-input @blur="toLook(row)" v-model="row.saleAttrValue" v-if="row.flag==true" size="small" style="width: 100px;" placeholder="请输入属性值"></el-input>
                        <el-button @click="toEdit(row)" v-else type="primary" size="small" icon="Plus" ></el-button>
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
            <el-button type="primary" size="default" @click="save">保存</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang='ts'>
import { ref,computed, nextTick } from 'vue';
import type { AllTrademark, SaleAttrResponseData,SpuData, SpuImg,SpuHasImg,HasSaleAttrResponseData,Trademark, SaleAttr, HasSaleAttr, SaleAttrValue  } from '@/api/product/spu/type';
import { reqAllTradeMark,reqSpuImage,reqSpuSaleAttr,reqAllSaleAttr,reqAddOrUpdateSpu } from '@/api/product/spu';
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
// 还未选择的销售属性Id与属性值名字
let saleAttrIdAndValueName =ref<string>('')
// 点击取消，通知父组件切换场景，展示已有spu
const cancel=()=>{
    $emit('changeScene',{flag:0,Params:'update'})

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
// 计算当前spu还未拥有的销售属性
let unSelectSaleAttr =computed(()=>{
    let unSelectAttr=allSaleAttr.value.filter(item=>{
        return saleAttr.value.every(item1=>{
            return item.name!=item1.saleAttrName
        })
    })
    return unSelectAttr
})
// 添加销售属性的方法
const addSaleAttr= ()=>{
    /*
    baseSaleAttrId:number,
    saleAttrName:string,
    spuSaleAttrValueList:spuSaleAttrValueList
    */
    // 结构未选择的销售属性
    let [baseSaleAttrId,saleAttrName] =saleAttrIdAndValueName.value.split(':')
    //准备一个新的销售属性对象
    let newSaleAttr:SaleAttr ={
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList:[],
    }
    // 追加到数组
    saleAttr.value.push(newSaleAttr)
    // 清空收集的数据
    saleAttrIdAndValueName.value=''
}
// 添加销售属性值的点击事件
const toEdit=(row:SaleAttr)=>{
    // 点击按钮显示input
    row.flag=true
    // 清空数据
    row.saleAttrValue=''
    // 自动获取聚焦
    nextTick(()=>{

    })
}
// 属性值input标签的blur事件
const toLook=(row:SaleAttr)=>{
    // 失去焦点隐藏input
    row.flag=false
    //收集属性ID与属性值的名字
    const {baseSaleAttrId,saleAttrValue} =row
    //整理服务器需要的数据
    let newSaleAttrValue:SaleAttrValue={
        baseSaleAttrId,
        saleAttrValueName:saleAttrValue as string
    }
    // 非法判断
    if((saleAttrValue as string).trim()==''){
        ElMessage({
            type:'error',
            message:'属性值不能为空'
        })
        return
    }
    // 判断属性值是否在数组中存在
    let repeat=row.spuSaleAttrValueList.find(item=>{
        return item.saleAttrValueName == saleAttrValue
    })
    if(repeat) {
        ElMessage({
            type:'error',
            message:'属性值不能重复'
        })
        return
    }

    // 追加新的属性值对象
    row.spuSaleAttrValueList.push(newSaleAttrValue)
}
// 保存按钮的回调
const save=async ()=>{
    //整理参数
    // 1.照片墙的数据
    SpuParams.value.spuImageList=imagList.value.map((item:any)=>{
        return {
            imgName:item.name,
            imgUrl:(item.response&&item.response.data)||item.url
        }
    })
    // 2.整理销售属性的数据
    SpuParams.value.spuSaleAttrList=saleAttr.value
    //发请求：添加|修改
    let result=await reqAddOrUpdateSpu(SpuParams.value)
    if(result.code==200){
        //切换场景
        $emit('changeScene',{flag:0,Params:SpuParams.value.id?'update':'add'})
        // 提示信息
        ElMessage({
            type:'success',
            message:SpuParams.value.id?'修改成功':'添加成功'
        })
    }else{
        ElMessage({
            type:'error',
            message:SpuParams.value.id?'修改失败':'添加失败'
        })
    }
}
// 添加一个新的spu初始化
const initAddSpu=async (c3Id:number|string)=>{
    // 清空SpuParams数据
    Object.assign(SpuParams,{
        category3Id:'',//收集三级分类Id
        spuName:'',//spu名字
        description:'',//spu描述
        tmId:'',//品牌id
        spuImageList:[],//商品图片
        spuSaleAttrList:[]//商品属性
    })
    //清空照片
    imagList.value=[]
    // 清空销售属性
    saleAttr.value=[]
    // 清空收集的id和属性名
    saleAttrIdAndValueName.value=''
    
    // 存储三级分类
    SpuParams.value.category3Id=c3Id
    // 获取全部品牌
    let result:AllTrademark =await reqAllTradeMark()
    // 获取全部的销售属性
    let result3:HasSaleAttrResponseData =await reqAllSaleAttr()
    // 存储全部的数据
    AllTradeMark.value =result.data
    //存储全部的销售属性
    allSaleAttr.value=result3.data
}
// 对外暴露子组件方法
defineExpose({initGetHasSpuData,initAddSpu})
</script>
<style scoped>
.el-select{
    width: 170px;
}
.tap{
    margin: 0px 5px;
}
</style>