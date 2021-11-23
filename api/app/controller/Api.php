<?php
declare(strict_types = 1);

namespace app\controller;

use Ramsey\Uuid\Uuid;
use think\Response;
use app\core\BaseController;
use app\model\RatingCache;
use app\validate\Form;
use app\exception\BadRequest;
use app\exception\NotFound;

/**
 *  舞萌DX底分对象查看器 - 接口控制器类
 * 
 *  @author Shinra DX armed with X-buster <shinra.dx@outlook.com>
 *  @license MIT
 */

class Api extends BaseController {

    /**
     *  缓存成绩数据
     * 
     *  @return think\Response
     */

    public function cache(): Response {
        // 执行参数验证
        validate(Form::class)->scene('cache')->check(array(
            'type' => $this->request->post('type'),
            'data' => $this->request->post('data'),
        ));
        // 对传入的成绩表类型进行判断
        if ($this->request->post('type') !== 'b40' && $this->request->post('type') !== 'b50') {
            throw new BadRequest('成绩类型必须为b40或b50');
        }
        // 把成绩数据写入数据库
        $cache = new RatingCache();
        $cache->result_uuid      = (Uuid::uuid4())->toString();
        $cache->result_type      = $this->request->post('type');
        $cache->result_body      = $this->request->post('data');
        $cache->result_save_time = date('Y-m-d H:i:s');
        $cache->save();
        // 返回结果ID
        $response = array(
            'resultId' => $cache->result_uuid,
        );
        return successResponse($response);
    }

    /**
     *  读取成绩缓存数据
     * 
     *  @return think\Response
     */

    public function result(): Response {
        // 执行参数验证
        validate(Form::class)->scene('result')->check(array(
            'id' => $this->request->get('result_id'),
        ));
        // 根据传入的ID查询成绩数据
        $cache = RatingCache::where(array(
            'result_uuid' => $this->request->get('result_id'),
        ))->findOrEmpty();
        // 如果成绩数据不存在则抛出404错误
        if ($cache->isEmpty()) {
            throw new NotFound();
        }
        // 返回成绩数据
        $response = array(
            'type'      => $cache->result_type,
            'data'      => $cache->result_body,
            'timestamp' => $cache->result_save_time,
        );
        return successResponse($response);
    }

}
