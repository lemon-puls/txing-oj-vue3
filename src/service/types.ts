/**
 * 聊天会话项
 */
import { OnlineEnum, RoomTypeEnum } from "@/enume";
import { UserVO } from "../../generated";

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
  userAvatar: string;
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
  body: TextMsgBody | ImageBody | any;
  /**
   * 发送时间 时间戳
   */
  sendTime: number;
};

/**
 * 图片消息体
 */
export type ImageBody = {
  size: number;
  url: string;
  width: number;
  height: number;
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

/**
 * 好友请求
 */
export type RequestFriend = {
  /**
   * 申请id
   */
  id: number;
  /**
   * 申请内容
   */
  content: string;
  /**
   * 申请状态
   */
  status: RequestFriendStatus;
  /**
   * 申请人
   */
  // ap
};

/**
 * 好友请求通过状态
 */
export enum RequestFriendStatus {
  /**
   * 待通过
   */
  WAITTING,
  /**
   * 已通过
   */
  AGREE,
}

/**
 * 用户
 */
export type UserItem = {
  // 用户id
  userId?: number;
  // 在线状态
  activeStatus: OnlineEnum;
  // 最后一次上下线时间
  lastOptTime: number;
  // 用户名称
  userName?: string;
  // 用户头像
  userAvatar?: string;
};

/**
 * 群组信息
 */
export type GroupDetailVO = {
  // 群头像
  avatar: string;
  // 群名称
  groupName: string;
  // 在线人数
  onlineCount: number;
  // 房间id
  roomId: number;
  // 当前用户角色：0:群主 1：管理员 2：普通成员 3：被踢出群聊
  role: number;
};

export type UserCacheVO = UserVO & {
  lastModifyTime: number;
};

// 联系人列表项
export type ContactItem = {
  userId: number;
  activeStatus: OnlineEnum;
  lastOptTime: number;
};
// 加好友申请列表项
export type FriendApplyItem = {
  /**
   * id
   */
  id: number;
  /**
   * 申请人id
   */
  userId: number;
  /**
   * 申请类型 0：加好友
   */
  type: number;
  /**
   * 申请内容
   */
  msg: string;
  /**
   * 申请状态：0：待通过 1：已通过
   */
  status: number;
  /**
   * 时间
   */
  time: string;
  /**
   * 创建时间（需要进行格式转换再供前端展示 转换后的值存储在time字段）
   */
  createTime: number;
  /**
   * 阅读状态：0：未读 1：已读
   */
  readStatus: number;
};
