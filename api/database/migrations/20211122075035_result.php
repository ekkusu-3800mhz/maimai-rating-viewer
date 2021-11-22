<?php

use think\migration\Migrator;
use think\migration\db\Column;

/**
 *  舞萌DX底分对象查看器 - Rating对象缓存数据表
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

class Result extends Migrator {

    public function change() {
        ($this->table('result', ['id' => false, 'primary_key' => 'result_id']))
            ->addColumn('result_id', 'integer', ['null' => false, 'comment' => '成绩ID'])
            ->addColumn('result_uuid', 'uuid', ['limit' => 36, 'null' => false, 'comment' => '成绩UUID'])
            ->addColumn('result_type', 'string', ['null' => false, 'comment' => '成绩类型'])
            ->addColumn('result_body', 'text', ['null' => false, 'comment' => '成绩原始数据包'])
            ->addColumn('result_save_date', 'date', ['null' => false, 'comment' => '成绩缓存时间戳'])
            ->create();
    }

}
