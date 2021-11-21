<!--
    舞萌DX底分对象查看器 - 对战段位徽章组件

    @author X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { defineProps } from "vue";
import { grade } from "@/app/utils/asset-map";

const props = defineProps<{
    value: number;
}>();
</script>

<template>
    <img :src="grade(props.value)" alt="Grade" />
</template>

<style lang="less" scoped>
img {
    width: 110px;
}
@media (min-width: 768px) {
    img {
        width: 180px;
    }
}
</style>
