<template>
    <!-- 上方card---职位搜索 -->
    <el-card>
        <el-form :inline="true" class="formSearch">
            <el-form-item label="职位搜索">
                <el-input placeholder="请您输入搜索职位关键字" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" :disabled="!keyword" @click="search">搜索</el-button>
                <el-button size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <!-- 下方card---添加和展示职位列表 -->
    <el-card style="margin: 10px 0px;">
        <el-button type="primary" size="default" icon="Plus" @click="addRole" v-has="'btn.Role.add'">添加角色</el-button>
        <!-- 展示职位列表 -->
        <el-table border style="margin: 10px 0px;" :data="roleArr">
            <el-table-column type="index" align="center" label="#"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="280px" align="center">
                <template #="{row,$index}">
                    <el-button type="primary" size="small" icon="User" @click="setPermission(row)" v-has="'btn.Role.assgin'">分配权限</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)" v-has="'btn.Role.update'">编辑</el-button>
                    <el-popconfirm :title="`您确定要删除${row.roleName}?`" width="auto" icon="Delete" @confirm="deleteRole(row)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete" v-has="'btn.Role.remove'">删除</el-button>
                        </template>
                    </el-popconfirm>
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
            @change="getHasRole"
        />
    </el-card>
    <!-- 添加职位和更新职位对话框 -->
    <el-dialog v-model="dialogVisite" :title="roleParams.id?'更新职位':'添加职位'">
        <el-form :model="roleParams" :rules="rules" ref="form">
            <el-form-item label="角色名称" prop="roleName">
                <el-input placeholder="请填写角色名称" v-model="roleParams.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisite=false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
        </template>
    </el-dialog>
    <!-- 抽屉组件，用于分配职位功能 -->
    <el-drawer v-model="drawer">
        <template #header>
        <h4>分配菜单与按钮权限</h4>
        </template>
        <template #default>
            <!-- 树形控件 -->
            <el-tree
                ref="tree"
                style="max-width: 600px"
                :data="menuArr"
                show-checkbox
                node-key="id"
                default-expand-all
                :default-checked-keys="selectArr"
                :props="defaultProps"
            />
        </template>
        <template #footer>
        <div style="flex: auto">
            <el-button @click="drawer=false">取消</el-button>
            <el-button type="primary" @click="handler">确定</el-button>
        </div>
        </template>
    </el-drawer>
</template>

<script setup lang='ts'>
// 引入仓库
import useLayoutSettingStore from '@/store/modules/setting';
import { reqAddOrUpdateRole, reqAllPermisstion, reqAllRoleList, reqDeleteRole, reqSetPermisstion } from '@/api/acl/role';
import { MenuList, MenuResponseData, Records, RoleData, RoleResponseData } from '@/api/acl/role/type';
import { ref,onMounted, reactive, nextTick } from 'vue';
import { ElMessage } from 'element-plus';

