/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CursorPageBaseRequest } from "../models/CursorPageBaseRequest";
import type { UserApplyRequest } from "../models/UserApplyRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UserApplyControllerService {
  /**
   * 同意好友申请
   * @param applyId applyId
   * @returns any OK
   * @throws ApiError
   */
  public static agreeApplyUsingPost(
    applyId: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/apply/agree",
      query: {
        applyId: applyId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 申请加为好友
   * @param request request
   * @returns any OK
   * @throws ApiError
   */
  public static applyFriendUsingPost(
    request: UserApplyRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/apply/apply",
      body: request,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 获取好友申请列表
   * @param cursorPageBaseRequest cursorPageBaseRequest
   * @returns any OK
   * @throws ApiError
   */
  public static getFriendApplyPageByCursorUsingPost(
    cursorPageBaseRequest: CursorPageBaseRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/user/apply/cursor/list",
      body: cursorPageBaseRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * markReadFriendApply
   * @returns any OK
   * @throws ApiError
   */
  public static markReadFriendApplyUsingGet(): CancelablePromise<
    Record<string, any>
  > {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/user/apply/read/mark",
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
