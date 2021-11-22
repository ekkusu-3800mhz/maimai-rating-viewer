<?php
declare(strict_types = 1);

namespace app\middleware;

use think\Request;
use app\exception\BadRequest;
use \Closure;

/**
 *  舞萌DX底分对象查看器 - 接口请求方法验证中间件类
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

class RequestMethod {

/**
 *  执行模块权限验证
 * 
 *  @param think\Request $request 请求对象
 *  @param \Closure $next 回调函数
 *  @param string $method 指定的接口请求方法
 *  @return \Closure
 */

public function handle(Request $request, Closure $next, string $method) {
    if ($request->method() == $method) {
        return $next($request);
    }
    throw new BadRequest();
}

}
