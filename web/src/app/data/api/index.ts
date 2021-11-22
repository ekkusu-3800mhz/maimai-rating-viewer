import axios, { AxiosPromise } from "axios";
import { IResultCacheRequest, IResultCacheResponse, ISharedResultResponse } from "@/app/data/api/interface";
import { api } from "@/app/utils/functions";

/**
 *  舞萌DX底分对象查看器 - 后端数据接口封装类
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

export default class Api {

    public static save(data: IResultCacheRequest): AxiosPromise<IResultCacheResponse> {
        return axios.post(api('result/save'), data);
    }

    public static load(resultId: string): AxiosPromise<ISharedResultResponse> {
        return axios.get(api('result/load'), {
            params: {
                result_id: resultId,
            },
        });
    }

}
