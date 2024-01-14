/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserEmoji } from '../models/UserEmoji';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserEmojiControllerService {

    /**
     * delete
     * @param ids ids
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsingGet1(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/oj/useremoji/delete',
            body: ids,
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
    public static deleteUsingHead(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/api/oj/useremoji/delete',
            body: ids,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * delete
     * @param ids ids
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsingPost2(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/oj/useremoji/delete',
            body: ids,
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
    public static deleteUsingPut(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/oj/useremoji/delete',
            body: ids,
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
    public static deleteUsingDelete(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/oj/useremoji/delete',
            body: ids,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * delete
     * @param ids ids
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsingOptions(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/api/oj/useremoji/delete',
            body: ids,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * delete
     * @param ids ids
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsingPatch(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/oj/useremoji/delete',
            body: ids,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * info
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static infoUsingGet3(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/oj/useremoji/info/{id}',
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
     * info
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static infoUsingHead(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/api/oj/useremoji/info/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * info
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static infoUsingPost(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/oj/useremoji/info/{id}',
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
     * info
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static infoUsingPut(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/oj/useremoji/info/{id}',
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
     * info
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static infoUsingDelete(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/oj/useremoji/info/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * info
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static infoUsingOptions(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/api/oj/useremoji/info/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * info
     * @param id id
     * @returns any OK
     * @throws ApiError
     */
    public static infoUsingPatch(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/oj/useremoji/info/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * save
     * @param userEmoji userEmoji
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingGet(
userEmoji: UserEmoji,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/oj/useremoji/save',
            body: userEmoji,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * save
     * @param userEmoji userEmoji
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingHead(
userEmoji: UserEmoji,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/api/oj/useremoji/save',
            body: userEmoji,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * save
     * @param userEmoji userEmoji
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingPost3(
userEmoji: UserEmoji,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/oj/useremoji/save',
            body: userEmoji,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * save
     * @param userEmoji userEmoji
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingPut(
userEmoji: UserEmoji,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/oj/useremoji/save',
            body: userEmoji,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * save
     * @param userEmoji userEmoji
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingDelete(
userEmoji: UserEmoji,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/oj/useremoji/save',
            body: userEmoji,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * save
     * @param userEmoji userEmoji
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingOptions(
userEmoji: UserEmoji,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/api/oj/useremoji/save',
            body: userEmoji,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * save
     * @param userEmoji userEmoji
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingPatch(
userEmoji: UserEmoji,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/oj/useremoji/save',
            body: userEmoji,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * update
     * @param userEmoji userEmoji
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingGet(
userEmoji: UserEmoji,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/oj/useremoji/update',
            body: userEmoji,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * update
     * @param userEmoji userEmoji
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingHead(
userEmoji: UserEmoji,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/api/oj/useremoji/update',
            body: userEmoji,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * update
     * @param userEmoji userEmoji
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingPost2(
userEmoji: UserEmoji,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/oj/useremoji/update',
            body: userEmoji,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * update
     * @param userEmoji userEmoji
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingPut(
userEmoji: UserEmoji,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/oj/useremoji/update',
            body: userEmoji,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * update
     * @param userEmoji userEmoji
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingDelete(
userEmoji: UserEmoji,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/oj/useremoji/update',
            body: userEmoji,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * update
     * @param userEmoji userEmoji
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingOptions(
userEmoji: UserEmoji,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/api/oj/useremoji/update',
            body: userEmoji,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * update
     * @param userEmoji userEmoji
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingPatch(
userEmoji: UserEmoji,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/oj/useremoji/update',
            body: userEmoji,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
