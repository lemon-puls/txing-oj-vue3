/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PostFavourAddRequest } from '../models/PostFavourAddRequest';
import type { PostFavourQueryRequest } from '../models/PostFavourQueryRequest';
import type { PostQueryRequest } from '../models/PostQueryRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostFavourControllerService {

    /**
     * doPostFavour
     * @param postFavourAddRequest postFavourAddRequest
     * @returns any OK
     * @throws ApiError
     */
    public static doPostFavourUsingPost(
postFavourAddRequest: PostFavourAddRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_favour/',
            body: postFavourAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listFavourPostByPage
     * @param postFavourQueryRequest postFavourQueryRequest
     * @returns any OK
     * @throws ApiError
     */
    public static listFavourPostByPageUsingPost(
postFavourQueryRequest: PostFavourQueryRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_favour/list/page',
            body: postFavourQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * listMyFavourPostByPage
     * @param postQueryRequest postQueryRequest
     * @returns any OK
     * @throws ApiError
     */
    public static listMyFavourPostByPageUsingPost(
postQueryRequest: PostQueryRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/post_favour/my/list/page',
            body: postQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
