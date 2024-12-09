/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseVideo } from "../models/CourseVideo";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class CourseVideoControllerService {
  /**
   * delete
   * @param ids ids
   * @returns any OK
   * @throws ApiError
   */
  public static deleteUsingGet2(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/oj/coursevideo/delete",
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
  public static deleteUsingHead2(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "HEAD",
      url: "/api/oj/coursevideo/delete",
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
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/oj/coursevideo/delete",
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
  public static deleteUsingPut2(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/oj/coursevideo/delete",
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
  public static deleteUsingDelete2(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/oj/coursevideo/delete",
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
  public static deleteUsingOptions2(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/api/oj/coursevideo/delete",
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
  public static deleteUsingPatch2(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/oj/coursevideo/delete",
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
  public static infoUsingGet2(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/oj/coursevideo/info/{id}",
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
  public static infoUsingHead2(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "HEAD",
      url: "/api/oj/coursevideo/info/{id}",
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
  public static infoUsingPost2(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/oj/coursevideo/info/{id}",
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
  public static infoUsingPut2(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/oj/coursevideo/info/{id}",
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
  public static infoUsingDelete2(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/oj/coursevideo/info/{id}",
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
  public static infoUsingOptions2(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/api/oj/coursevideo/info/{id}",
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
  public static infoUsingPatch2(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/oj/coursevideo/info/{id}",
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
   * @param courseVideo courseVideo
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingGet2(
    courseVideo: CourseVideo
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/oj/coursevideo/save",
      body: courseVideo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * save
   * @param courseVideo courseVideo
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingHead2(
    courseVideo: CourseVideo
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "HEAD",
      url: "/api/oj/coursevideo/save",
      body: courseVideo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * save
   * @param courseVideo courseVideo
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingPost2(
    courseVideo: CourseVideo
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/oj/coursevideo/save",
      body: courseVideo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * save
   * @param courseVideo courseVideo
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingPut2(
    courseVideo: CourseVideo
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/oj/coursevideo/save",
      body: courseVideo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * save
   * @param courseVideo courseVideo
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingDelete2(
    courseVideo: CourseVideo
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/oj/coursevideo/save",
      body: courseVideo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * save
   * @param courseVideo courseVideo
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingOptions2(
    courseVideo: CourseVideo
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/api/oj/coursevideo/save",
      body: courseVideo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * save
   * @param courseVideo courseVideo
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingPatch2(
    courseVideo: CourseVideo
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/oj/coursevideo/save",
      body: courseVideo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * update
   * @param courseVideo courseVideo
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingGet2(
    courseVideo: CourseVideo
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/oj/coursevideo/update",
      body: courseVideo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * update
   * @param courseVideo courseVideo
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingHead2(
    courseVideo: CourseVideo
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "HEAD",
      url: "/api/oj/coursevideo/update",
      body: courseVideo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * update
   * @param courseVideo courseVideo
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingPost2(
    courseVideo: CourseVideo
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/oj/coursevideo/update",
      body: courseVideo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * update
   * @param courseVideo courseVideo
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingPut2(
    courseVideo: CourseVideo
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/oj/coursevideo/update",
      body: courseVideo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * update
   * @param courseVideo courseVideo
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingDelete2(
    courseVideo: CourseVideo
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/oj/coursevideo/update",
      body: courseVideo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * update
   * @param courseVideo courseVideo
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingOptions2(
    courseVideo: CourseVideo
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/api/oj/coursevideo/update",
      body: courseVideo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * update
   * @param courseVideo courseVideo
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingPatch2(
    courseVideo: CourseVideo
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/oj/coursevideo/update",
      body: courseVideo,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }
}
