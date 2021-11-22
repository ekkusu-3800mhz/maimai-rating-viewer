<!--
    舞萌DX底分对象查看器 - 连击徽章组件

    @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { defineProps } from "vue";
import { combo } from "@/app/utils/asset-map";

const props = defineProps<{
    value: string;
}>();
</script>

<template>
    <img :src="combo(props.value)" alt="Combo" />
</template>

<style lang="less" scoped>
img {
    height: 35px;
}
</style>
