/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ForumCursorPageRequest } from '../models/ForumCursorPageRequest';
import type { PageVO } from '../models/PageVO';
import type { PostFavourAddRequest } from '../models/PostFavourAddRequest';
import type { PostThumbAddRequest } from '../models/PostThumbAddRequest';
import type { TopicCommentRequest } from '../models/TopicCommentRequest';
import type { TopicPublishRequest } from '../models/TopicPublishRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TopicAppControllerService {

    /**
     * commentTopic
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static commentTopicUsingPost(
request: TopicCommentRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/forum/topic/comment',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteComment
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static deleteCommentUsingPost(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/forum/topic/comment/delete/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getCommentsByTopicId
     * @param topicId topicId
     * @returns any OK
     * @throws ApiError
     */
    public static getCommentsByTopicIdUsingGet(
topicId: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/forum/topic/comment/get',
            query: {
                'topicId': topicId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getTopicById
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static getTopicByIdUsingGet(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/forum/topic/detail/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * doFavour
     * @param postFavourAddRequest postFavourAddRequest
     * @returns any OK
     * @throws ApiError
     */
    public static doFavourUsingPost(
postFavourAddRequest: PostFavourAddRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/forum/topic/favour',
            body: postFavourAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * list
     * @param queryVo queryVO
     * @returns any OK
     * @throws ApiError
     */
    public static listUsingPost5(
queryVo: PageVO,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/forum/topic/list',
            body: queryVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 查询（游标翻页）
     * @param pageRequest pageRequest
     * @returns any OK
     * @throws ApiError
     */
    public static getTopicListByCursorUsingPost(
pageRequest: ForumCursorPageRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/forum/topic/list/cursor',
            body: pageRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * publishTopic
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static publishTopicUsingPost(
request: TopicPublishRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/forum/topic/publish',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * doThumb
     * @param postThumbAddRequest postThumbAddRequest
     * @returns any OK
     * @throws ApiError
     */
    public static doThumbUsingPost1(
postThumbAddRequest: PostThumbAddRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/forum/topic/thumb',
            body: postThumbAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
