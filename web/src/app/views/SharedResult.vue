<!--
    舞萌DX底分对象查看器 - DX Rating分享页视图

    @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { decode } from "js-base64";
import { sumRating } from "@/app/utils/b50-rating";
import { isDebugMode } from "@/app/utils/functions";
import { IMusicChart, IResponse } from "@/app/data/maidx-prober/interface";
import Api from "@/app/data/api";
import { ISharedResultResponse } from "@/app/data/api/interface";
import { AxiosError, AxiosResponse } from "axios";

import Footer from "@/app/components/frameworks/Footer.vue";
import PageTitle from "@/app/components/frameworks/PageTitle.vue";
import PlayerInfo from "@/app/components/frameworks/PlayerInfo.vue";
import MusicChart from "@/app/components/frameworks/MusicChart.vue";

// props定义
const props = defineProps<{
    // 结果ID
    resultId: string;
}>();

// 使用vue-router
const { push } = useRouter();


/* 开始成绩处理部分 */

// 错误对话框显示标记
const errDialog = ref(false);
// 错误信息
const errMsg = ref("");
// Loader显示标记
const loading = ref(true);
// 页面标题
const title = ref("");
// 玩家昵称
const nickName = ref("");
// 成绩表模式
const mode = ref("");
// 旧版本乐曲列表
const legacyCharts = ref<Array<IMusicChart>>([]);
// 当前版本乐曲列表
const currentCharts = ref<Array<IMusicChart>>([]);
// B40模式下的底分
const b40BaseRating = ref(0);
// B40模式下的段位分
const b40GradeRating = ref(0);
// B50模式下的总分
const b50Rating = ref(0);

// 检查结果ID是否正确传入
if (props.resultId === "") {
    // ID无效则跳转至用户名输入视图
    push({name: "UserInput"});
} else {
    // ID有效则从后端读取成绩记录
    let request = Api.load(props.resultId);
    request.then((res: AxiosResponse<ISharedResultResponse>) => {
        // 使用Base64解码，再解析JSON，得到查分器数据
        let data: unknown = JSON.parse(decode(res.data.data));
        let proberData: IResponse = data as IResponse;
        // 获取玩家昵称和谱面数据
        mode.value = res.data.type;
        nickName.value = proberData.nickname;
        legacyCharts.value = proberData.charts.sd;
        currentCharts.value = proberData.charts.dx;
        if (mode.value === "b50") {
            title.value = "Best 50模拟";
            // 计算B50总分
            let b35: number = sumRating(legacyCharts.value);
            let b15: number = sumRating(currentCharts.value);
            b50Rating.value = b35 + b15;
        } else {
            title.value = "Best 40查询";
            // 获取B40底分和段位分
            b40BaseRating.value = proberData.rating;
            b40GradeRating.value = proberData.additional_rating;
        }
        // 隐藏Loader
        loading.value = false;
    }).catch((err: AxiosError) => {
        // 接口请求错误的处理逻辑
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

/* 结束成绩处理部分 */


/* 开始曲目类型切换处理部分 */

// 旧版本曲目列表按钮默认样式
const legacyBtn = ref("primary");
// 当前版本曲目列表按钮默认样式
const currentBtn = ref("default");
// 旧版本曲目列表默认样式
const legacyChartStyle = ref("list-show");
// 当前版本曲目列表默认样式
const currentChartStyle = ref("list-hide");

/**
 *  切换旧版本曲目列表显示
 * 
 *  @returns {void}
 */

function showLegacyChart(): void {
    legacyBtn.value = "primary";
    currentBtn.value = "default";
    legacyChartStyle.value = "list-show";
    currentChartStyle.value = "list-hide";
}

/**
 *  切换当前版本曲目列表显示
 * 
 *  @returns {void}
 */

function showCurrentChart(): void {
    legacyBtn.value = "default";
    currentBtn.value = "warning";
    legacyChartStyle.value = "list-hide";
    currentChartStyle.value = "list-show";
}

/* 结束曲目类型切换处理部分 */


/* 杂项处理部分 */

/**
 *  错误对话框关闭按钮点击事件
 * 
 *  @returns {void}
 */

function toUserInput(): void {
    errDialog.value = false;
    push({name: "UserInput"});
}

/**
 *  标题返回按钮点击事件
 * 
 *  @returns {void}
 */

function goBack(): void {
    push({name: "UserInput"});
}

/**
 *  标题分享按钮点击事件
 * 
 *  @returns {false}
 */

function share(): false {
    // 禁用分享按钮点击事件
    return false;
}

// 加载视图时强制回到顶层
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
