<?php
declare(strict_types = 1);

namespace app\controller;

use app\core\BaseController;
use app\exception\BadRequest;

/**
 *  舞萌DX底分对象查看器 - 空控制器类
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

class Error extends BaseController {

    public function __call($method, $args) {
        throw new BadRequest();
    }

}
