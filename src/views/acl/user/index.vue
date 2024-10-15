<template>
    <!-- 上方card--搜索用户 -->
    <el-card style="height: 80px;">
        <el-form :inline="true">
            <el-form-item label="用户名：">
                <el-input placeholder="请你输入搜索用户名"></el-input>
            </el-form-item>
            <el-form-item >
                <el-button type="primary" size="default" @click="">搜索</el-button>
                <el-button type="primary" size="default" @click="">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card >
    <!-- 下方card--展示用户列表信息 -->
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" @click="">添加用户</el-button>
        <el-button type="primary" size="default" @click="">批量删除</el-button>
        <!-- table展示用户信息 -->
        <el-table border style="margin-top: 10px;" :data="userArr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="用户姓名" align="center" prop="username" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" align="center" width="300px">
                <template #="{row,$index}">
                    <el-button type="primary" size="small" icon="User" @click="">分配角色</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="">编辑</el-button>
                    <el-button type="primary" size="small" icon="Delete" @click="">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="limit"
            :page-sizes="[5, 7, 9,11]"
            :background="true"
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @change="getAllUser"
        />
    </el-card>
</template>

<script setup lang='ts'>
import { reqUserList } from '@/api/acl/user';
import { UserResponseData,Records } from '@/api/acl/user/type';
import { ref,onMounted } from 'vue';

// 分页器默认页码
let pageNo=ref(1)
// 每页展示数量
let limit =ref<number>(5)
// 存储已有数据总数
let total =ref<number>(0)
// 存储用户列表
let userArr=ref<Records>([])
// 获取全部用户信息的方法
const getAllUser=async (pager=1)=>{
    // 收集当前页码
    pageNo.value=pager
    let result:UserResponseData =await reqUserList(pageNo.value,limit.value)
    if(result.code==200){
        // 存储信息总数
        total.value=result.data.total
        // 收集用户列表信息
        userArr.value=result.data.records
    }
}
// 当挂载时的生命周期钩子
onMounted(()=>{
    getAllUser()
})
</script>

<style scoped>
.el-form{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>