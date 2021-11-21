import { createApp } from "vue";
import App from "@/app/App.vue";
import router from "@/app/core/router";
import store from "@/app/core/store";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";

/**
 *  舞萌DX底分对象查看器 - 应用入口文件
 * 
 *  @generator vue-cli
 *  @license MIT
 */

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
