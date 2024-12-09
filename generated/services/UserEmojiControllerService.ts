/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserEmoji } from "../models/UserEmoji";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UserEmojiControllerService {
  /**
   * delete
   * @param ids ids
   * @returns any OK
   * @throws ApiError
   */
  public static deleteUsingGet4(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/oj/useremoji/delete",
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
  public static deleteUsingHead3(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "HEAD",
      url: "/api/oj/useremoji/delete",
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
  public static deleteUsingPost5(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/oj/useremoji/delete",
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
  public static deleteUsingPut3(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/oj/useremoji/delete",
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
  public static deleteUsingDelete3(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/oj/useremoji/delete",
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
  public static deleteUsingOptions3(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/api/oj/useremoji/delete",
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
  public static deleteUsingPatch3(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/oj/useremoji/delete",
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
  public static infoUsingGet6(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/oj/useremoji/info/{id}",
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
   * info
   * @param id id
   * @returns any OK
   * @throws ApiError
   */
  public static infoUsingHead3(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "HEAD",
      url: "/api/oj/useremoji/info/{id}",
      path: {
        id: id,
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
  public static infoUsingPost3(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/oj/useremoji/info/{id}",
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
   * info
   * @param id id
   * @returns any OK
   * @throws ApiError
   */
  public static infoUsingPut3(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/oj/useremoji/info/{id}",
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
   * info
   * @param id id
   * @returns any OK
   * @throws ApiError
   */
  public static infoUsingDelete3(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/oj/useremoji/info/{id}",
      path: {
        id: id,
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
  public static infoUsingOptions3(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/api/oj/useremoji/info/{id}",
      path: {
        id: id,
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
  public static infoUsingPatch3(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/oj/useremoji/info/{id}",
      path: {
        id: id,
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
  public static saveUsingGet3(
    userEmoji: UserEmoji
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/oj/useremoji/save",
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
  public static saveUsingHead3(
    userEmoji: UserEmoji
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "HEAD",
      url: "/api/oj/useremoji/save",
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
  public static saveUsingPost6(
    userEmoji: UserEmoji
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/oj/useremoji/save",
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
  public static saveUsingPut3(
    userEmoji: UserEmoji
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/oj/useremoji/save",
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
  public static saveUsingDelete3(
    userEmoji: UserEmoji
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/oj/useremoji/save",
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
  public static saveUsingOptions3(
    userEmoji: UserEmoji
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/api/oj/useremoji/save",
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
  public static saveUsingPatch3(
    userEmoji: UserEmoji
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/oj/useremoji/save",
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
  public static updateUsingGet3(
    userEmoji: UserEmoji
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/oj/useremoji/update",
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
  public static updateUsingHead3(
    userEmoji: UserEmoji
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "HEAD",
      url: "/api/oj/useremoji/update",
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
  public static updateUsingPost5(
    userEmoji: UserEmoji
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/oj/useremoji/update",
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
  public static updateUsingPut3(
    userEmoji: UserEmoji
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/oj/useremoji/update",
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
  public static updateUsingDelete3(
    userEmoji: UserEmoji
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/oj/useremoji/update",
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
  public static updateUsingOptions3(
    userEmoji: UserEmoji
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/api/oj/useremoji/update",
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
  public static updateUsingPatch3(
    userEmoji: UserEmoji
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/oj/useremoji/update",
      body: userEmoji,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }
}
