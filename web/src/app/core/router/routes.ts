import { RouteRecordRaw } from "vue-router";

import UserInput from "@/app/views/UserInput.vue";
import RatingResult from "@/app/views/RatingResult.vue";
import NotFound from "@/app/views/NotFound.vue";

/**
 *  舞萌DX底分对象查看器 - 应用路由表定义文件
 * 
 *  @author X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

const routes: Array<RouteRecordRaw> = [{
    path: "/",
    name: "UserInput",
    component: UserInput,
}, {
    path: "/result/:mode",
    name: "RatingResult",
    component: RatingResult,
    props: true,
},{
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
}];

export default routes;
