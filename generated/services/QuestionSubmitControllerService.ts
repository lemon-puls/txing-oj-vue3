/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageVO } from "../models/PageVO";
import type { QuestionSubmit } from "../models/QuestionSubmit";
import type { QuestionSubmitDoRequest } from "../models/QuestionSubmitDoRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class QuestionSubmitControllerService {
  /**
   * getChartData
   * @returns any OK
   * @throws ApiError
   */
  public static getChartDataUsingPost(): CancelablePromise<
    Record<string, any>
  > {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/submit/chart/data/get",
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
  public static deleteUsingPost4(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/submit/delete",
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
  public static infoUsingGet5(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question/submit/detail/vo/{id}",
      path: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * doQuestionSubmit
   * @param questionSubmitDoRequest questionSubmitDoRequest
   * @returns any OK
   * @throws ApiError
   */
  public static doQuestionSubmitUsingPost(
    questionSubmitDoRequest: QuestionSubmitDoRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/submit/do",
      body: questionSubmitDoRequest,
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
  public static listUsingPost4(
    queryVo: PageVO
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/submit/list",
      body: queryVo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getExecResult
   * @param sumbitId sumbitId
   * @returns any OK
   * @throws ApiError
   */
  public static getExecResultUsingGet(
    sumbitId: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question/submit/result/get",
      query: {
        sumbitId: sumbitId,
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
   * @param questionSubmit questionSubmit
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingPost4(
    questionSubmit: QuestionSubmit
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/submit/update",
      body: questionSubmit,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
