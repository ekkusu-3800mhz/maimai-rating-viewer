<!--
    舞萌DX底分对象查看器 - 用户登录页头组件视图

    @author X-buster <shinra.dx@outlook.com>
    @license MIT
-->

<template>
    <div class="page-header">
        <p>
            <img src="/images/logo.png" class="logo" alt="舞萌DX LOGO" />
        </p>
        <h1>MaiRating Viewer</h1>
        <p></p>
    </div>
</template>

<style lang="less" scoped>
.page-header {
    text-align: center;
}
.page-header > h1 {
    font-size: 28px;
    font-weight: 300;
}
.logo {
    padding-top: 2rem;
    width: 10rem;
}
@media (min-width: 768px) {
    .page-header > h1 {
        font-size: 36px;
        font-weight: 300;
    }
    .logo {
        padding-top: 2rem;
        width: 15rem;
    }
}
</style>
