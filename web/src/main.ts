import { createApp } from "vue"
import App from "@/app/App.vue"
import router from "@/app/core/router"
import store from "@/app/core/store"

/**
 *  舞萌DX底分对象查看器 - 应用入口文件
 * 
 *  @generator vue-cli
 *  @license MIT
 */

createApp(App).use(store).use(router).mount("#app")
