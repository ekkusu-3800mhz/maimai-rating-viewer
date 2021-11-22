<!--
    舞萌DX底分对象查看器 - DX Rating分享页视图

    @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { decode } from "js-base64";
import { ElLoading } from "element-plus";
import { sumRating } from "@/app/utils/b50-rating";
import { isDebugMode } from "@/app/utils/functions";
import { IMusicChart, IResponse } from "@/app/data/maidx-prober/interface";
import Api from "@/app/data/api";
import { ISharedResultResponse } from "@/app/data/api/interface";
import { AxiosError, AxiosResponse } from "axios";

import Footer from "@/app/components/frameworks/Footer.vue";
import PageTitle from "../components/frameworks/PageTitle.vue";
import PlayerInfo from "@/app/components/frameworks/PlayerInfo.vue";
import MusicChart from "@/app/components/frameworks/MusicChart.vue";


const props = defineProps<{
    resultId: string;
}>();

const { push } = useRouter();

const errDialog = ref(false);
const errMsg = ref("");
const loading = ref(true);

const title = ref("");
const nickName = ref("");
const mode = ref("");
const legacyCharts = ref<Array<IMusicChart>>([]);
const currentCharts = ref<Array<IMusicChart>>([]);
const b40BaseRating = ref(0);
const b40GradeRating = ref(0);
const b50Rating = ref(0);

if (props.resultId === "") {
    push({name: "UserInput"});
} else {
    let request = Api.load(props.resultId);
    request.then((res: AxiosResponse<ISharedResultResponse>) => {
        let data: unknown = JSON.parse(decode(res.data.data));
        let proberData: IResponse = data as IResponse;
        mode.value = res.data.type;
        nickName.value = proberData.nickname;
        legacyCharts.value = proberData.charts.sd;
        currentCharts.value = proberData.charts.dx;
        if (mode.value === "b50") {
            title.value = "Best 50模拟";
            let b35: number = sumRating(legacyCharts.value);
            let b15: number = sumRating(currentCharts.value);
            b50Rating.value = b35 + b15;
        } else {
            title.value = "Best 40查询";
            b40BaseRating.value = proberData.rating;
            b40GradeRating.value = proberData.additional_rating;
        }
        loading.value = false;
    }).catch((err: AxiosError) => {
        if (typeof err.response === 'undefined') {
            errMsg.value = err.message;
        } else {
            if (err.response.status === 404) {
                push({name: "NotFound"});
            } else {
                errMsg.value = err.response.data.error;
            }
        }
        if (!isDebugMode()) {
            errMsg.value = "服务端接口请求失败，请稍后再试";
        }
        errDialog.value = true;
    });
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

function toUserInput() {
    errDialog.value = false;
    push({name: "UserInput"});
}

function goBack() {
    push({name: "UserInput"});
}

function share() {
    return false;
}

document.documentElement.scrollTop = document.body.scrollTop = 0;
</script>

<template>
    <el-container v-loading.fullscreen.lock="loading">
        <el-main v-if="!loading">
            <div class="main-content">
                <PageTitle :title="title" :back="goBack" :share="share" :share-show="false" />
                <PlayerInfo :mode="mode" :nick-name="nickName" :b40-base-rating="b40BaseRating" :b40-grade-rating="b40GradeRating" :b50-rating="b50Rating" />
                <el-row class="pagination" justify="center">
                    <el-col :xs="24" :sm="18" :md="16">
                        <el-card>
                            <el-button :type="legacyBtn" @click="showLegacyChart()" round>旧版本乐曲</el-button>
                            <el-button :type="currentBtn" @click="showCurrentChart()" round>当前版本乐曲</el-button>
                        </el-card>
                    </el-col>
                </el-row>
                <div :class="legacyChartStyle">
                    <MusicChart v-for="(legacyChart, legacyIndex) in legacyCharts" :key="legacyIndex" :index="(legacyIndex + 1)" :chart="legacyChart" />
                </div>
                <div :class="currentChartStyle">
                    <MusicChart v-for="(currentChart, currentIndex) in currentCharts" :key="currentIndex" :index="(currentIndex + 1)" :chart="currentChart" />
                </div>
            </div>
            <Footer />
        </el-main>
    </el-container>
    <el-backtop />
    <el-dialog :fullscreen="true" v-model="errDialog" title="错误" :show-close="false" center>
        <p style="text-align: center;">{{errMsg}}</p>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="danger" @click="toUserInput()">返回起始页</el-button>
            </span>
        </template>
    </el-dialog>
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
.dialog-width {
    width: 80%;
}
@media (min-width: 768px) {
    .main-content {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
}
</style>
