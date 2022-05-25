/**
 *  舞萌DX底分对象查看器 - 应用配置文件
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

const config: IConfig = {
    app: {
        // 应用调试模式（部署生产环境前请务必关上）
        debug: false,
        // 生产环境下的应用根URL
        url: "https://rating.xbuster.moe/",
        // 开发环境下的应用根URL
        devUrl: "http://localhost:8080/",
    },
    data: {
        // 服务端数据接口
        api: {
            // 生产环境下的服务端根URL
            url: "https://api.rating.xbuster.moe/",
            // 开发环境下的服务端根URL
            devUrl: "http://localhost/",
            // 资源后缀
            suffix: ".json",
        },
        // 查分器数据接口
        prober: "https://www.diving-fish.com/api/maimaidxprober/query/player",
    }
};

/* 以下内容请勿修改 */

// 配置对象结构定义
interface IConfig {
    app: {
        debug: boolean;
        url: string;
        devUrl: string;
    };
    data: {
        api: {
            url: string;
            devUrl: string;
            suffix: string;
        };
        prober: string;
    };
}

export default config;

/* 以上内容请勿修改 */
