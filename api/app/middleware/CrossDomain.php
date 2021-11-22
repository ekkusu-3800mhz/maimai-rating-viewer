<?php
declare(strict_types = 1);

namespace app\middleware;

use think\Request;
use think\Response;
use \Closure;

/**
 *  舞萌DX底分对象查看器 - 接口跨域中间件类
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

class CrossDomain {

    /**
     *  允许跨域
     * 
     *  @param think\Request $request 请求对象
     *  @param \Closure $next 回调函数
     *  @return think\Response
     */

    public function handle(Request $request, Closure $next) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Max-Age: 1800');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-CSRF-TOKEN, X-Requested-With, Token');
        if (strtoupper($request->method()) == "OPTIONS") {
            return response()->send();
        }
        return $next($request);
    }

}
