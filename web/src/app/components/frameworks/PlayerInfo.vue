<!--
    舞萌DX底分对象查看器 - 玩家基础信息卡片组件

    @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { ref, defineProps } from "vue";

import Rating from "@/app/components/elements/Rating.vue";
import Grade from "@/app/components/elements/Grade.vue";

// props定义
const props = defineProps<{
    // 玩家昵称
    nickName: string;
    // 成绩表类型
    mode: string;
    // B40模式下的底分
    b40BaseRating: number;
    // B40模式下的段位分
    b40GradeRating: number;
    // B50模式下的总分
    b50Rating: number;
}>();

// 计算总DX Rating
const rating = ref(0);
rating.value = (props.mode === "b50") ? props.b50Rating : (props.b40BaseRating + props.b40GradeRating);
</script>

<template>
    <el-row justify="center">
        <el-col :xs="24" :sm="18" :md="16">
            <el-card>
                <div class="player-info">
                    <h1>{{nickName}}</h1>
                    <template v-if="props.mode === 'b50'">
                        <div class="rating-and-grade">
                            <div class="dx-rating__b50">
                                <p class="rating-plate"><Rating :mode="props.mode" :value="rating" /></p>
                                <p class="rating-num">{{rating}}</p>
                            </div>
                            <p>（从Splash Plus版本开始，段位Rating不会包含在DX Rating之内）</p>
                        </div>
                    </template>
                    <template v-else>
                        <div class="rating-and-grade">
                            <div class="dx-rating__b40">
                                <p class="rating-plate"><Rating :mode="props.mode" :value="rating" /></p>
                                <p class="rating-num">{{rating}}</p>
                            </div>
                            <p class="grade__b40"><Grade :value="b40GradeRating" /></p>
                        </div>
                        <p class="dx-rating-detail">（底分：{{b40BaseRating}} + 段位分：{{b40GradeRating}}）</p>
                    </template>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<style lang="less" scoped>
.player-info {
    text-align: center;
}
.player-info > h1 {
    font-weight: 300;
    font-size: 32px;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
}
.rating-and-grade {
    text-align: center;
}
.dx-rating-detail {
    margin-top: -0.5rem;
}
.dx-rating__b40 > p.rating-num {
    font-weight: 400;
    font-size: 16px;
    color: #ffffff;
    margin-top: -2.95rem;
    margin-left: 2.8rem;
    text-shadow: 0px 0px 5px #000000;
}
.dx-rating__b40 {
    margin-left: 5.5rem;
    margin-top: -1rem;
}
.grade__b40 {
    margin-top: -2.55rem;
    margin-right: 8rem;
}
.dx-rating__b50 > p.rating-num {
    font-weight: 400;
    font-size: 16px;
    color: #ffffff;
    margin-top: -2.95rem;
    margin-left: 2.8rem;
    text-shadow: 0px 0px 5px #000000;
}
.dx-rating__b50 {
    margin-top: -1rem;
}
@media (min-width: 768px) {
    .player-info > h1 {
        font-weight: 300;
        font-size: 44px;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .dx-rating__b40 > p.rating-num {
        font-weight: 700;
        font-size: 36px;
        color: #ffffff;
        margin-top: -5.3rem;
        margin-left: 7.3rem;
        text-shadow: 0px 0px 5px #000000;
    }
    .dx-rating-detail {
        margin-top: -1rem;
    }
    .dx-rating__b40 {
        margin-left: 12rem;
    }
    .grade__b40 {
        margin-top: -6rem;
        margin-right: 20rem;
    }
    .dx-rating__b50 > p.rating-num {
        font-weight: 700;
        font-size: 36px;
        color: #ffffff;
        margin-top: -5.3rem;
        margin-left: 7rem;
        text-shadow: 0px 0px 5px #000000;
    }
}
</style>
