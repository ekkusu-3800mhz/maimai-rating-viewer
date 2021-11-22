<?php

namespace app\validate;

use think\Validate;

/**
 *  舞萌DX底分对象查看器 - 接口传参验证类
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

class Form extends Validate {

    // 定义验证规则
    protected $rule = array(
        'id'   => 'require|length:36',
        'type' => 'require',
        'data' => 'require',
    );

    // 定义错误信息
    protected $message = array(
        'id'   => '无效的成绩ID',
        'type' => '成绩类型必须为b40或b50',
        'data' => '成绩不能为空',
    );

    // 定义验证场景
    protected $scene = array(
        'cache'  => array(
            'type',
            'data',
        ),
        'result' => array(
            'id',
        ),
    );

}
