<template>
    <div class="logo" v-if="setting.logoHidden">
        <img src="@/assets/icons/vite.svg" alt="logo">
        <p :class="{fold:LayoutSettingStore.fold}">{{setting.title}}</p>
    </div>
</template>

<script setup lang='ts'>
// 引入设置的标题和logo配置文件
import setting from '@/setting'
import useLayoutSettingStore from '@/store/modules/setting';
// 获取layout配置相关的仓库
let LayoutSettingStore=useLayoutSettingStore()
</script>

<script lang="ts">
export default {
    name:'Logo'
}

</script>
<style scoped lang="scss">
    .logo{
        width: 100%;
        height: $base-menu-logo-height;
        color: white;
        display: flex;
        align-items: center;
        padding: 10px;
        img{
            width: 40px;
            height: 40px;
        }
        p{
            font-size: $base-menu-logo-size;
            margin-left: 10px;
            &.fold{
                display: none;//当菜单折叠，隐藏文字
            }
        }
    }
</style>