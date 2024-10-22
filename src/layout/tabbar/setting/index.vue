<template>
     <div class="tabbar_right">
        <el-button icon="Refresh" circle @click="refresh"></el-button>
        <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
        <!-- 气泡框组件，设置主题颜色和暗黑模式 -->
        <el-popover
            placement="bottom"
            title="主题设置"
            :width="300"
            trigger="hover"
        >
            <!-- 表单组件 -->
            <el-fom>
                <el-form-item label="主题颜色">
                    <!-- 取色器组件 -->
                    <el-color-picker 
                        @change="setColor"
                        v-model="color" 
                        :teleported="false"
                        show-alpha 
                        :predefine="predefineColors" 
                    />
                </el-form-item>
                <el-form-item label="暗黑模式">
                    <!-- 开关组件 -->
                    <el-switch
                        @change="changeDark"
                        v-model="dark"
                        inline-prompt
                        active-icon="MoonNight"
                        inactive-icon="Sunny"
                    />
                </el-form-item>
            </el-fom> 
            <!-- 插槽 -->
            <template #reference>
                <el-button icon="Setting" circle></el-button>
            </template>
        </el-popover>
        <img :src="userStore.avatar" style="width: 30px; height: 30px; margin: 0px 10px; border-radius: 50%;">
        <!-- 下拉菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                {{userStore.username}}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
            </span>
            <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
// 引入tabbar设置相关仓库
import useLayoutSettingStore from '@/store/modules/setting.ts'
// 引入用户相关仓库
import useUserStore from '@/store/modules/user';

let userStore =useUserStore()
let layoutSettingStore = useLayoutSettingStore()
// 获取路由器对象
let $router =useRouter()
// 获取路由对象
let $route =useRoute()
// 收集开关组件的数据
let dark =ref<boolean>(false)
// 刷新按钮点击回调
const refresh=()=>{
    layoutSettingStore.refresh=!layoutSettingStore.refresh
}
// 全屏按钮点击回调
const fullScreen=()=>{
    // Dom对象的一个属性，用来判断当前是不是全屏[全屏：true,不是全屏：false]
    let full=document.fullscreenElement
    if(!full){
        // 利用文档根节点的requestFullscreen，实现全屏
        document.documentElement.requestFullscreen()
    }else{
        //退出全屏
        document.exitFullscreen()
    }
}
// 退出登录点击回调
const logout=async ()=>{
    // 第一件事：向服务器发送请求
    // 第二件事：清除仓库当中关于用户相关的数据
    // 第三件事：跳转到登录页面
    await userStore.userLogout();
    $router.push({path:'/login',query:{redirect:$route.path}})
}
// 颜色组件需要的数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
//主题颜色设置
const setColor=()=>{
    //通过 js 控制 css 变量
    // 获取根节点
    const el = document.documentElement
    // 获取 css 变量
    getComputedStyle(el).getPropertyValue(`--el-color-primary`)
    // 设置 css 变量
    el.style.setProperty('--el-color-primary', color.value)
}
// switch开关的change事件进行暗黑模式的切换
const changeDark=()=>{
    // 获取HTML根节点
    let html=document.documentElement
    // 通过开关状态控制html标签是否有类名
    dark.value?html.className='dark':html.className=''
}
</script>

<script lang="ts">
export default {
    name:'Setting'
}
</script>

<style scoped>

</style>