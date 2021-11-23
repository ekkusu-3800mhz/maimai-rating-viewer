<!--
    舞萌DX底分对象查看器 - DX Rating框组件

    @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { b40RatingColor, b50RatingColor } from "@/app/utils/asset-map";

// props定义
const props = defineProps<{
    // 成绩表类型
    mode: string;
    // DX Rating值
    value: number;
}>();

// 根据成绩表类型选择对应模式，然后根据Rating值解出Rating框的颜色
const color = ref("");
color.value = (props.mode === "b50") ? b50RatingColor(props.value) : b40RatingColor(props.value);
</script>

<template>
    <img :src="color" alt="DX Rating" />
</template>

<style lang="less" scoped>
img {
    width: 120px;
}
@media (min-width: 768px) {
    img {
        width: 296px;
    }
}
</style>
