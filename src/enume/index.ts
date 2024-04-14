export enum OnlineEnum {
  /**
   * 离线
   */
  OFFLINE,
  /**
   * 在线
   */
  ONLINE,
}

export enum RoomTypeEnum {
  /**
   * 私聊
   */
  SINGLE,
  /**
   * 群聊
   */
  GROUP,
}

export enum FriendApplyStatusEnum {
  WAITTING,
  AGREE,
}

export enum MsgTypeEnum {
  TEXT,
  RECALL,
  IMG,
  SYSTEM,
  FILE,
}

export enum GroupMemberRoleEnum {
  LEADER,
  MANAGER,
  MEMBER,
  REMOVE,
}

export enum RoomStatusEnum {
  ACTIVE,
  FORBIDDEN,
}

// 作品审核状态
export enum CheckStatusEnum {
  WAITTING,
  ACCEPTED,
  REJECT,
}

// 判题结果
export enum JudgeRsultEnum {
  TIMEOUT = "超时",
  OUT_OF_MEMORY = "内存溢出",
  RUN_ERROR = "运行错误",
  COMPILE_ERROR = "编译错误",
  ACCEPTED = "完全通过",
}
