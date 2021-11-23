/**
 *  舞萌DX底分对象查看器 - 后端接口数据结构定义
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

// 缓存成绩接口请求数据结构
export interface IResultCacheRequest {
    type: string;
    data: string;
}

// 缓存成绩接口响应数据结构
export interface IResultCacheResponse {
    resultId: string;
}

// 读取成绩接口响应数据结构
export interface ISharedResultResponse {
    type: string;
    data: string;
    timestamp: string | Date;
}

// 通用接口错误数据结构
export interface IError {
    error: string;
    debugInfo?: {
        file: string;
        line: string | number;
        trace: string[] | [] | null;
    };
}
