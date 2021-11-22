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
    path: "/",
    redirect: {name: "UserInput"},
}, {
    path: "/:resultId",
    name: "SharedResult",
    component: SharedResult,
    props: true,
}, {
    path: "/result/:mode",
    name: "RatingResult",
    component: RatingResult,
    props: true,
}, {
    path: "/intro",
    name: "UserInput",
    component: UserInput,
}, {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
}];

export default routes;
