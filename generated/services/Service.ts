/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatMessageRequest } from "../models/ChatMessageRequest";
import type { ContactUpdateOrAddRequest } from "../models/ContactUpdateOrAddRequest";
import type { CursorPageBaseRequest } from "../models/CursorPageBaseRequest";
import type { GroupAddRequest } from "../models/GroupAddRequest";
import type { GroupMemberRemoveRequest } from "../models/GroupMemberRemoveRequest";
import type { GroupMemberRequest } from "../models/GroupMemberRequest";
import type { MessagePageRequest } from "../models/MessagePageRequest";
import type { RemoveSessionRequest } from "../models/RemoveSessionRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class Service {
  /**
   * 更新（活跃时间）/创建会话
   * @param updateOrAddRequest updateOrAddRequest
   * @returns any OK
   * @throws ApiError
   */
  public static updateOrCreateContactUsingPost(
    updateOrAddRequest: ContactUpdateOrAddRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/chat/contact/add",
      body: updateOrAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 获取会话详情（by FriendId）
   * @param friendId friendId
   * @returns any OK
   * @throws ApiError
   */
  public static getDetailByFriendIdUsingGet(
    friendId: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/chat/contact/detail/friend/get",
      query: {
        friendId: friendId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 获取会话详情
   * @param roomId roomId
   * @returns any OK
   * @throws ApiError
   */
  public static getDetailByRoomIdUsingGet(
    roomId: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/chat/contact/detail/get",
      query: {
        roomId: roomId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 查询（游标翻页）
   * @param cursorPageBaseRequest cursorPageBaseRequest
   * @returns any OK
   * @throws ApiError
   */
  public static getSessionPageByCursorUsingPost(
    cursorPageBaseRequest: CursorPageBaseRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/chat/contact/list",
      body: cursorPageBaseRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 消息阅读上报
   * @param roomId 房间id
   * @returns any OK
   * @throws ApiError
   */
  public static msgReadReportUsingPost(
    roomId: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/chat/contact/msg/read",
      query: {
        roomId: roomId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 移除会话
   * @param removeSessionRequest removeSessionRequest
   * @returns any OK
   * @throws ApiError
   */
  public static removeSessionUsingPost(
    removeSessionRequest: RemoveSessionRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/chat/contact/remove",
      body: removeSessionRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 查询（游标翻页）
   * @param pageRequest pageRequest
   * @returns any OK
   * @throws ApiError
   */
  public static getMsgListByCursorUsingPost(
    pageRequest: MessagePageRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/chat/message/list",
      body: pageRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 发送消息
   * @param request request
   * @returns any OK
   * @throws ApiError
   */
  public static sendMsgUsingPost(
    request: ChatMessageRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/chat/message/msg",
      body: request,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 创建群聊
   * @param groupAddRequest groupAddRequest
   * @returns any OK
   * @throws ApiError
   */
  public static addGroupUsingPost(
    groupAddRequest: GroupAddRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/chat/room/group/add",
      body: groupAddRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 群组详情
   * @param roomId roomId
   * @returns any OK
   * @throws ApiError
   */
  public static groupDetailUsingGet(
    roomId: number
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/chat/room/group/detail/get",
      query: {
        roomId: roomId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * 查询群组成员（游标）
   * @param groupMemberRequest groupMemberRequest
   * @returns any OK
   * @throws ApiError
   */
  public static getMembersByCursorUsingPost(
    groupMemberRequest: GroupMemberRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/chat/room/group/member/page",
      body: groupMemberRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * removeGroupMember
   * @param groupMemberRemoveRequest groupMemberRemoveRequest
   * @returns any OK
   * @throws ApiError
   */
  public static removeGroupMemberUsingPost(
    groupMemberRemoveRequest: GroupMemberRemoveRequest
  ): CancelablePromise<Record<string, any>> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/chat/room/group/member/remove",
      body: groupMemberRemoveRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
