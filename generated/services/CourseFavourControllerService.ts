/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseFavour } from "../models/CourseFavour";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class CourseFavourControllerService {
  /**
   * delete
   * @param ids ids
   * @returns any OK
   * @throws ApiError
   */
  public static deleteUsingGet1(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/oj/coursefavour/delete",
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
  public static deleteUsingHead1(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "HEAD",
      url: "/api/oj/coursefavour/delete",
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
  public static deleteUsingPost1(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/oj/coursefavour/delete",
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
  public static deleteUsingPut1(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/oj/coursefavour/delete",
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
  public static deleteUsingDelete1(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/oj/coursefavour/delete",
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
  public static deleteUsingOptions1(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/api/oj/coursefavour/delete",
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
  public static deleteUsingPatch1(
    ids: Array<number>
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/oj/coursefavour/delete",
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
  public static infoUsingGet1(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/oj/coursefavour/info/{id}",
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
  public static infoUsingHead1(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "HEAD",
      url: "/api/oj/coursefavour/info/{id}",
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
  public static infoUsingPost1(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/oj/coursefavour/info/{id}",
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
  public static infoUsingPut1(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/oj/coursefavour/info/{id}",
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
  public static infoUsingDelete1(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/oj/coursefavour/info/{id}",
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
  public static infoUsingOptions1(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/api/oj/coursefavour/info/{id}",
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
  public static infoUsingPatch1(
    id: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/oj/coursefavour/info/{id}",
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
   * @param courseFavour courseFavour
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingGet1(
    courseFavour: CourseFavour
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/oj/coursefavour/save",
      body: courseFavour,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * save
   * @param courseFavour courseFavour
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingHead1(
    courseFavour: CourseFavour
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "HEAD",
      url: "/api/oj/coursefavour/save",
      body: courseFavour,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * save
   * @param courseFavour courseFavour
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingPost1(
    courseFavour: CourseFavour
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/oj/coursefavour/save",
      body: courseFavour,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * save
   * @param courseFavour courseFavour
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingPut1(
    courseFavour: CourseFavour
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/oj/coursefavour/save",
      body: courseFavour,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * save
   * @param courseFavour courseFavour
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingDelete1(
    courseFavour: CourseFavour
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/oj/coursefavour/save",
      body: courseFavour,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * save
   * @param courseFavour courseFavour
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingOptions1(
    courseFavour: CourseFavour
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/api/oj/coursefavour/save",
      body: courseFavour,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * save
   * @param courseFavour courseFavour
   * @returns any OK
   * @throws ApiError
   */
  public static saveUsingPatch1(
    courseFavour: CourseFavour
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/oj/coursefavour/save",
      body: courseFavour,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * update
   * @param courseFavour courseFavour
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingGet1(
    courseFavour: CourseFavour
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/oj/coursefavour/update",
      body: courseFavour,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * update
   * @param courseFavour courseFavour
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingHead1(
    courseFavour: CourseFavour
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "HEAD",
      url: "/api/oj/coursefavour/update",
      body: courseFavour,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * update
   * @param courseFavour courseFavour
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingPost1(
    courseFavour: CourseFavour
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/oj/coursefavour/update",
      body: courseFavour,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * update
   * @param courseFavour courseFavour
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingPut1(
    courseFavour: CourseFavour
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/oj/coursefavour/update",
      body: courseFavour,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * update
   * @param courseFavour courseFavour
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingDelete1(
    courseFavour: CourseFavour
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/oj/coursefavour/update",
      body: courseFavour,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * update
   * @param courseFavour courseFavour
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingOptions1(
    courseFavour: CourseFavour
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "OPTIONS",
      url: "/api/oj/coursefavour/update",
      body: courseFavour,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }

  /**
   * update
   * @param courseFavour courseFavour
   * @returns any OK
   * @throws ApiError
   */
  public static updateUsingPatch1(
    courseFavour: CourseFavour
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "PATCH",
      url: "/api/oj/coursefavour/update",
      body: courseFavour,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
      },
    });
  }
}
