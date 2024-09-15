<template>
     <div class="tabbar_right">
        <el-button icon="Refresh" circle @click=""></el-button>
        <el-button icon="FullScreen" circle @click=""></el-button>
        <el-button icon="Setting" circle @click=""></el-button>
        <img src="../../../../public/pamu.png" style="width: 30px; height: 30px; margin: 0px 10px;">
        <!-- 下拉菜单 -->
        <el-dropdown>
            <span class="el-dropdown-link">
                admin
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
            </span>
            <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang='ts'>

</script>

<script lang="ts">
export default{
    name:'Setting'
}
</script>

<style scoped>

</style>