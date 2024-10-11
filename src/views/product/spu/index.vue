<template>
    <div>
        <!-- 三级分类 -->
        <Category :scene="scene"></Category>
        <!-- 展示已有spu -->
        <el-card style="margin:10px 0px;">
            <!-- 展示已有spu -->
            <div v-show="scene==0">
                <!-- 顶部添加spu按钮 -->
                <el-button type="primary" size="default" icon="Plus" @click="addSpu" :disabled="!catgoryStore.c3Id">添加SPU</el-button>
                <!-- 展示已有spu -->
                <el-table border style="margin:10px 0px;" :data="records">
                    <el-table-column label='序号' type="index" aglin="center" width="80px"></el-table-column>
                    <el-table-column label='SPU名称' prop="spuName"></el-table-column>
                    <el-table-column label='SPU描述' prop="description" show-overflow-tooltip></el-table-column>
                    <el-table-column label='SPU操作'>
                        <template #="{row,$index}">
                            <el-button type="primary" size="small" icon="Plus" title="添加SKU" @click="addSku(row)"></el-button>
                            <el-button type="primary" size="small" icon="Edit"  title="修改SPU" @click="updateSpu(row)"></el-button>
                            <el-button type="primary" size="small" icon="View"  title="查看SPU" @click=""></el-button>
                            <el-button type="primary" size="small" icon="Delete" title="删除SPU" @click=""></el-button>
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
                    @change="getHasSPU"
                    />
            </div>
            <!-- 添加或修改已有spu -->
            <SpuForm ref="spu" v-show="scene==1" @changeScene="changeScene"></SpuForm>
            <!-- 添加sku -->
            <SkuForm ref="sku" v-show="scene==2" @changeScene="changeScene"></SkuForm>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import { reqHasSpu } from '@/api/product/spu';
import SpuForm from './spuForm.vue';
import SkuForm from './skuForm.vue';
//分类相关仓库
import useCatgoryStore from '@/store/modules/catgory';
import type { HasSpuResponseData,Records,SpuData } from '@/api/product/spu/type';
let catgoryStore=useCatgoryStore()
// 控制场景
let scene =ref(0)// 0:展示已有spu|1:添加或修改spu|2:添加sku
// 分页器默认页码
let pageNo=ref(1)
// 每页展示数量
let limit =ref<number>(3)
// 存储已有数据总数
let total =ref<number>(0)
// 存储已有spu数据
let records=ref<Records>([])
// 获取spu子组件的实例对象
let spu=ref<any>()
// 获取sku子组件的实例对象
let sku=ref<any>()
// 获取已有spu
const getHasSPU =async (pager=1)=>{
    // 根据点击的页码跳转到对应
    pageNo.value=pager
    let result:HasSpuResponseData= await reqHasSpu(pageNo.value,limit.value,catgoryStore.c3Id)
    if(result.code==200){
        records.value=result.data.records
        total.value=result.data.total
    }
}
// 添加spu
const addSpu=()=>{
    scene.value=1
    // 调用子组件的方法
    spu.value.initAddSpu(catgoryStore.c3Id)
}
// 修改spu
const updateSpu=(row:SpuData)=>{
    scene.value=1
    // 调用子组件的方法
    spu.value.initGetHasSpuData(row)
}
// 通过自定义事件，让子组件通知父组件切换场景
const changeScene=(obj:any)=>{
    console.log(obj);
    
    // 子组件点击取消，切换场景0
    scene.value=obj.flag
    // 判断是添加还是修改操作
    if(obj.Params=='update'){
        // 更新，留在当前页
        getHasSPU(pageNo.value)
    }else{
        // 添加，留在第一页
        getHasSPU()
    }
   
}
// 监听三级分类ID变化
watch(()=>catgoryStore.c3Id,()=>{
    // 如果为空不发请求
    if(!catgoryStore.c3Id) return
    getHasSPU()
})
// 当挂载时
onMounted(()=>{
    getHasSPU()
})
// 添加sku
const addSku=(row:SpuData)=>{
    // 切换场景
    scene.value=2
    // 在父组件调用子组件的方法
    sku.value.initSkuData(catgoryStore.c1Id,catgoryStore.c2Id,catgoryStore.c3Id,row)
}
</script>

<style scoped>

</style>