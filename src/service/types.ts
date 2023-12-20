/**
 * 聊天会话项
 */
export type SessionItem = {
  /**
   * 最后活跃时间
   */
  activeTime: number;
  /**
   * 会话头像
   */
  avatar: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 房间id
   */
  roomId: number;
  /**
   * 最新消息
   */
  lastMessage: string;
  /**
   * 房间类型 0：私聊 1： 群聊
   */
  type: RoomTypeEnum;
  /**
   * 未读消息数
   */
  unreadCount: number;
};

/**
 * 房间类型
 */
export enum RoomTypeEnum {
  /**
   * 私聊
   */
  Single,
  /**
   * 群聊
   */
  Group,
}

/**
 * 消息中的用户信息
 */
export type MessageUser = {
  /**
   * 用户id
   */
  userId: number;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 头像
   */
  avatar: string;
};

/**
 * 消息类型 枚举
 */
export enum MessageTypeEnum {
  /**
   * 文本
   */
  TEXT,
  /**
   * 撤回
   */
  RECALL,
  /**
   * 图片
   */
  IMAGE,
  /**
   * 文件
   */
  FILE,
  /**
   * 视频
   */
  VIDEO,
  /**
   * 音频
   */
  VOICE,
  /**
   * 表情包
   */
  EMOJI,
  /**
   * 系统消息
   */
  SYSTEM,
}

/**
 * 消息
 */
export type Message = {
  /**
   * 消息id
   */
  id: number;
  /**
   * 房间id
   */
  roomId: number;
  /**
   * 消息类型
   */
  type: MessageTypeEnum;
  /**
   * 消息主体
   */
  body: TextMsgBody | any;
  /**
   * 发送时间 时间戳
   */
  sendTime: number;
};

/**
 * 文本消息体
 */
export type TextMsgBody = {
  /**
   * 消息内容
   */
  content: string;
};
/**
 * 消息信息 用于展示
 */
export type MessageShow = {
  /**
   * 发送方信息
   */
  fromUser: MessageUser;
  /**
   * 消息主体
   */
  message: Message;
  /**
   * 发送时间
   */
  sendTime: string;
  /**
   * 是否需要显示发送时间
   */
  timeNode?: string;
  /**
   * 加载中标志
   */
  loading: boolean;
};
