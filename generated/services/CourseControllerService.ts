/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Course } from '../models/Course';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CourseControllerService {

    /**
     * delete
     * @param ids ids
     * @returns any OK
     * @throws ApiError
     */
    public static deleteUsingGet(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/oj/coursecourse/delete',
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
    public static deleteUsingHead(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/api/oj/coursecourse/delete',
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
    public static deleteUsingPost(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/oj/coursecourse/delete',
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
    public static deleteUsingPut(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/oj/coursecourse/delete',
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
    public static deleteUsingDelete(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/oj/coursecourse/delete',
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
    public static deleteUsingOptions(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/api/oj/coursecourse/delete',
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
    public static deleteUsingPatch(
ids: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/oj/coursecourse/delete',
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
    public static infoUsingGet(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/oj/coursecourse/info/{id}',
            path: {
                'id': id,
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
    public static infoUsingHead(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/api/oj/coursecourse/info/{id}',
            path: {
                'id': id,
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
    public static infoUsingPost(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/oj/coursecourse/info/{id}',
            path: {
                'id': id,
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
    public static infoUsingPut(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/oj/coursecourse/info/{id}',
            path: {
                'id': id,
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
    public static infoUsingDelete(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/oj/coursecourse/info/{id}',
            path: {
                'id': id,
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
    public static infoUsingOptions(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/api/oj/coursecourse/info/{id}',
            path: {
                'id': id,
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
    public static infoUsingPatch(
id: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/oj/coursecourse/info/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * save
     * @param courseCourse courseCourse
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingGet(
courseCourse: Course,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/oj/coursecourse/save',
            body: courseCourse,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * save
     * @param courseCourse courseCourse
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingHead(
courseCourse: Course,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/api/oj/coursecourse/save',
            body: courseCourse,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * save
     * @param courseCourse courseCourse
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingPost(
courseCourse: Course,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/oj/coursecourse/save',
            body: courseCourse,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * save
     * @param courseCourse courseCourse
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingPut(
courseCourse: Course,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/oj/coursecourse/save',
            body: courseCourse,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * save
     * @param courseCourse courseCourse
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingDelete(
courseCourse: Course,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/oj/coursecourse/save',
            body: courseCourse,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * save
     * @param courseCourse courseCourse
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingOptions(
courseCourse: Course,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/api/oj/coursecourse/save',
            body: courseCourse,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * save
     * @param courseCourse courseCourse
     * @returns any OK
     * @throws ApiError
     */
    public static saveUsingPatch(
courseCourse: Course,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/oj/coursecourse/save',
            body: courseCourse,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * update
     * @param courseCourse courseCourse
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingGet(
courseCourse: Course,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/oj/coursecourse/update',
            body: courseCourse,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * update
     * @param courseCourse courseCourse
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingHead(
courseCourse: Course,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'HEAD',
            url: '/api/oj/coursecourse/update',
            body: courseCourse,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * update
     * @param courseCourse courseCourse
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingPost(
courseCourse: Course,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/oj/coursecourse/update',
            body: courseCourse,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * update
     * @param courseCourse courseCourse
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingPut(
courseCourse: Course,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/oj/coursecourse/update',
            body: courseCourse,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * update
     * @param courseCourse courseCourse
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingDelete(
courseCourse: Course,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/oj/coursecourse/update',
            body: courseCourse,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * update
     * @param courseCourse courseCourse
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingOptions(
courseCourse: Course,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/api/oj/coursecourse/update',
            body: courseCourse,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * update
     * @param courseCourse courseCourse
     * @returns any OK
     * @throws ApiError
     */
    public static updateUsingPatch(
courseCourse: Course,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/oj/coursecourse/update',
            body: courseCourse,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }

}
