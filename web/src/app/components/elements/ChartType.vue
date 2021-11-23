<!--
    舞萌DX底分对象查看器 - 谱面类型标记组件

    @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { defineProps } from "vue";
import { chartType } from "@/app/utils/asset-map";

// props定义
const props = defineProps<{
    // 接受父组件传入的谱面类型
    value: string;
}>();
</script>

<template>
    <img :src="chartType(props.value)" alt="Chart Type" />
</template>

<style lang="less" scoped>
img {
    height: 35px;
}
</style>
