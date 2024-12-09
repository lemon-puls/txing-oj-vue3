/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MatchSubmitBatchRequest } from "../models/MatchSubmitBatchRequest";
import type { MatchSubmitSingleRequest } from "../models/MatchSubmitSingleRequest";
import type { PageRequest } from "../models/PageRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class MatchWeekAppControllerService {
  /**
   * cehsi
   * @returns any OK
   * @throws ApiError
   */
  public static cehsiUsingGet(): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/match/week/ceshi",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * createWeekMatch
   * @returns any OK
   * @throws ApiError
   */
  public static createWeekMatchUsingGet(): CancelablePromise<
    Record<string, any>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/match/week/create",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * giveUpMatch
   * @param matchId matchId
   * @returns any OK
   * @throws ApiError
   */
  public static giveUpMatchUsingGet(
    matchId: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/match/week/giveup",
      query: {
        matchId: matchId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getWeekMatchHistory
   * @returns any OK
   * @throws ApiError
   */
  public static getWeekMatchHistoryUsingGet(): CancelablePromise<
    Record<string, any>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/match/week/history/get",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getLastWeekMatch
   * @returns any OK
   * @throws ApiError
   */
  public static getLastWeekMatchUsingGet(): CancelablePromise<
    Record<string, any>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/match/week/last/get",
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
      method: "GET",
      url: "/api/match/week/next/get",
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
      method: "GET",
      url: "/api/match/week/rank/get",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * isRepeatJoin
   * @param matchId matchId
   * @returns any OK
   * @throws ApiError
   */
  public static isRepeatJoinUsingGet(
    matchId: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/match/week/repeat/join/is",
      query: {
        matchId: matchId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getSimulateResult
   * @param joinId joinId
   * @returns any OK
   * @throws ApiError
   */
  public static getSimulateResultUsingGet(
    joinId: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/match/week/simulate/result/get",
      query: {
        joinId: joinId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * startMatch
   * @param matchId matchId
   * @returns any OK
   * @throws ApiError
   */
  public static startMatchUsingGet(
    matchId?: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/match/week/start",
      query: {
        matchId: matchId,
      },
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
    request: MatchSubmitBatchRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/match/week/submit/all",
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
    matchSubmitSingleRequest: MatchSubmitSingleRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/match/week/submit/single",
      body: matchSubmitSingleRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getWeekMatchRecordByUserId
   * @param pageRequest pageRequest
   * @returns any OK
   * @throws ApiError
   */
  public static getWeekMatchRecordByUserIdUsingPost(
    pageRequest: PageRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/match/week/user/record/get",
      body: pageRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getWeekSimulateRecordByUserId
   * @param pageRequest pageRequest
   * @returns any OK
   * @throws ApiError
   */
  public static getWeekSimulateRecordByUserIdUsingPost(
    pageRequest: PageRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/match/week/user/simulate/record/get",
      body: pageRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
