<!--
    舞萌DX底分对象查看器 - 用户名输入视图

    @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Cookie from "js-cookie";
import { encode, decode } from "js-base64";
import MaiDXProberApi from "@/app/data/maidx-prober";
import { IMusicChart, IResponse } from "@/app/data/maidx-prober/interface";
import { AxiosError, AxiosResponse } from "axios";
import { overrideRating } from "@/app/utils/b50-rating";

import LoginHeader from "@/app/components/frameworks/LoginHeader.vue";
import Footer from "@/app/components/frameworks/Footer.vue";

// 使用vue-router和vuex store
const { push } = useRouter();
const store = useStore();


/* 开始成绩查询处理部分 */

// 用户名输入表单元素
const userInputRef = ref();
// 用户名输入表单
const userInput = ref({
    name: "",
});
// 用户名输入表单验证规则
const userInputRules = ref({
    name: [{
        required: true,
        message: "请输入舞萌DX查分器用户名",
        trigger: "blur",
    }],
});
// 表单Loader显示标记
const formLoading = ref(false);
// 表单错误显示标记
const errAlert = ref(false);
// 表单错误信息
const errMsg = ref("");
// 操作指南显示标记
const tutorial = ref(false);

// 尝试从Cookie读取用户名（黏性表单）
let userName = Cookie.get("USER_NAME");
userInput.value.name = (typeof userName === 'undefined') ? '' : decode(userName);

/**
 *  查询B40
 * 
 *  @returns {void}
 */

function queryB40(): void {
    // 显示Loader，清除错误信息
    formLoading.value = true;
    errAlert.value = false;
    errMsg.value = "";
    // 验证表单
    userInputRef.value.validate((valid: boolean) => {
        if (!valid) {
            formLoading.value = false;
            return false;
        }
        // 从查分器查询玩家数据
        const prober = new MaiDXProberApi(userInput.value.name);
        (prober.b40()).then((res: AxiosResponse<IResponse>) => {
            // 查询成功后，设置Cookie，并把用户名和查分器数据存入vuex store
            Cookie.set("USER_NAME", encode(userInput.value.name));
            store.commit("setUserName", userInput.value.name);
            store.commit("setProberData", res.data);
            // 跳转至结果视图
            push({
                name: "RatingResult",
                params: {
                    mode: "b40",
                },
            });
        }).catch((err: AxiosError) => {
            // 对查分器返回的错误进行处理
            formLoading.value = false;
            if (err.response?.status === 400) {
                errMsg.value = "用户不存在。请检查您的查分器账户是否正确输入。";
                errAlert.value = true;
            } else if (err.response?.status === 403) {
                errMsg.value = "该用户已禁止第三方查询成绩。请前往舞萌DX查分器修改隐私设置。";
                errAlert.value = true;
            } else {
                console.error(err);
            }
        })
    });
}

/**
 *  查询B50
 * 
 *  @returns {void}
 */

function queryB50(): void {
    // 显示Loader，清除错误信息
    formLoading.value = true;
    errAlert.value = false;
    errMsg.value = "";
    // 验证表单
    userInputRef.value.validate((valid: boolean) => {
        if (!valid) {
            formLoading.value = false;
            return false;
        }
        // 从查分器查询玩家数据
        const prober = new MaiDXProberApi(userInput.value.name);
        (prober.b50()).then((res: AxiosResponse<IResponse>) => {
            // 查询成功后，使用新Rating算法重写各谱面的Rating
            let proberData: IResponse = res.data;
            let b35: Array<IMusicChart> = proberData.charts.sd;
            let b15: Array<IMusicChart> = proberData.charts.dx;
            proberData.charts.sd = overrideRating(b35);
            proberData.charts.dx = overrideRating(b15);
            // 设置Cookie，并把用户名和查分器数据存入vuex store
            Cookie.set("USER_NAME", encode(userInput.value.name));
            store.commit("setUserName", userInput.value.name);
            store.commit("setProberData", proberData);
            // 跳转至结果视图
            push({
                name: "RatingResult",
                params: {
                    mode: "b50",
                },
            });
        }).catch((err: AxiosError) => {
            // 对查分器返回的错误进行处理
            formLoading.value = false;
            if (err.response?.status === 400) {
                errMsg.value = "用户不存在。请检查您的查分器账户是否正确输入。";
                errAlert.value = true;
            } else if (err.response?.status === 403) {
                errMsg.value = "该用户已禁止第三方查询成绩。请前往舞萌DX查分器修改隐私设置。";
                errAlert.value = true;
            } else {
                console.error(err);
            }
        })
    });
}

/* 结束成绩查询处理部分 */


/* 杂项处理部分 */

// 加载视图时强制回到顶层
document.documentElement.scrollTop = document.body.scrollTop = 0;
</script>

<template>
    <el-container>
        <el-main>
            <LoginHeader />
            <div class="main-content">
                <el-row justify="center">
                    <el-col :xs="24" :sm="18" :md="10">
                        <el-card>
                            <el-form ref="userInputRef" label-position="top" :model="userInput" :rules="userInputRules" v-loading="formLoading">
                                <el-alert v-if="errAlert" :title="errMsg" type="error" show-icon />
                                <el-form-item label="舞萌DX查分器用户名" prop="name">
                                    <el-input v-model="userInput.name" />
                                </el-form-item>
                                <el-form-item class="btn-group">
                                    <el-button type="primary" @click="queryB40()">查询Best 40</el-button>
                                    <el-button type="success" @click="queryB50()">模拟Best 50</el-button>
                                </el-form-item>
                                <el-form-item class="btn-group" v-if="!tutorial">
                                    <el-button @click="tutorial = true">如何使用？</el-button>
                                </el-form-item>
                            </el-form>
                            <div v-if="tutorial">
                                <h2>如何使用MaiRating Viewer</h2>
                                <p>
                                    1. MaiRating Viewer的数据来自于<a href="https://www.diving-fish.com/maimaidx/prober/" target="_blank">舞萌DX查分器</a>，
                                    如果您没有注册查分器，请先前往查分器注册一个账号，然后按照查分器的操作指南导入自己的舞萌DX成绩数据。
                                </p>
                                <p>
                                    <img src="/images/guide/prober-register.png" class="tutorial-img" alt="注册账号" />
                                </p>
                                <p>
                                    2. 数据导入完成后，可在查分器修改自己的个人资料。
                                </p>
                                <p>
                                    3. <strong>取消勾选“禁止其他人查询我的成绩”</strong>。若勾选此项，MaiRating Viewer将不能查询您的成绩数据。
                                </p>
                                <p>
                                    <img src="/images/guide/privacy-setting.png" class="tutorial-img" alt="注册账号" />
                                </p>
                                <p>
                                    4. 回到MaiRating Viewer，输入您注册的舞萌DX查分器账号，即可选择查询Best 40和模拟Best 50.
                                </p>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
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
.btn-group {
    text-align: center;
}
.tutorial-img {
    width: 100%;
}
@media (min-width: 768px) {
    .main-content {
        padding-top: 2rem;
        padding-bottom: 2rem;
    }
}
</style>
