import config from "@/app.config"

/**
 *  舞萌DX底分对象查看器 - 实用函数定义
 * 
 *  @author X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

/**
 *  判断运行环境
 * 
 *  @returns {boolean}
 */

export function isDevEnv(): boolean {
    return !(process.env.NODE_ENV === 'production')
}

/**
 *  判断是否处于调试模式
 * 
 *  @returns {boolean}
 */

export function isDebugMode(): boolean {
    return config.app.debug
}

/**
 *  获取后端接口根地址
 * 
 *  @returns {string}
 */

export function baseUrl(): string {
    return (isDevEnv()) ? config.data.api.devUrl : config.data.api.url
}

/**
 *  构建完整接口 URL
 * 
 *  @param {string} point 接口路径
 *  @returns {string}
 */

export function api(point: string): string {
    return baseUrl() + point + config.data.api.suffix
}
