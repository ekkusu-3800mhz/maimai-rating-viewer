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
        validate(Form::class)->scene('cache')->check(array(
            'type' => $this->request->post('type'),
            'data' => $this->request->post('data'),
        ));
        if ($this->request->post('type') !== 'b40' && $this->request->post('type') !== 'b50') {
            throw new BadRequest('成绩类型必须为b40或b50');
        }
        $cache = new RatingCache();
        $cache->result_uuid      = (Uuid::uuid4())->toString();
        $cache->result_type      = $this->request->post('type');
        $cache->result_body      = $this->request->post('data');
        $cache->result_save_time = date('Y-m-d H:i:s');
        $cache->save();
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
        validate(Form::class)->scene('result')->check(array(
            'id' => $this->request->get('result_id'),
        ));
        $cache = RatingCache::where(array(
            'result_uuid' => $this->request->get('result_id'),
        ))->findOrEmpty();
        if ($cache->isEmpty()) {
            throw new NotFound();
        }
        $response = array(
            'type'      => $cache->result_type,
            'data'      => $cache->result_body,
            'timestamp' => $cache->result_save_time,
        );
        return successResponse($response);
    }

}
