/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageVO } from '../models/PageVO';
import type { QuestionComment } from '../models/QuestionComment';
import type { QuestionCommentAddRequest } from '../models/QuestionCommentAddRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionCommentControllerService {

    /**
     * save
     * @param questionCommentAddRequest questionCommentAddRequest
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingPost1(
questionCommentAddRequest: QuestionCommentAddRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/comment/add',
            body: questionCommentAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * delete
     * @param ids ids
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsingPost(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/comment/delete',
            body: ids,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * info
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static infoUsingGet(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/comment/info/{id}',
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
     * list
     * @param queryVo queryVO
     * @returns any OK
     * @throws ApiError
     */
    public static listUsingPost3(
queryVo: PageVO,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/comment/list',
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
     * @param questionId questionId
     * @returns any OK
     * @throws ApiError
     */
    public static thumbQuestionCommentUsingGet1(
commentId: number,
questionId: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/question/comment/thumb',
            query: {
                'commentId': commentId,
                'questionId': questionId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * update
     * @param questionComment questionComment
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingPost(
questionComment: QuestionComment,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/question/comment/update',
            body: questionComment,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
