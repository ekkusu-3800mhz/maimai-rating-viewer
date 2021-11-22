<!--
    舞萌DX底分对象查看器 - 页脚组件视图

    @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<template>
    <div class="page-footer">
        <p>Made by <a href="https://github.com/sh1nra-dx" target="_blank">Shinra DX</a> armed with X-buster.</p>
        <p>Powered by <a href="https://v3.vuejs.org" target="_blank">Vue 3.x</a>, <a href="https://element-plus.gitee.io" target="_blank">Element<sup>+</sup></a>, and <a href="https://github.com/Diving-Fish/maimaidx-prober" target="_blank">Diving-Fish/maimaidx-prober</a>.</p>
        <br>
        <p>Copyrights of All resources from "maimaiでらっくす" is <a href="https://maimai.sega.jp" target="_blank">&copy;SEGA</a>.</p>
    </div>
</template>

<style lang="less" scoped>
.page-footer {
    text-align: center;
    padding-top: 2rem;
    padding-bottom: 5rem;
}
p {
    margin-bottom: -14px;
    font-size: 16px;
}
@media (min-width: 768px) {
    .page-footer {
        padding-top: 3rem;
        padding-bottom: 3rem;
    }
}
</style>
