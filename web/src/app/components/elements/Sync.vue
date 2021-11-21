<!--
    舞萌DX底分对象查看器 - 同步率徽章组件

    @author X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { defineProps } from "vue";
import { sync } from "@/app/utils/asset-map";

const props = defineProps<{
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
