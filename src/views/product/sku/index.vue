<template>
    <el-card>
        <!-- 展示sku内容 -->
        <el-table border style="margin: 10px 0px;" :data="skuArr">
            <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
            <el-table-column label="名称" prop="skuName" show-overflow-tooltip width="150px"></el-table-column>
            <el-table-column label="描述" prop="skuDesc" show-overflow-tooltip width="150px"></el-table-column>
            <el-table-column label="图片" width="150px">
                <template #="{row,$index}">
                    <el-image :src="row.skuDefaultImg"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="重量" prop="weight" width="120px"></el-table-column>
            <el-table-column label="价格" prop="price" width="120px"></el-table-column>
            <el-table-column label="操作" width="240px" fixed="right">
                <template #="{row,$index}">
                    <el-button type="primary" size="small" :icon="row.isSale==1?'Bottom':'Top'" title="上架/下架" @click="updateSale(row)" v-has="'btn.Sku.updown'"></el-button>
                    <el-button type="primary" size="small" icon="Edit" title="更新" @click="updateSku()" v-has="'btn.Sku.update'"></el-button>
                    <el-button type="primary" size="small" icon="InfoFilled" title="查看详情" @click="findSku(row)" v-has="'btn.Sku.detail'"></el-button>
                    <el-popconfirm :title="`您确定要删除${row.skuName}?`" width="auto" icon="Delete" @confirm="deleteSku(row)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete" title="删除" v-has="'btn.Sku.remove'"></el-button>
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
            @change="getHasSku"
        />
        <!-- 抽屉组件-显示sku详情 -->
        <el-drawer v-model="drawer">
            <template #header>
            <h4>商品详情页</h4>
            </template>
            <template #default>
                <el-row>
                    <el-col :span="6">名称</el-col>
                    <el-col :span="18">{{ skuInfo.skuName }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">描述</el-col>
                    <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">价格</el-col>
                    <el-col :span="18">{{ skuInfo.price }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">平台属性</el-col>
                    <el-col :span="18">
                        <el-tag v-for="item in skuInfo.skuAttrValueList">{{item.valueName}}</el-tag>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">销售属性</el-col>
                    <el-col :span="18">
                        <el-tag v-for="item in skuInfo.skuSaleAttrValueList">{{item.saleAttrValueName}}</el-tag>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">商品图片</el-col>
                    <el-col :span="18">
                        <el-carousel 
                        indicator-position="none"
                        :interval="4000" type="card" height="200px">
                            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                                <img :src="item.imgUrl" style="width: 100%; height: 100%;">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
            </template>
        </el-drawer>
    </el-card>
</template>

<script setup lang='ts'>
import { reqCancelSale, reqDeleteSku, reqSaleSku, reqSkuInfo, reqSkuList } from '@/api/product/sku';
import { SkuData, SkuInfoData, SkuResponseData } from '@/api/product/sku/type';
import { ElMessage } from 'element-plus';
import { ref,onMounted } from 'vue';

// 分页器默认页码
let pageNo=ref(1)
// 每页展示数量
let limit =ref<number>(3)
// 存储已有数据总数
let total =ref<number>(0)
// 存储sku数据
let skuArr=ref<SkuData[]>([])
// 抽屉组件的显示和隐藏
let drawer = ref(false)
// 存储sku详情
let skuInfo=ref<any>({})
// 获取sku列表
const getHasSku= async (pager=1)=>{
    // 当前分页器
    pageNo.value=pager
    // 获取sku
    let result:SkuResponseData=await reqSkuList(pageNo.value,limit.value)
    if(result.code==200){
        total.value=result.data.total
        skuArr.value=result.data.records
    }
}
// 商品的上架和下架
const updateSale=async (row:SkuData)=>{
    // 如果当前isSale=1为上架状态——>下架
    // 反之亦然
    if(row.isSale==1){
        let result= await reqCancelSale(row.id as number)
        if(result.code==200){
            ElMessage({
                type:'success',
                message:'下架成功'
            })
        }else{
            ElMessage({
                type:'error',
                message:'下架失败'
            })
        }
        // 更新数据
        getHasSku(pageNo.value)
    }else{
        let result= await reqSaleSku(row.id as number)
        if(result.code==200){
            ElMessage({
                type:'success',
                message:'上架成功'
            })
        }else{
            ElMessage({
                type:'error',
                message:'上架失败'
            })
        }
        // 更新数据
        getHasSku(pageNo.value)
    }
}
// 更新sku
const updateSku=()=>{
    ElMessage({
        type:'success',
        message:'程序员在努力的更新中...'
    })
}
// 查看sku详情
const findSku=async (row:SkuData)=>{
    // 显示抽屉组件
    drawer.value=true
    // 发送请求
    let result=await reqSkuInfo(row.id as number)
    if(result.code==200){
        skuInfo.value=result.data
    }
}
const deleteSku=async(row:SkuData)=>{
    let result:SkuInfoData=await reqDeleteSku(row.id as number)
    if(result.code==200){
        // 提示信息
        ElMessage({
            type:'success',
            message:'删除SKU成功'
        })
        // 更新页面
        getHasSku(skuArr.value.length>1?pageNo.value:pageNo.value-1)
    }else{
        ElMessage({
            type:'error',
            message:`删除SKU失败,${result.data}`
        })
    }
}
// 当组件挂载时
onMounted(()=>{
    // 获取sku数据
    getHasSku()
})
</script>

<style scoped>
/* sku详情页跑马灯样式 */
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* tag样式 */
.el-tag{
    margin: 5px;
}
.el-row{
    margin: 10px 0px;
}
</style>