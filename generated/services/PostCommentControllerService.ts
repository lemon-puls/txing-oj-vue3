/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageVO } from '../models/PageVO';
import type { PostCommentAddRequest } from '../models/PostCommentAddRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostCommentControllerService {

    /**
     * save
     * @param postCommentAddRequest postCommentAddRequest
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingPost(
postCommentAddRequest: PostCommentAddRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post/comment/add',
            body: postCommentAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * delete
     * @param commentId commentId
     * @param postId postId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsingGet(
commentId: number,
postId: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/post/comment/delete',
            query: {
                'commentId': commentId,
                'postId': postId,
            },
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
    public static listUsingPost(
queryVo: PageVO,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post/comment/list',
            body: queryVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * thumbQuestionComment
     * @param commentId commentId
     * @param postId postId
     * @returns any OK
     * @throws ApiError
     */
    public static thumbQuestionCommentUsingGet(
commentId: number,
postId: string,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/post/comment/thumb',
            query: {
                'commentId': commentId,
                'postId': postId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
