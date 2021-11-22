<?php

use think\facade\Route;
use app\middleware\RequestMethod;

/**
 *  舞萌DX底分对象查看器 - 数据接口路由定义
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

Route::rule('result/load', 'Api/result')
    ->middleware(RequestMethod::class, 'GET');

Route::rule('result/save', 'Api/cache')
    ->middleware(RequestMethod::class, 'POST');
