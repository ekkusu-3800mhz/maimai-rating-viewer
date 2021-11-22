<?php
declare(strict_types = 1);

namespace app\exception;

use think\Exception;

/**
 *  舞萌DX底分对象查看器 - 资源不存在错误类
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

class NotFound extends Exception {

    public function __construct() {
        parent::__construct('您所访问的资源不存在');
    }

}
