/**
 *  舞萌DX底分对象查看器 - 查分器接口数据结构定义
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

// 一般错误的返回结构
export interface IBadRequest {
    message: string;
}

// 隐私设置错误的返回结构
export interface IForbidden {
    status: string;
    msg: string;
}

// 请求成功的返回结构
export interface IResponse {
    user_id: unknown | null;
    user_data: unknown | null;
    username: string;
    nickname: string;
    rating: number;
    plate: string;
    additional_rating: number;
    charts: {
        dx: Array<IMusicChart>;
        sd: Array<IMusicChart>;
    };
}

// 谱面数据结构
export interface IMusicChart {
    achievements: number;
    ds: number;
    dxScore: number;
    fc: string;
    fs: string;
    level: string;
    level_index: number;
    level_label: string;
    ra: number;
    rate: string;
    song_id: number;
    title: string;
    type: string;
}
