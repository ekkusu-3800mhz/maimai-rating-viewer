<!--
    舞萌DX底分对象查看器 - 谱面类型标记组件

    @author X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { defineProps } from "vue";
import { chartType } from "@/app/utils/asset-map";

const props = defineProps<{
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
