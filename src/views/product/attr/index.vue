<template>
    <div>
        <!-- 三级分类全局组件 -->
        <Category :scene="scene"/>
        <!-- scene控制场景切换(展示已有属性或修改添加) -->
        <template v-if="scene">
            <el-card style="margin-top: 10px;">
            <!-- 当3级分类存在，才可以操作添加 -->
            <el-button type="primary" size="default" @click="addAttr" :disabled="!catgoryStore.c3Id">添加属性</el-button>
            <el-table border style="margin: 10px 0px;" :data="attrArr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #="{row,$index}">
                        <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin: 5px;">
                            {{ item.valueName }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{row,$index}">
                        <el-button type="primary" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
                        <el-popconfirm :title="`您确定要删除${row.attrName}?`" width="auto" icon="Delete" @confirm="deleteAttr(row)">
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            </el-card>
        </template>
        <template v-else>
            <el-card>
                <el-form>
                    <el-form-item label="属性名称">
                        <el-input placeholder="请你输入属性名称" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                    <el-button :disabled="!attrParams.attrName" type="primary" size="default" icon="Plus" @click="addAttrValue">添加属性值</el-button>
                    <el-table border style="margin: 10px 0px;" :data="attrParams.attrValueList">
                        <el-table-column label="序号" width="80px" type="index" algin=center></el-table-column>
                        <el-table-column label="属性值">
                            <template #="{row,$index}">
                                <el-input :ref="(vc:any)=>inputArr[$index]=vc" v-if="row.flag" @blur="toLook(row,$index)" placeholder="请输入属性值" v-model="row.valueName"></el-input>
                                <div v-else="row.flag" @click="toEdit(row,$index)">{{ row.valueName }}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template #="{row,$index}">
                                <el-button type="primary" size="small" icon="Delete" @click="attrParams.attrValueList.splice($index,1)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button :disabled="!attrParams.attrValueList.length" type="primary" size="default" @click="save">保存</el-button>
                    <el-button type="primary" size="default" @click="cancel">取消</el-button>
                </el-form>
            </el-card>
        </template>
    </div>
</template>

<script setup lang='ts'>
import { reactive, ref, watch,onMounted,nextTick,onBeforeUnmount } from 'vue';
// 引入获取已有数据与属性值接口
import { reqAttr,reqAddOrUpdateAttr,reqDeleteAttr } from '@/api/product/attr';
// 引入数据类型
import { Attr,AttrResponseData, AttrValue } from '@/api/product/attr/type';
//分类相关仓库
import useCatgoryStore from '@/store/modules/catgory';
import { ElMessage } from 'element-plus';
let catgoryStore=useCatgoryStore()
// 存储已有属性和属性值
let attrArr =ref<Attr[]>([])
// 控制下方卡片切换
let scene =ref(true)
// 收集新增的属性的数据
let attrParams=reactive<Attr>({
    attrName:'',//新增的属性值
    attrValueList:[//新增的属性值数组
    ],
    categoryId:'',//三级分类id
    categoryLevel:3,//代表三级分类
})
// 准备一个数组存储el-input实例对象，用于聚焦
let inputArr =ref<any[]>([])
// 监听三级分类id
watch(()=>catgoryStore.c3Id,()=>{
    // 清空上次查询的数据
    attrArr.value=[]
    // 保证三级分类id存在
    if(!catgoryStore.c3Id) return
    getAttr()
})
// 获取已有数据与属性值
const getAttr = async()=>{
    const {c1Id,c2Id,c3Id} =catgoryStore
    let result:AttrResponseData = await reqAttr(c1Id,c2Id,c3Id)
    if(result.code==200){
        attrArr.value=result.data
    }
}
// 添加属性
const addAttr=()=>{
    // 每次点击清空数据
    Object.assign(attrParams,{
        attrName:'',
        attrValueList:[
        ],
        categoryId:catgoryStore.c3Id,// 添加三级分类id
        categoryLevel:3,
    })
    // 切换场景
    scene.value=false
}
// 修改属性
const updateAttr=async (row:Attr)=>{
    scene.value=false
    // 展示已有属性(这里要深拷贝)
    Object.assign(attrParams,JSON.parse(JSON.stringify(row)))
    // 发送修改数据的网络请求
    await reqAddOrUpdateAttr(attrParams)
}
//取消修改或添加
const cancel=()=>{
    scene.value=true
}
// 添加属性值
const addAttrValue=()=>{
    // 点击按钮后，像数组添加一个赋值对象
    attrParams.attrValueList.push({
        valueName:'',
        flag:true
    })
    // 自动获取聚焦
    nextTick(()=>{
        inputArr.value[attrParams.attrValueList.length-1].focus()
    })
}
// 保存按钮
const save=async ()=>{
    // 检测合法性，不能为空
    // attrParams.attrValueList.forEach(item=>{
    //     if(item.valueName.trim()==''){
    //         // 提示信息
    //         ElMessage({
    //             type:'error',
    //             message:'属性值不能为空'
    //         })
    //         return
    //     }
    // })
    // 发送请求
    let result:any= await reqAddOrUpdateAttr(attrParams)
    if(result.code==200){
        //切换场景
        scene.value=true
        // 提示信息
        ElMessage({
            type:'success',
            message:attrParams.id?'修改成功':'添加成功'
        })
    }else{
        ElMessage({
            type:'error',
            message:attrParams.id?'修改失败':'添加失败'
        })
    }
}
// 属性值表单元素失去焦点
const toLook=(row:AttrValue,$index:number)=>{
    //检测合法性，不能为空
    if(row.valueName.trim()==''){
        // 删除属性值为空的数
        attrParams.attrValueList.splice($index,1)
        // 提示信息
        ElMessage({
            type:'error',
            message:'属性值不能为空'
        })
        return
    }
    //检测重复性
    let repeat= attrParams.attrValueList.find((item)=>{
        if(item!=row){
            return item.valueName===row.valueName
        }
    })
    // 如果重复，删除重复项并中断
    if(repeat){
        // 删除重复的数
        attrParams.attrValueList.splice($index,1)
        // 提示信息
        ElMessage({
            type:'error',
            message:'属性值不能重复'
        })
        return
    }
    // 展示div
    row.flag=false
}
// 属性值表单元素获取焦点
const toEdit=(row:AttrValue,$index:number)=>{
    // 展示input
    row.flag=true
    // 点击后自动聚焦
    nextTick(()=>{
        inputArr.value[$index].focus()
    })
}
// 删除已有属性气泡的事件回调
const deleteAttr=async (row:Attr)=>{
    let result=await reqDeleteAttr(row.id)
    if(result.code==200){
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        // 删除成功后重新获取数据
        getAttr()
    }else{
        ElMessage({
            type:'error',
            message:'删除失败'
        })
    }
}
// 当组件挂载时
onMounted(()=>{
    // 判断当前是否有三级分类
    if(catgoryStore.c3Id){
        getAttr()
    }
})
// 当组件即将销毁的时候
onBeforeUnmount(()=>{
    //清空catgoryStore仓库
    catgoryStore.$reset()
})
</script>

<style scoped>
.el-input{
    width: 150px;
}
</style>