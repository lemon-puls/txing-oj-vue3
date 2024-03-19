/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MatchSubmitBatchRequest } from '../models/MatchSubmitBatchRequest';
import type { MatchSubmitSingleRequest } from '../models/MatchSubmitSingleRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MatchWeekAppControllerService {

    /**
     * getWeekMatchHistory
     * @returns any OK
     * @throws ApiError
     */
    public static getWeekMatchHistoryUsingGet(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/match/week/history/get',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getNextMatch
     * @returns any OK
     * @throws ApiError
     */
    public static getNextMatchUsingGet(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/match/week/next/get',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getMatchRank
     * @returns any OK
     * @throws ApiError
     */
    public static getMatchRankUsingGet(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/match/week/rank/get',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * startMatch
     * @returns any OK
     * @throws ApiError
     */
    public static startMatchUsingGet(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/match/week/start',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * submitAll
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static submitAllUsingPost(
request: MatchSubmitBatchRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/match/week/submit/all',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * submitSingle
     * @param matchSubmitSingleRequest matchSubmitSingleRequest
     * @returns any OK
     * @throws ApiError
     */
    public static submitSingleUsingPost(
matchSubmitSingleRequest: MatchSubmitSingleRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/match/week/submit/single',
            body: matchSubmitSingleRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
