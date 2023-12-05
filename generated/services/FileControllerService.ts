/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class FileControllerService {
  /**
   * uploadFile
   * @param biz
   * @param file
   * @returns any OK
   * @throws ApiError
   */
  public static uploadFileUsingPost(
    biz?: string,
    postId?: string,
    file?: Blob
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/file/upload",
      query: {
        biz: biz,
        postId: postId,
      },
      formData: {
        file: file,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
