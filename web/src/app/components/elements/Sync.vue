<!--
    舞萌DX底分对象查看器 - 同步率徽章组件

    @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { defineProps } from "vue";
import { sync } from "@/app/utils/asset-map";

// props定义
const props = defineProps<{
    // 接受父组件传入的Sync类型
    value: string;
}>();
</script>

<template>
    <img :src="sync(props.value)" alt="Sync" />
</template>

<style lang="less" scoped>
img {
    height: 35px;
}
</style>
