<template>
    <el-card class="box-card">
        <!-- 卡片顶部添加品牌按钮 -->
        <el-button type="primary" size="default" icon="Plus" @click="addTradmark">添加内容</el-button>
        <!-- 表格组件，展示已有的品牌 -->
        <el-table style="margin: 10px 0px;" border :data="trademarkArr">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column label="品牌名称">
                <template #="{row,$index}">
                    <h1>{{ row.tmName }}</h1>
                </template>
            </el-table-column>
            <el-table-column label="品牌LOGO" >
                <template #="{row,$index}">
                    <img :src="row.logoUrl" style="width: 100px; height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" >
                <template #="{row,$index}">
                    <el-button type="primary" size="small" icon="Edit" title="编辑" @click="updateTradmark(row)"></el-button>
                    <el-popconfirm :title="`您确定要删除${row.tmName}?`" width="auto" icon="Delete" @confirm="deleteTradmark(row.id)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete" title="删除"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="limit"
            :page-sizes="[3, 5, 7, 9]"
            :background="true"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @change="getHasTrademark"
            />
    </el-card>
    <!-- 对话框组件：在添加和修改已有品牌的时候使用 -->
    <el-dialog v-model="dialogFormVisible" :title="tradmarkParams.id?'修改品牌':'添加品牌'">
        <el-form style="width: 80%;" :model="tradmarkParams" :rules="rules" ref="formRef">
            <el-form-item label="品牌名称" label-width="80px" prop="tmName">
                <el-input placeholder="请输入品牌名称" v-model="tradmarkParams.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
                <!-- action:图片上传路径 -->
                <el-upload
                    class="avatar-uploader"
                    action="api/admin/product/fileUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    >
                    <img v-if="tradmarkParams.logoUrl" :src="tradmarkParams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <!-- 具名插槽 -->
         <template #footer>
           <el-button type="primary" size="default" @click="cancel">取消</el-button>
           <el-button type="primary" size="default" @click="confirm">确定</el-button>
         </template>
    </el-dialog> 
</template>

<script setup lang='ts'>
import { ElMessage, type UploadProps } from 'element-plus'
import { ref,onMounted, reactive,nextTick } from 'vue';
import { reqHasTradeMark,reqAddOrUpdateTradeMark,reqDeleteTradeMark } from '@/api/product/trademark';
import type { Records,TradeMarkResponseData,TradeMark } from '@/api/product/trademark/type';
// 当前页码
let pageNo=ref(1)
// 每页展示数量
let limit =ref<number>(3)
// 存储已有品牌数据总数
let total =ref<number>(0)
// 存储已有品牌的数据
let trademarkArr =ref<Records>([])
// 控制对话框的显示和隐藏
let dialogFormVisible =ref<boolean>(false)
// 定义 收集新增品牌数据
let tradmarkParams=reactive<TradeMark>({
    tmName:'',
    logoUrl:'',
})
// 表单对象
let formRef=ref()
// 添加品牌事件回调
const addTradmark =()=>{
    // 对话框显示
    dialogFormVisible.value=true
    // 收集数据清空
    tradmarkParams.id=0
    tradmarkParams.tmName=''
    tradmarkParams.logoUrl=''
    // 清除校验规程错误提示
    nextTick(()=>{
        formRef.value?.clearValidate('tmName')
        formRef.value?.clearValidate('logoUrl')
    })
}
// 修改品牌事件回调
const updateTradmark=(row:TradeMark)=>{
    dialogFormVisible.value=true
    // 展示已有数据(es6语法)
    Object.assign(tradmarkParams,row)
    // 清除校验规程错误提示
    nextTick(()=>{
        formRef.value?.clearValidate('tmName')
        formRef.value?.clearValidate('logoUrl')
    })
}
// 删除按钮气的泡确认框确认按钮
const deleteTradmark=async (id:number)=>{
    let result:any = await reqDeleteTradeMark(id)
    // 添加|修改品已有品牌
    if(result.code==200){
        // 关闭对话框
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        // 再次发请求获取已有全部的品牌
        getHasTrademark(trademarkArr.value.length>1?pageNo.value:pageNo.value-1)
    }else{
        //添加失败
        ElMessage({
            type:'error',
            message:'删除失败'
        })
    
    }
}
// 对话框取消按钮
const cancel=()=>{
    dialogFormVisible.value=false
}
// 对话框确定按钮
const confirm=async ()=>{
    // 调用这个方法进行全部表单校验
    await formRef.value.validate()

    let result:any = await reqAddOrUpdateTradeMark(tradmarkParams)
    // 添加|修改品已有品牌
    if(result.code==200){
        // 关闭对话框
        dialogFormVisible.value=false
        ElMessage({
            type:'success',
            message:tradmarkParams.id?'修改品牌成功':'添加品牌成功'
        })
        // 再次发请求获取已有全部的品牌
        getHasTrademark(tradmarkParams.id?pageNo.value:1)
    }else{
        //添加失败
        ElMessage({
            type:'error',
            message:tradmarkParams.id?'修改品牌失败':'添加品牌失败'
        })
        // 关闭对话框
        dialogFormVisible.value=false
    }
}
// 获取已有商品事件回调
const getHasTrademark =async (pager=1)=>{
    pageNo.value=pager
    let result:TradeMarkResponseData = await reqHasTradeMark(pageNo.value,limit.value)
    if(result.code==200){
        total.value=result.data.total
        trademarkArr.value=result.data.records

        // 遍历数组，补全不完整的url地址
        trademarkArr.value.forEach(element => {
            if(!/http/.test(element.logoUrl)){
                element.logoUrl='http://'+element.logoUrl
            }
        });
    }
}
// 组件挂载生命周期钩子
onMounted(()=>{
    getHasTrademark()
})
// 上传图片组件->上传图片之前触发的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // 可用于约束文件上传的大小和类型
    // 要求：上传文件格式png|jpg|gif 4M
    if(rawFile.type=='image/png'||rawFile.type=='image/jpeg'||rawFile.type=='image/gif'){
        if(rawFile.size/1024/1024 <4){
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
// 图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response,uploadFile) => {
    // response：即为当前这场上传图片服务器返回的数据
    // 收集上传图片的地址，添加一个品牌的时候带给服务器
    tradmarkParams.logoUrl=response.data
    // 当图片上传成功清除校验
    formRef.value.clearValidate('logoUrl')
}
// 品牌名称自定义校验规则方法
const validatorTmName=(rule:any,value:any,callBack:any)=>{
    // 表单对象触发blur的时候触发
    if(value.trim().length>=2){
        callBack()
    }else{
        callBack(new Error('品牌名称位数大于等于两位'))
    }
}
// 品牌logo自定义校验规则方法
const validatorlogoUrl=(rule:any,value:any,callBack:any)=>{
    // 如果图片上传
    if(value){
        callBack()
    }else{
        callBack(new Error('LOGO图片务必上传'))
    }
}
// 表单验证规则对象
const rules ={
    tmName:[
        {required:true,trigger:'blur',validator:validatorTmName}
    ],
    logoUrl:[
        {required:true,trigger:'change',validator:validatorlogoUrl}
    ]
}
</script>
 
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>