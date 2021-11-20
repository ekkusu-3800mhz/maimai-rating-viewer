<!--
    舞萌DX底分对象查看器 - 应用路由视图

    @author X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Cookie from "js-cookie";
import MaiDXProberApi from "@/app/data/maidx-prober";

const { push, currentRoute } = useRouter();
const store = useStore();

if (currentRoute.value.name != "ResultShare") {
    let userName: string = Cookie.get("USER_NAME") as string
    const prober = new MaiDXProberApi(userName);
    (prober.b40()).then(() => {
        store.commit("setUserName", userName);
        push({name: "RatingResult"});
    }).catch(() => {
        Cookie.remove("USER_NAME");
        push({name: "UserInput"});
    });
}
</script>

<template>
    <router-view />
</template>

<style lang="less">
body {
    font-family: Roboto, Noto Sans SC, Noto Sans JP, Microsoft YaHei, '微软雅黑', Arial, sans-serif !important;
}
</style>
