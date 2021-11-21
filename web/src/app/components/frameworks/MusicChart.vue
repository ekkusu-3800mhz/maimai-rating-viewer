<!--
    舞萌DX底分对象查看器 - 谱面信息条目组件

    @author X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { IMusicChart } from "@/app/data/maidx-prober/interface";
import { defineProps } from "vue";
import { songCover } from "@/app/utils/asset-map";

import ChartType from "@/app/components/elements/ChartType.vue";
import Combo from "@/app/components/elements/Combo.vue";
import Rank from "@/app/components/elements/Rank.vue";
import Sync from "@/app/components/elements/Sync.vue";

const props = defineProps<{
    index: number;
    chart: IMusicChart;
}>();

function chartDifficulty(difficulty: string): string {
    switch (difficulty) {
        case "Basic":
            return "chart-card-bsc";
        case "Advanced":
            return "chart-card-adv";
        case "Expert":
            return "chart-card-exp";
        case "Master":
            return "chart-card-mst";
        case "Re:MASTER":
            return "chart-card-rem";
        default:
            return "";
    }
}
</script>

<template>
    <el-row justify="center">
        <el-col class="chart-item" :xs="24" :sm="18" :md="16">
            <el-card :class="chartDifficulty(props.chart.level_label)">
                <el-row justify="left">
                    <el-col :xs="6" :sm="4">
                        <img :src="songCover(props.chart.song_id)" class="song-cover" alt="Cover" />
                    </el-col>
                    <el-col class="song-info" :xs="18" :sm="20">
                        <h3 class="song-title">[#{{props.index}}] {{props.chart.title}}</h3>
                        <p class="song-achievement">({{props.chart.level_label}}) {{props.chart.achievements.toFixed(4)}}%</p>
                        <p class="song-level">Lv.{{props.chart.level}} ({{props.chart.ds}}) | RATING：{{props.chart.ra}}</p>
                        <div class="song-badge">
                            <Rank :value="props.chart.rate" />
                            &nbsp;&nbsp;
                            <Combo :value="props.chart.fc" />
                            &nbsp;&nbsp;
                            <Sync :value="props.chart.fs" />
                        </div>
                    </el-col>
                </el-row>
                <el-row justify="center">
                    <el-col :xs="24" class="song-badge-xs">
                        <Rank :value="props.chart.rate" />
                        &nbsp;&nbsp;
                        <Combo :value="props.chart.fc" />
                        &nbsp;&nbsp;
                        <Sync :value="props.chart.fs" />
                    </el-col>
                </el-row>
            </el-card>
            <ChartType :value="props.chart.type" class="chart-type" />
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.chart-card-bsc {
    background-color: #6fe163;
    border-color: #025235;
}
.chart-card-adv {
    background-color: #f8df3a;
    border-color: #c7450c;
}
.chart-card-exp {
    background-color: #ff828e;
    border-color: #c02138;
}
.chart-card-mst {
    background-color: #c27ff4;
    border-color: #67148d;
}
.chart-card-rem {
    background-color: #e5ddea;
    border-color: #8c2cd5;
}
.chart-item {
    position: relative;
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    text-align: center;
}
.chart-type {
    position: absolute;
    bottom: -0.65rem;
    left: 0.3rem;
}
.song-cover {
    width: 100%;
    border-radius: 10%;
    margin-left: -0.8rem;
    margin-top: -0.5rem;
    margin-bottom: -0.6rem;
}
.song-info {
    text-align: left;
    color: #ffffff;
    text-shadow: 1px 1px 3px #000000;
    padding-left: 0.5rem;
}
.song-title {
    margin-top: -0.4rem;
    font-size: 18px;
}
.song-achievement, .song-level {
    font-weight: 400;
}
.song-achievement {
    font-size: 16px;
    margin-top: -0.6rem;
}
.song-level {
    font-size: 14px;
    margin-top: -0.8rem;
    margin-bottom: -1rem;
}
.song-badge {
    display: none;
}
.song-badge-xs {
    display: block;
    text-align: center;
    background-color: rgba(255, 255, 255, 60%);
    border-radius: 5px;
    margin-top: 1.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.3rem;
}
@media (min-width: 768px) {
    .song-cover {
        margin-left: -0.8rem;
        margin-top: -0.5rem;
        margin-bottom: 0rem;
    }
    .song-title {
        margin-top: -0.5rem;
        font-size: 24px;
    }
    .song-achievement {
        font-size: 16px;
        margin-top: -1.3rem;
    }
    .song-level {
        font-size: 14px;
        margin-top: -0.9rem;
        margin-bottom: -1rem;
    }
    .song-badge-xs {
        display: none;
    }
    .song-badge {
        display: block;
        text-align: center;
        background-color: rgba(255, 255, 255, 60%);
        border-radius: 5px;
        margin-top: 1.5rem;
        padding-top: 0.5rem;
        padding-bottom: 0.3rem;
    }
}
</style>
