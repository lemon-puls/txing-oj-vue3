/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseAddRequest } from '../models/CourseAddRequest';
import type { CourseBaseUpdateRequest } from '../models/CourseBaseUpdateRequest';
import type { CourseVideoUpdateOrAddRequest } from '../models/CourseVideoUpdateOrAddRequest';
import type { PageVO } from '../models/PageVO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CourseAppControllerService {

    /**
     * addCourse
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static addCourseUsingPost(
request: CourseAddRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/course/add',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * updateCourseBaseInfo
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static updateCourseBaseInfoUsingPost(
request: CourseBaseUpdateRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/course/base/update',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteCourses
     * @param courseIds courseIds
     * @returns any OK
     * @throws ApiError
     */
    public static deleteCoursesUsingPost(
courseIds: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/course/delete',
            body: courseIds,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * searchCourseByPage
     * @param queryVo queryVO
     * @returns any OK
     * @throws ApiError
     */
    public static searchCourseByPageUsingPost(
queryVo: PageVO,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/course/page/search',
            body: queryVo,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getPlaySign
     * @param fileId fileId
     * @returns any OK
     * @throws ApiError
     */
    public static getPlaySignUsingGet(
fileId: string,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/course/play/sign/get',
            query: {
                'fileId': fileId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getVodSign
     * @returns any OK
     * @throws ApiError
     */
    public static getVodSignUsingGet(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/course/sign/get',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * addOrUpdateCourseVideo
     * @param request request
     * @returns any OK
     * @throws ApiError
     */
    public static addOrUpdateCourseVideoUsingPost(
request: CourseVideoUpdateOrAddRequest,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/course/video/change',
            body: request,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * deleteVideoBatch
     * @param courseId courseId
     * @param videoIds videoIds
     * @returns any OK
     * @throws ApiError
     */
    public static deleteVideoBatchUsingPost(
courseId: number,
videoIds: Array<number>,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/course/video/delete/batch',
            query: {
                'courseId': courseId,
            },
            body: videoIds,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * getVideoPlayVO
     * @param courseId courseId
     * @returns any OK
     * @throws ApiError
     */
    public static getVideoPlayVoUsingGet(
courseId: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/course/video/play/info/get',
            query: {
                'courseId': courseId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
