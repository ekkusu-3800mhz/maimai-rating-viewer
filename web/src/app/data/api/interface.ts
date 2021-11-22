/**
 *  舞萌DX底分对象查看器 - 后端接口数据结构定义
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

export interface IResultCacheRequest {
    type: string;
    data: string;
}

export interface IResultCacheResponse {
    resultId: string;
}

export interface ISharedResultResponse {
    type: string;
    data: string;
    timestamp: string | Date;
}

export interface IError {
    error: string;
    debugInfo?: {
        file: string;
        line: string | number;
        trace: string[] | [] | null;
    };
}
