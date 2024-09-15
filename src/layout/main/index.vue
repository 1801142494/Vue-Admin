<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="flag"/>
        </transition>
    </router-view>
</template>

<script setup lang='ts'>
import { ref,watch,nextTick } from 'vue'
// 引入tabbar设置相关仓库
import useLayoutSettingStore from '@/store/modules/setting.ts'
let layoutSettingStore = useLayoutSettingStore()
// 控制当前组件是否销毁重建
let flag=ref(true)
// 监视是否点击了tabbar的刷新
watch(()=>layoutSettingStore.refresh,()=>{
    // 点击刷新，销毁然后重建
    flag.value=false
    nextTick(()=>{
        flag.value=true
    })
})
</script>

<script lang="ts">
export default {
    name:'Main'
}
</script>

<style scoped>
.fade-enter-from{
    opacity: 0;
    transform: scale(0);
}
.fade-enter-active{
    transition: all 0.3s;
}
.fade-enter-to{
    opacity: 1;
    transform: scale(1);
}
</style>