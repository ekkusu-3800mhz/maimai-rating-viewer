import { RouteRecordRaw } from "vue-router";

import UserInput from "@/app/views/UserInput.vue";
import RatingResult from "@/app/views/RatingResult.vue";
import SharedResult from "@/app/views/SharedResult.vue";
import NotFound from "@/app/views/NotFound.vue";

/**
 *  舞萌DX底分对象查看器 - 应用路由表定义文件
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

const routes: Array<RouteRecordRaw> = [{
    // 路由缺省时重定向至用户名输入视图
    path: "/",
    redirect: {name: "UserInput"},
}, {
    // 成绩表分享视图
    path: "/:resultId",
    name: "SharedResult",
    component: SharedResult,
    props: true,
}, {
    // 成绩表查看视图
    path: "/result/:mode",
    name: "RatingResult",
    component: RatingResult,
    props: true,
}, {
    // 用户名输入视图
    path: "/intro",
    name: "UserInput",
    component: UserInput,
}, {
    // 路由Miss时指向404视图
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
}];

export default routes;
