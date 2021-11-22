/**
 *  舞萌DX底分对象查看器 - 静态素材调用函数库
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

// 素材基础路径
const basePath = "/images/";
// 歌曲封面文件后缀
const coverSuffix = ".jpg";
// 素材文件后缀
const assetSuffix = ".png";

// 谱面类型
const musicTypeDict: Record<string, string> = {
    "SD": image("type/SD"),
    "DX": image("type/DX"),
};

/**
 *  选择谱面类型素材
 * 
 *  @param {string} type 谱面类型
 *  @returns {string}
 */

export function chartType(type: string): string {
    if (type === "") {
        return "";
    }
    return musicTypeDict[type];
}

// 连击相关指标
const comboDict: Record<string, string> = {
    "none": image("combo/NONE"),
    "fc": image("combo/FC"),
    "fcp": image("combo/FCp"),
    "ap": image("combo/AP"),
    "app": image("combo/APp"),
};

/**
 *  选择连击素材
 * 
 *  @param {string} combo 连击指标
 *  @returns {string}
 */

export function combo(combo: string): string {
    if (combo === "") {
        return comboDict["none"];
    }
    return comboDict[combo];
}

// 同步率相关指标
const syncDict: Record<string, string> = {
    "none": image("sync/NONE"),
    "fs": image("sync/FS"),
    "fsp": image("sync/FSp"),
    "fsd": image("sync/FDX"),
    "fsdp": image("sync/FDXp"),
};

/**
 *  选择同步率素材
 * 
 *  @param {string} sync 同步率指标
 *  @returns {string}
 */

export function sync(sync: string): string {
    if (sync === "") {
        return syncDict["none"];
    }
    return syncDict[sync];
}

// 达成率相关指标
const rankDict: Record<string, string> = {
    "d": image("rank/D"),
    "c": image("rank/C"),
    "b": image("rank/B"),
    "bb": image("rank/BB"),
    "bbb": image("rank/BBB"),
    "a": image("rank/A"),
    "aa": image("rank/AA"),
    "aaa": image("rank/AAA"),
    "s": image("rank/S"),
    "sp": image("rank/Sp"),
    "ss": image("rank/SS"),
    "ssp": image("rank/SSp"),
    "sss": image("rank/SSS"),
    "sssp": image("rank/SSSp"),
};

/**
 *  选择达成率素材
 * 
 *  @param {string} rank 达成率指标
 *  @returns {string}
 */

export function rank(rank: string): string {
    return rankDict[rank];
}

// DX Rating外框颜色
const ratingDict: Record<string, string> = {
    white: image("rating/white"),
    blue: image("rating/blue"),
    green: image("rating/green"),
    yellow: image("rating/yellow"),
    red: image("rating/red"),
    purple: image("rating/purple"),
    bronze: image("rating/bronze"),
    silver: image("rating/silver"),
    gold: image("rating/gold"),
    platinum: image("rating/gold"),
    rainbow: image("rating/rainbow"),
}

/**
 *  选择DX Rating外框素材
 * 
 *  @param {string} rating DX Rating外框颜色
 *  @returns {string}
 */

export function rating(rating: string): string {
    return ratingDict[rating];
}

/**
 *  构建完整的素材URL
 * 
 *  @param {string} path 素材路径
 *  @returns {string}
 */

function image(path: string): string {
    return basePath + path + assetSuffix;
}

/**
 *  根据歌曲ID选择封面
 * 
 *  @param {number} songId 歌曲ID
 *  @returns {string}
 */

export function songCover(songId: number): string {
    return basePath + `song/${songId}` + coverSuffix;
}

/**
 *  选择段位素材
 * 
 *  @param {number} grade 段位值
 *  @returns {string}
 */

export function grade(grade: number): string {
    return basePath + `grade/${grade}` + assetSuffix;
}

/**
 *  B40模式下的DX Rating颜色解析
 * 
 *  @param {number} rating DX Rating
 *  @returns {string}
 */

export function b40RatingColor(rating: number): string {
    let color = "rainbow";
    if (rating < 1000) {
        color = "white";
    } else if (rating < 2000) {
        color = "blue";
    } else if (rating < 3000) {
        color = "green";
    } else if (rating < 4000) {
        color = "yellow";
    } else if (rating < 5000) {
        color = "red";
    } else if (rating < 6000) {
        color = "purple";
    } else if (rating < 7000) {
        color = "bronze";
    } else if (rating < 8000) {
        color = "silver";
    } else if (rating < 8500) {
        color = "gold";
    }
    return image(`rating/${color}`);
}

/**
 *  B50模式下的DX Rating颜色解析
 * 
 *  @param {number} rating DX Rating
 *  @returns {string}
 */

export function b50RatingColor(rating: number): string {
    let color = "rainbow";
    if (rating < 1000) {
        color = "white";
    } else if (rating < 2000) {
        color = "blue";
    } else if (rating < 4000) {
        color = "green";
    } else if (rating < 7000) {
        color = "yellow";
    } else if (rating < 10000) {
        color = "red";
    } else if (rating < 12000) {
        color = "purple";
    } else if (rating < 13000) {
        color = "bronze";
    } else if (rating < 14000) {
        color = "silver";
    } else if (rating < 15000) {
        color = "gold";
    }
    return image(`rating/${color}`);
}
