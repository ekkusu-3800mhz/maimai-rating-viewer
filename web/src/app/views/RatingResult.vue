<!--
    舞萌DX底分对象查看器 - DX Rating详情视图

    @author X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { sumRating } from "@/app/utils/b50-rating";
import { IResponse } from "@/app/data/maidx-prober/interface";

import Footer from "@/app/components/frameworks/Footer.vue";
import PlayerInfo from "@/app/components/frameworks/PlayerInfo.vue";
import PageTitle from "@/app/components/frameworks/PageTitle.vue";
import MusicChart from "@/app/components/frameworks/MusicChart.vue";

const props = defineProps<{
    mode: string;
}>();

const { push } = useRouter();
const store = useStore();

if (props.mode !== "b40" && props.mode !== "b50") {
    push({name: "NotFound"});
}

const title = ref("");
const proberData = ref<IResponse>(store.state.proberData);
const b40BaseRating = ref(0);
const b40GradeRating = ref(0);
const b50Rating = ref(0);

if (props.mode === "b50") {
    title.value = "Best 50模拟";
    let b35: number = sumRating(proberData.value.charts.sd);
    let b15: number = sumRating(proberData.value.charts.dx);
    b50Rating.value = b35 + b15;
} else {
    title.value = "Best 40查询";
    b40BaseRating.value = proberData.value.rating;
    b40GradeRating.value = proberData.value.additional_rating;
}

function goBack(): void {
    push({name: "UserInput"});
}

function share(): void {
    ;
}

const legacyBtn = ref("primary");
const currentBtn = ref("default");
const legacyChartStyle = ref("list-show");
const currentChartStyle = ref("list-hide");

function showLegacyChart(): void {
    legacyBtn.value = "primary";
    currentBtn.value = "default";
    legacyChartStyle.value = "list-show";
    currentChartStyle.value = "list-hide";
}

function showCurrentChart(): void {
    legacyBtn.value = "default";
    currentBtn.value = "warning";
    legacyChartStyle.value = "list-hide";
    currentChartStyle.value = "list-show";
}
</script>

<template>
    <el-container>
        <el-main>
            <div class="main-content">
                <PageTitle :title="title" :back="goBack" :share="share" />
                <PlayerInfo :mode="props.mode" :nick-name="proberData.nickname" :b40-base-rating="b40BaseRating" :b40-grade-rating="b40GradeRating" :b50-rating="b50Rating" />
                <el-row class="pagination" justify="center">
                    <el-col :xs="24" :sm="18" :md="16">
                        <el-card>
                            <el-button :type="legacyBtn" @click="showLegacyChart()" round>旧版本乐曲</el-button>
                            <el-button :type="currentBtn" @click="showCurrentChart()" round>当前版本乐曲</el-button>
                        </el-card>
                    </el-col>
                </el-row>
                <div :class="legacyChartStyle">
                    <MusicChart v-for="(legacyChart, legacyIndex) in proberData.charts.sd" :key="legacyIndex" :index="(legacyIndex + 1)" :chart="legacyChart" />
                </div>
                <div :class="currentChartStyle">
                    <MusicChart v-for="(currentChart, currentIndex) in proberData.charts.dx" :key="currentIndex" :index="(currentIndex + 1)" :chart="currentChart" />
                </div>
            </div>
            <Footer />
        </el-main>
    </el-container>
    <el-backtop />
</template>

<style lang="less" scoped>
.main-content {
    padding-top: 2rem;
    padding-bottom: 3rem;
}
.pagination {
    padding-top: 1rem;
    text-align: center;
}
.list-show {
    display: block;
}
.list-hide {
    display: none;
}
@media (min-width: 768px) {
    .main-content {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
}
</style>
