<!--
    舞萌DX底分对象查看器 - 页面标题组件

    @author X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { defineProps } from "vue";

import { Share, ArrowLeft } from '@element-plus/icons';

const props = defineProps<{
    title: string;
    back: () => void;
    share: () => void;
}>();
</script>

<template>
    <el-row class="page-title" justify="center">
        <el-col :xs="24" :sm="18" :md="16">
            <el-card>
                <el-row>
                    <el-col :xs="20" :sm="16">
                        <el-page-header :icon="ArrowLeft" :content="props.title" @back="props.back" />
                    </el-col>
                    <el-col class="title-btn-group" :xs="4" :sm="8">
                        <el-icon class="share-icon" :size="20" @click="props.share">
                            <Share />
                        </el-icon>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.page-title {
    margin-top: -2rem;
    padding-bottom: 1rem;
}
.title-btn-group {
    text-align: right;
}
.share-icon {
    cursor: pointer;
}
@media (min-width: 768px) {
    .page-title {
        margin-top: 0.5rem;
    }
}
</style>
