/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GroupMemberRemoveRequest = {
    /**
     * 房间id
     */
    roomId?: number;
    /**
     * 要移除的用户id（当不指定时 默认选定当前用户 当选定的用户是群主时 即表示解散该群 ）
     */
    userId?: number;
};
