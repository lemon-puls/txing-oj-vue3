/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MatchSubmitSingleRequest } from '../models/MatchSubmitSingleRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MatchOnlinepkAppControllerService {

    /**
     * cancelMatch
     * @returns any OK
     * @throws ApiError
     */
    public static cancelMatchUsingGet(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/match/online/pk/cancel',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * ceshi
     * @returns any OK
     * @throws ApiError
     */
    public static ceshiUsingGet(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/match/online/pk/ceshi',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * findOpponent
     * @returns any OK
     * @throws ApiError
     */
    public static findOpponentUsingGet(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/match/online/pk/find',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getPkRecords
     * @returns any OK
     * @throws ApiError
     */
    public static getPkRecordsUsingGet(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/match/online/pk/records/get',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getPkResult
     * @param matchId matchId
     * @returns any OK
     * @throws ApiError
     */
    public static getPkResultUsingGet(
matchId: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/match/online/pk/result/get',
            query: {
                'matchId': matchId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * startPk
     * @param matchId matchId
     * @returns any OK
     * @throws ApiError
     */
    public static startPkUsingGet(
matchId: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/match/online/pk/start',
            query: {
                'matchId': matchId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * pkSubmit
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static pkSubmitUsingPost(
request: MatchSubmitSingleRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/match/online/pk/submit',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
