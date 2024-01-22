/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CursorPageBaseRequest } from '../models/CursorPageBaseRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserFriendControllerService {

    /**
     * delete
     * @param friendId friendId
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsingGet2(
friendId: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/friend/delete',
            query: {
                'friendId': friendId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * 查询联系人列表（游标翻页）
     * @param cursorPageBaseRequest cursorPageBaseRequest
     * @returns any OK
     * @throws ApiError
     */
    public static listUsingPost5(
cursorPageBaseRequest: CursorPageBaseRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/friend/list',
            body: cursorPageBaseRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
