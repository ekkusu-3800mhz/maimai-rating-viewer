import axios, { AxiosPromise } from "axios";
import config from "@/app.config";
import { IResponse } from "./interface";

/**
 *  舞萌DX底分对象查看器 - 查分器数据接口封装类
 * 
 *  @author X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

export default class MaiDXProberApi {

    /**
     *  用户名存储变量
     * 
     *  @var {string}
     */

    private userName: string;

    /**
     *  构造函数
     * 
     *  @param {string} userName 用户名
     */

    public constructor(userName: string) {
        this.userName = userName;
    }

    /**
     *  获取B40数据
     * 
     *  @returns {AxiosPromise<IResponse>}
     */

    public b40(): AxiosPromise<IResponse> {
        return this.request({
            username: this.userName,
        });
    }

    /**
     *  获取B50数据
     * 
     *  @returns {AxiosPromise<IResponse>}
     */

    public b50(): AxiosPromise<IResponse> {
        return this.request({
            username: this.userName,
            b50: "TRUE",
        });
    }

    /**
     *  通用接口请求封装
     * 
     *  @param {Record<string, string>} data 请求参数
     *  @returns {AxiosPromise<IResponse>}
     */

    private request(data: Record<string, string>): AxiosPromise<IResponse> {
        return axios.post(config.data.prober, data);
    }

}
