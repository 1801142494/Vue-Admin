<template>
    <!-- table组件，用来展示菜单数据 -->
    <el-table :data="PermisstionArr" style="width: 100%; margin-bottom: 20px" row-key="id" border>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="权限值" prop="code"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作">
            <!-- row为已有的菜单对象 -->
            <template #="{row,$index}">
                <el-button type="primary" size="small" :disabled="row.level==4?true:false" @click="addMenu(row)">{{row.level==3?'添加功能':'添加菜单'}}</el-button>
                <el-button type="primary" size="small" :disabled="row.level==1?true:false" @click="updateMenu(row)">编辑</el-button>
                    <el-popconfirm :title="`您确定要删除${row.name}?`" width="auto" icon="Delete" @confirm="deleteMenu(row)">
                        <template #reference>
                            <el-button type="primary" size="small" :disabled="row.level==1?true:false">删除</el-button>
                        </template>
                    </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <!-- dialog对话框，用于添加和修改菜单 -->
    <el-dialog
        v-model="dialogVisible"
        :title="menuData.id?'修改菜单':'添加菜单'"
    >
        <!-- 表单组件 -->
        <el-form>
            <el-form-item label="名称">
                <el-input placeholder="请你输入菜单名称" v-model="menuData.name"></el-input>
            </el-form-item>
            <el-form-item label="权限">
                <el-input placeholder="请你输入权限数值" v-model="menuData.code"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
        <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
        </div>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { reqAddOrUpdatePermisstion, reqAllPermisstion, reqDeletePermisstion } from '@/api/acl/menu';
import type { MenuParams,PermisstionResponseData,PermisstionList, Permisstion } from '@/api/acl/menu/type';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';

// 存储获取的菜单数据
let PermisstionArr=ref<PermisstionList>([])
// 控制对话框的显示和隐藏
let dialogVisible=ref<boolean>(false)
// 携带的参数
let menuData=reactive<MenuParams>({
    code:'',
    level:0,
    name:'',
    pid:0
})
// 获取菜单数据
const getHasPermisstion=async()=>{
    let result:PermisstionResponseData=await reqAllPermisstion()
    if(result.code==200){
        // 存储获取的菜单数据
        PermisstionArr.value=result.data
    }
}
// 添加菜单
const addMenu=(row:Permisstion)=>{
    // 清除数据
    Object.assign(menuData,{
        id:0,
        code:'',
        level:0,
        name:'',
        pid:0
    })
    // 显示对话框
    dialogVisible.value=true
    // 收集新增菜单的level数值
    menuData.level=row.level
    // 给谁新增子菜单
    menuData.pid=row.id as number
}
// 修改菜单
const updateMenu=(row:Permisstion)=>{
    // 显示对话框
    dialogVisible.value=true
    // 清除id
    menuData.id=0
    // 获取数据
    Object.assign(menuData,row)
}
//添加|修改 菜单对话框的确定按钮
const save=async()=>{
    // 发送请求，新增|修改
    let result=await reqAddOrUpdatePermisstion(menuData)
    if(result.code==200){
        // 隐藏对话框
        dialogVisible.value=false
        // 提示销售
        ElMessage({
            type:'success',
            message:menuData.id?'修改成功':'添加成功'
        })
        // 刷新数据
        getHasPermisstion()
    }else{
        ElMessage({
            type:'error',
            message:`${menuData.id?'修改失败':'添加失败'},${result.data}`
        })
    }
}
// 删除菜单
const deleteMenu=async(row:Permisstion)=>{
    // 发送删除请求
    let result=await reqDeletePermisstion(row.id as number)
    if(result.code==200){
        // 提示信息
        ElMessage({
            type:'success',
            message:'删除角色成功'
        })
        // 更新页面
        getHasPermisstion()
    }else{
        ElMessage({
            type:'error',
            message:`删除角色失败,${result.data}` 
        })
    }
}
// 当组件挂载时调用
onMounted(()=>{
    getHasPermisstion()
})
</script>

<style scoped>

</style>