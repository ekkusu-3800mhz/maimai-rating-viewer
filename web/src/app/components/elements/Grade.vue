<!--
    舞萌DX底分对象查看器 - 对战段位徽章组件

    @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { defineProps } from "vue";
import { grade } from "@/app/utils/asset-map";

// props定义
const props = defineProps<{
    // 接受父组件传入的段位值
    value: number;
}>();
</script>

<template>
    <img :src="grade(props.value)" alt="Grade" />
</template>

<style lang="less" scoped>
img {
    width: 75px;
}
@media (min-width: 768px) {
    img {
        width: 180px;
    }
}
</style>
