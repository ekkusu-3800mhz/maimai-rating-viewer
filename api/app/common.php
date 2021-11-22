<?php
declare(strict_types = 1);

use think\Response;

/**
 *  舞萌DX底分对象查看器 - 公共函数定义
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

/**
 *  构建成功响应数据包
 * 
 *  @param array $data 响应内容数组
 *  @return think\Response
 */

function successResponse(array $data = array()): Response {
    if (!empty($data)) {
        $data = array(
            'status' => 'OK',
        );
    }
    return json($data, 200);
}

/**
 *  构建失败响应数据包
 * 
 *  @param int $status 响应状态码
 *  @param array $data 错误内容数组
 *  @return think\Response
 */

function failedResponse(int $status = 500, array $error = array()): Response {
    return json($error, $status);
}
