import { createStore } from "vuex";

/**
 *  舞萌DX底分对象查看器 - Vuex Store定义文件
 * 
 *  @generator vue-cli
 *  @license MIT
 */

export default createStore({
    state: () => {
        return {
            // 查分器用户名
            userName: '',
            // 查分器数据存储对象
            proberData: {},
        }
    },
    mutations: {
        // 存储查分器用户名
        setUserName(state, name) {
            state.userName = name;
        },
        // 存储查分器数据
        setProberData(state, data) {
            state.proberData = data;
        },
        // 清空查分器用户名
        clearUserName(state) {
            state.userName = '';
        },
        // 清空查分器数据
        clearProberData(state) {
            state.proberData = {};
        },
    }
});
