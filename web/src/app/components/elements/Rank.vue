<!--
    舞萌DX底分对象查看器 - 达成率指标组件

    @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { defineProps } from "vue";
import { rank } from "@/app/utils/asset-map";

const props = defineProps<{
    value: string;
}>();
</script>

<template>
    <img :src="rank(props.value)" alt="Rank" />
</template>

<style lang="less" scoped>
img {
    height: 35px;
}
</style>
