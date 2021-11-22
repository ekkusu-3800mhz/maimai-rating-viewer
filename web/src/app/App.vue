<!--
    舞萌DX底分对象查看器 - 应用路由视图

    @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const locale = ref(zhCn);
const { push, currentRoute } = useRouter();
if (currentRoute.value.name !== "SharedResult") {
    push({name: "UserInput"});
}
</script>

<template>
    <ElConfigProvider :locale="locale">
        <router-view />
    </ElConfigProvider>
</template>

<style lang="less">
body {
    background-color: #fcfcfc;
    font-family: Roboto, Noto Sans SC, Noto Sans JP, Microsoft YaHei, '微软雅黑', Arial, sans-serif !important;
    font-weight: 300;
}
a {
    color: #409eff;
    text-decoration: none;
}
img {
    pointer-events: none;
}
</style>
