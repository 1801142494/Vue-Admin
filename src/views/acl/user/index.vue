<template>
    <!-- 上方card--搜索用户 -->
    <el-card style="height: 80px;">
        <el-form :inline="true" class="formSearch">
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
        <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
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
                    <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
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
         <!-- 抽屉组件-用于添加|更新 用户信息 -->
         <el-drawer v-model="drawer">
            <!-- 头部标签：文字内容动态显示 -->
            <template #header>
            <h4>{{userParams.id?'更新用户':'修改用户'}}</h4>
            </template>
            <!-- 身体部分 -->
            <template #default>
                <el-form :model="userParams" :rules="rules" ref="formRef">
                    <el-form-item label="用户姓名" prop="username">
                        <el-input placeholder="请您输入用户姓名" v-model="userParams.username"></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="name">
                        <el-input placeholder="请您输入用户昵称" v-model="userParams.name"></el-input>
                    </el-form-item>
                    <el-form-item v-if="!userParams.id" label="用户密码" prop="password">
                        <el-input placeholder="请您输入用户昵称" v-model="userParams.password"></el-input>
                    </el-form-item>
                </el-form>
            </template>
            <!-- 脚部分 -->
            <template #footer>
                <div style="flex: auto;">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="save">确定</el-button>
                </div>
            </template>
        </el-drawer>
    </el-card>
</template>

<script setup lang='ts'>
import { reqAddOrUpdateUser, reqUserList } from '@/api/acl/user';
import { UserResponseData,Records, User } from '@/api/acl/user/type';
import { ElMessage } from 'element-plus';
import { ref,onMounted, reactive, nextTick } from 'vue';

// 分页器默认页码
let pageNo=ref(1)
// 每页展示数量
let limit =ref<number>(5)
// 存储已有数据总数
let total =ref<number>(0)
// 存储用户列表
let userArr=ref<Records>([])
// 抽屉组件的显示和隐藏
let drawer = ref(false)
// 收集添加的用户信息
let userParams =reactive<User>({
    username:'',
    name:'',
    password:''
})
// 表单实例对象
let formRef =ref<any>()
// 自定义校验用户名字的回调函数
let validatorUsername=(rule:any,value:any,callBack:any)=>{
    // 用户名字|昵称至少5位以上
    if(value.trim().length>=5){
        callBack()
    }else{
        callBack(new Error('用户姓名至少五位'))
    }
}
// 自定义校验用户昵称的回调函数
let validatorName=(rule:any,value:any,callBack:any)=>{
    // 用户名字|昵称至少5位以上
    if(value.trim().length>=5){
        callBack()
    }else{
        callBack(new Error('用户昵称至少五位'))
    }
}
// 自定义校验用户密码的回调函数
let validatorPassword=(rule:any,value:any,callBack:any)=>{
    // 用户名字|昵称至少5位以上
    if(value.trim().length>=6){
        callBack()
    }else{
        callBack(new Error('用户密码至少六位'))
    }
}
// 表单校验规则对象
let rules = {
    // 用户名字
    username:[{required:true,trigger:'blur',validator:validatorUsername}],
    // 用户昵称
    name:[{required:true,trigger:'blur',validator:validatorName}],
    // 用户密码
    password:[{required:true,trigger:'blur',validator:validatorPassword}],
}
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
// 添加用户回调
const addUser=()=>{
    // 展示抽屉组件
    drawer.value=true
    // 清空数据
    Object.assign(userParams,{
        username:'',
        name:'',
        password:''
    })
    // 清除上一次错误的表单验证信息
    nextTick(()=>{
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('password')
    })
}
// 更新用户信息
const updateUser=(row:User)=>{
    // 展示抽屉组件
    drawer.value=true
    // 存储收集已有的账户信息
    Object.assign(userParams,row)
    // 清除上一次错误的表单验证信息
    nextTick(()=>{
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
    })
}
// 抽屉的取消按钮
const cancel=()=>{
    // 隐藏抽屉
    drawer.value=false
}
// 抽屉的确定按钮
const save=async ()=>{
    // 点击保存按钮，确保表单验证全部通过(通过await,如果不通过就不继续执行)
    await formRef.value.validate()
    // 发送请求
    let result:any=await reqAddOrUpdateUser(userParams)
    // 判断添加或更新是否成功
    if(result.code==200){
        // 隐藏抽屉
        drawer.value=false
        // 提示销售
        ElMessage({
            type:'success',
            message:userParams.id?'更新成功':'添加成功'
        })
        // 刷新浏览器(当修改了自己的用户信息，会退回到登录)
        window.location.reload()
    }else{
        ElMessage({
            type:'error',
            message:userParams.id?'更新失败':'添加失败'
        })
    }
}
// 当挂载时的生命周期钩子
onMounted(()=>{
    getAllUser()
})
</script>

<style scoped>
.formSearch{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>