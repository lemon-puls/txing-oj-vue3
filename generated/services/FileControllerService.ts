/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FileControllerService {

    /**
     * getCosCredentials
     * @returns any OK
     * @throws ApiError
     */
    public static getCosCredentialsUsingGet(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/file/credential/get',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * uploadFile
     * @param biz 
     * @param file 
     * @param oldImg 
     * @param postId 
     * @returns any OK
     * @throws ApiError
     */
    public static uploadFileUsingPost(
biz?: string,
file?: Blob,
oldImg?: string,
postId?: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file/upload',
            query: {
                'biz': biz,
                'oldImg': oldImg,
                'postId': postId,
            },
            formData: {
                'file': file,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * uploadFilePrivate
     * @param biz 
     * @param file 
     * @param oldImg 
     * @param postId 
     * @returns any OK
     * @throws ApiError
     */
    public static uploadFilePrivateUsingPost(
biz?: string,
file?: Blob,
oldImg?: string,
postId?: number,
): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/file/upload/12423534672436234',
            query: {
                'biz': biz,
                'oldImg': oldImg,
                'postId': postId,
            },
            formData: {
                'file': file,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
