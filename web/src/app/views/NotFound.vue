<!--
    舞萌DX底分对象查看器 - 404错误视图

    @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import LoginHeader from "@/app/components/frameworks/LoginHeader.vue";
import Footer from "@/app/components/frameworks/Footer.vue";
</script>

<template>
     <el-container>
        <el-main>
            <LoginHeader />
            <div class="main-content">
                <el-row justify="center">
                    <el-col :xs="24" :sm="10">
                        <el-alert title="您所访问的资源不存在。" type="error" effect="dark" :closable="false" show-icon />
                    </el-col>
                </el-row>
            </div>
            <Footer />
        </el-main>
    </el-container>
</template>

<style lang="less" scoped>
.main-content {
    padding-top: 2rem;
    padding-bottom: 3rem;
}

@media (min-width: 768px) {
    .main-content {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
}
</style>
