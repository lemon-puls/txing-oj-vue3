/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PageVO } from "../models/PageVO";
import type { Question } from "../models/Question";
import type { QuestionAddRequest } from "../models/QuestionAddRequest";
import type { QuestionUpdateRequest } from "../models/QuestionUpdateRequest";
import type { QuestionVO } from "../models/QuestionVO";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class QuestionControllerService {
  /**
   * addQuestion
   * @param questionAddRequest questionAddRequest
   * @returns any OK
   * @throws ApiError
   */
  public static addQuestionUsingPost(
    questionAddRequest: QuestionAddRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/add",
      body: questionAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * deleteQuestionByIds
   * @param ids ids
   * @returns any OK
   * @throws ApiError
   */
  public static deleteQuestionByIdsUsingPost(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/delete",
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
  public static infoUsingGet4(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question/info/{id}",
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
   * list
   * @param queryVo queryVO
   * @returns any OK
   * @throws ApiError
   */
  public static listUsingPost2(
    queryVo: PageVO
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/list",
      body: queryVo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * listForManager
   * @param queryVo queryVO
   * @returns any OK
   * @throws ApiError
   */
  public static listForManagerUsingPost(
    queryVo: PageVO
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/manager/list",
      body: queryVo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * save
   * @param question question
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingPost5(
    question: Question
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/temp1",
      body: question,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * save1
   * @param questionVo questionVO
   * @returns any OK
   * @throws ApiError
   */
  public static save1UsingPost(
    questionVo: QuestionVO
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/temp2",
      body: questionVo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateQuestion
   * @param questionUpdateRequest questionUpdateRequest
   * @returns any OK
   * @throws ApiError
   */
  public static updateQuestionUsingPost(
    questionUpdateRequest: QuestionUpdateRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/question/update",
      body: questionUpdateRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getQuestionVoById
   * @param id id
   * @returns any OK
   * @throws ApiError
   */
  public static getQuestionVoByIdUsingGet(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/question/vo/get/id",
      query: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