// 分页器默认页码
let pageNo=ref(1)
// 每页展示数量
let limit =ref<number>(5)
// 存储已有数据总数
let total =ref<number>(0)
// 存储全部已有角色
let roleArr=ref<Records>([])
// 存储搜索关键字
let keyword=ref<string>('')
// 获取模板setting仓库
let settingStore = useLayoutSettingStore()
// 控制对话框的显示隐藏
let dialogVisite=ref<boolean>(false)
// 收集新增岗位数据
let roleParams =reactive<RoleData>({
    roleName:''
})
// 表单实例
let form=ref<any>()
// 抽屉的显示和因此
let drawer=ref<boolean>(false)
// 存储用户权限的数据
let menuArr=ref<MenuList>([])
// 存储树形控件勾选的节点id（四级）
let selectArr=ref<number[]>([])
// 抽屉里的树形控件实例
let tree=ref<any>()
// 获取全部已有的角色数据
const getHasRole=async(pager=1)=>{
    // 修改当前页码
    pageNo.value=pager
    // 发请求
    let result:RoleResponseData= await reqAllRoleList(pageNo.value,limit.value,keyword.value)
    if(result.code==200){
        // 存储全部已有角色
        roleArr.value=result.data.records
        // 存储数据总个数
        total.value=result.data.total
    }
}
// 搜索按钮的事件回调
const search=()=>{
    // 通过关键字搜索
    getHasRole()
    // 清空搜索输入框
    keyword.value=''
}
// 重置按钮事件回调
const reset=()=>{
    settingStore.refresh=!settingStore.refresh
}
// 添加职位按钮的事件回调
const addRole=()=>{
    // 显示对话框
    dialogVisite.value=true
    // 清空数据
    Object.assign(roleParams,{
        roleName:'',
        id:0
    })
    // 清空上次表单验证
    nextTick(()=>{
        form.value.clearValidate('roleName')
    })
}
//更新已有职位按钮的事件回调
const updateRole=(row:RoleData)=>{
    // 显示对话框
    dialogVisite.value=true
    // 存储选中的职位信息
    Object.assign(roleParams,row)
    // 清空上次表单验证
    nextTick(()=>{
        form.value.clearValidate('roleName')
    })
}
// 自定义校验规则
const validatorReleName=(rule:any,value:any,callBack:any)=>{
    if(value.trim().length>=2){
        callBack()
    }else{
        callBack(new Error('职位名称至少两位'))
    }
}
// 职位相关校验规则
const rules={
    roleName:[
        {required:true,trigger:'blur',validator:validatorReleName}
    ]
}
// 添加职位对话框的保存按钮回调
const save=async ()=>{
    // 表单验证全部通过才继续
    await form.value.validate()
    //添加|更新职位请求
    let result= await reqAddOrUpdateRole(roleParams)
    if(result.code==200){
        // 隐藏对话框
        dialogVisite.value=false
        // 提示销售
        ElMessage({
            type:'success',
            message:roleParams.id?'更新成功':'添加成功'
        })
        // 再次获取已有职位
        getHasRole(roleParams.id?pageNo.value:1)
    }else{
        ElMessage({
            type:'error',
            message:roleParams.id?'更新失败':'添加失败'
        })
    }
}
// 分配职位权限按钮回调
const setPermission=async (row:RoleData)=>{
    //显示抽屉
    drawer.value=true
    // 收集当前要分类权限的职位的数据
    Object.assign(roleParams,row)
    // 根据职位获取相关菜单数据
    let result:MenuResponseData=await reqAllPermisstion(roleParams.id as number)
    if(result.code==200){
        menuArr.value=result.data
        // 筛选已勾选的数据
        selectArr.value= filterSelectArr(menuArr.value,[])
    }
}
// 树形控件的数据
const defaultProps={
    children:'children',
    label:'name'
}
// 递归筛选已勾选的四级菜单数据
const filterSelectArr=(allData:any,initArr:any)=>{
    allData.forEach((item:any)=>{
        if(item.select&&item.level==4){
            initArr.push(item.id)
        }
        if(item.children&&item.children.length>0){
            filterSelectArr(item.children,initArr)
        }
    })
    return initArr
}
// 抽屉的确定按钮事件回调
const handler=async ()=>{
    // 职位的ID
    let roleId=roleParams.id as number
    // 已经选中节点的id
    let arr=tree.value.getCheckedKeys()
    // 半选的id
    let arr1=tree.value.getHalfCheckedKeys()
    //合并选中和半选的
    let permissionId=arr.concat(arr1)

    //发送请求
    let result=await reqSetPermisstion(roleId,permissionId)
    if(result.code==200){
        // 提示信息
        ElMessage({
            type:'success',
            message:'分配权限成功'
        })
        // 隐藏抽屉
        drawer.value=false
        // 页面刷新
        window.location.reload()
    }else{
        ElMessage({
            type:'error',
            message:`分配权限失败，${result.data}`
        })
    }
}
// 删除职位按钮回调
const deleteRole=async (row:RoleData)=>{
    let result:any=await reqDeleteRole(row.id as number)
    if(result.code==200){
        // 提示信息
        ElMessage({
            type:'success',
            message:'删除角色成功'
        })
        // 更新页面
        if(pageNo.value==1){
            // 若是第一页则始终停留在当页
            getHasRole(pageNo.value)
        }else{
            // 非第一页，判断当前页是否还存在数据
            getHasRole(roleArr.value.length>1?pageNo.value:pageNo.value-1)
        }
    }else{
        ElMessage({
            type:'error',
            message:`删除角色失败,${result.data}` 
        })
    }
}
// 当组件挂载时调用的生命周期钩子
onMounted(()=>{
    getHasRole()
})
</script>

<style scoped>
.formSearch{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
}
</style>