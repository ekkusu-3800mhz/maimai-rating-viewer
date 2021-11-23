<!--
    舞萌DX底分对象查看器 - DX Rating详情视图

    @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { encode } from "js-base64";
import { toClipboard } from "@soerenmartius/vue3-clipboard";
import { sumRating } from "@/app/utils/b50-rating";
import { IMusicChart, IResponse } from "@/app/data/maidx-prober/interface";
import Api from "@/app/data/api";
import { AxiosError, AxiosResponse } from "axios";
import { IResultCacheRequest, IResultCacheResponse } from "@/app/data/api/interface";
import { buildShareUrl, isDebugMode } from "@/app/utils/functions";

import Footer from "@/app/components/frameworks/Footer.vue";
import PlayerInfo from "@/app/components/frameworks/PlayerInfo.vue";
import PageTitle from "@/app/components/frameworks/PageTitle.vue";
import MusicChart from "@/app/components/frameworks/MusicChart.vue";

// props定义
const props = defineProps<{
    // 指定成绩表类型
    mode: string;
}>();

// 使用vue-router和vuex store
const { push } = useRouter();
const store = useStore();


/* 开始玩家成绩处理部分 */

// 玩家昵称
const nickName = ref("");
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

// 判断数据完整性
if ( (props.mode !== "b40" && props.mode !== "b50") || (store.state.proberData === {})
    || (store.state.userName === '') ) {
    // 若数据不完整则跳转至用户名输入视图，重新执行查询
    push({name: "UserInput"});
} else {
    let proberData: IResponse = store.state.proberData;
    // 从查分器数据获取昵称和谱面数据
    nickName.value = proberData.nickname;
    legacyCharts.value = proberData.charts.sd;
    currentCharts.value = proberData.charts.dx;
    if (props.mode === "b50") {
        // 计算B50总分
        let b35: number = sumRating(legacyCharts.value);
        let b15: number = sumRating(currentCharts.value);
        b50Rating.value = b35 + b15;
    } else {
        // 获取B40底分和段位分
        b40BaseRating.value = proberData.rating;
        b40GradeRating.value = proberData.additional_rating;
    }
}

/* 结束玩家成绩处理部分 */


/* 开始成绩分享处理部分 */

// 分享卡片显示标记
const shareCard = ref(false);
// 接口错误信息
const errMsg = ref("");
// 接口错误信息显示标记
const errAlert = ref(false);
// Loader显示标记
const loading = ref(false);
// 分享链接
const shareUrl = ref("");
// 分享链接复制按钮文字
const copyBtnText = ref("复制");

/**
 *  成绩表分享按钮点击事件
 * 
 *  @returns {void}
 */

function share(): void {
    // 开启Loader
    loading.value = true;
    // 封装接口请求数据
    let params: IResultCacheRequest = {
        // 成绩表类型
        type: props.mode,
        // 把查分器数据转换成JSON，再进行Base64编码
        data: encode(JSON.stringify(store.state.proberData)),
    };
    // 缓存需分享成绩
    let response = Api.save(params);
    response.then((res: AxiosResponse<IResultCacheResponse>) => {
        // 接口请求成功，构建分享链接并显示
        shareUrl.value = buildShareUrl(res.data.resultId);
        shareCard.value = true;
        loading.value = false;
    }).catch((err: AxiosError) => {
        // 接口请求失败的错误信息显示逻辑
        if (typeof err.response === 'undefined') {
            errMsg.value = err.message;
        } else {
            errMsg.value = err.response.data.error;
        }
        if (!isDebugMode()) {
            errMsg.value = "服务端接口请求失败，请稍后再试";
        }
        loading.value = false;
        errAlert.value = true;
    });
}

/**
 *  分享链接复制按钮点击事件
 * 
 *  @returns {void}
 */

function copyLink(): void {
    // 构建剪贴板内容
    const shareContent = `${nickName.value}的舞萌DX Rating对象列表 | ${shareUrl.value}`;
    // 调用剪贴板
    toClipboard(shareContent);
    // 动态更改按钮文字
    copyBtnText.value = "已复制";
    setTimeout(() => {
        copyBtnText.value = "复制";
    }, 2000);
}

/* 结束成绩分享处理部分 */


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


/* 开始页面标题处理部分 */

const title = ref("");
title.value = (props.mode === "b50") ? "Best 50模拟" : "Best 40查询";

/* 结束页面标题处理部分 */


/* 杂项处理部分 */

/**
 *  标题组件返回按钮点击事件
 * 
 *  @returns {void}
 */

function goBack(): void {
    push({name: "UserInput"});
}

// 加载视图时强制回到顶层
document.documentElement.scrollTop = document.body.scrollTop = 0;
</script>

<template>
    <el-container v-loading.fullscreen.lock="loading">
        <el-main>
            <div class="main-content">
                <PageTitle :title="title" :back="goBack" :share="share" :share-show="!shareCard" />
                <PlayerInfo :mode="props.mode" :nick-name="nickName" :b40-base-rating="b40BaseRating" :b40-grade-rating="b40GradeRating" :b50-rating="b50Rating" />
                <el-row class="share-card" justify="center" v-if="shareCard">
                    <el-col :xs="24" :sm="18" :md="16">
                        <el-card>
                            <el-result class="share-result" icon="success" title="保存成功" sub-title="您可通过复制以下链接进行分享" />
                            <div style="margin-top: 15px">
                                <el-input v-model="shareUrl" :readonly="true">
                                    <template #append>
                                        <el-button @click="copyLink()">{{copyBtnText}}</el-button>
                                    </template>
                                </el-input>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
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
</template>

<style lang="less" scoped>
.main-content {
    padding-top: 2rem;
    padding-bottom: 3rem;
}
.pagination, .share-card {
    padding-top: 1rem;
    text-align: center;
}
.share-result {
    margin-top: -2rem;
    margin-bottom: -2rem;
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
