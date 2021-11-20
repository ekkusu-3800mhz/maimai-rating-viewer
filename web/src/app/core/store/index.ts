import { createStore } from "vuex"

/**
 *  舞萌DX底分对象查看器 - Vuex Store定义文件
 * 
 *  @generator vue-cli
 *  @license MIT
 */

export default createStore({
    state: () => {
        return {
            userName: '',
            proberData: {}
        }
    },
    mutations: {
        setUserName(state, name) {
            state.userName = name
        },
        setProberData(state, data) {
            state.proberData = data
        },
        clearUserName(state) {
            state.userName = ''
        },
        clearProberData(state) {
            state.proberData = {}
        }
    }
})
