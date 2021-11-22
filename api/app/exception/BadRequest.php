<?php
declare(strict_types = 1);

namespace app\exception;

use think\Exception;

/**
 *  舞萌DX底分对象查看器 - 无效请求错误类
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

class BadRequest extends Exception {

    public function __construct($msg = null) {
        $errorMsg = (!empty($msg)) ? $msg : '无效的请求';
        parent::__construct($errorMsg);
    }

}
