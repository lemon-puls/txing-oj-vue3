// import { worker } from "@/utils/initWorker";
import { useUserStore } from "@/store/user";
import {
  UserLoginSuccessResponse,
  WsFriendApplyVO,
  WsRequestMsgContentType,
  WsResponseMsgType,
  WsUserStatusChangeVO,
} from "@/utils/WsType";
import { dealToken } from "@/service/request";
import { useGroupStore } from "@/store/group";
import { OnlineEnum } from "@/enume";
import { useChatStore } from "@/store/chat";
import { MessageShow } from "@/service/types";
import { useGlobalStore } from "@/store/global";
import { useRouter } from "vue-router";
import JSONBig from "json-bigint";
import { notify } from "@/utils/notification";
import { useContactStore } from "@/store/contact";
import { timeToStr } from "@/utils/computeTime";
import { UserApplyControllerService } from "../../generated";

class Ws {
  // 是否已建立ws连接
  #connectReady = false;
  // 任务队列
  #tasks: WsRequestMsgContentType[] = [];

  worker: Worker | null = null;

  constructor() {
    this.worker = new Worker(new URL("./worker.ts", import.meta.url));
    this.initConnect();
    console.log("执行构造函数了");
    // 收到消息
    this.worker.addEventListener("message", this.onWorkerMsg);
    // 后台重试次数达到上限后 tab获取焦点后再尝试连接
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && !this.#connectReady) {
        this.initConnect();
      }
    });
  }

  /**
   * 初始化ws连接
   */
  initConnect = () => {
    const id = useUserStore().loginUser.id;
    const token = localStorage.getItem("TOKEN");
    const userId = id === -1 ? "" : id;
    // console.log("userId19:", userId.toString());
    if (!token || !userId) {
      console.log("还未登录，不能建立Ws连接");
      return;
    }
    // 初始化ws(连接)
    const params = `{"type": "initWS", "value": {"token": "${token}", "userId": "${userId.toString()}"}}`;
    // console.log(params);
    this.worker?.postMessage(params);
  };

  closeWsConnection = () => {
    console.log("websocket: 关闭ws连接 销毁worker");
    this.worker?.postMessage(`{"type": "close", "value":""}`);
    this.worker?.terminate();
  };

  onWorkerMsg = (e: MessageEvent<any>) => {
    const data: { type: string; value: unknown } = JSON.parse(e.data);
    switch (data.type) {
      case "message": {
        this.onWsMessage(data.value as string);
        break;
      }
      case "open": {
        this.#dealTasks();
        break;
      }
      case "close":
      case "error": {
        this.#onClose();
      }
    }
  };

  #onClose = () => {
    this.#connectReady = false;
  };

  /**
   * ws连接建立完成后 处理任务队列里的任务
   * @private
   */
  #dealTasks = () => {
    this.#connectReady = true;
    setTimeout(() => {
      const userStore = useUserStore();
      if (userStore.isSign) {
        // 处理堆积的任务
        this.#tasks.forEach((task) => {
          this.send(task);
        });
        // 清空任务队列
        this.#tasks = [];
      }
    }, 500);
  };

  #send = (msg: WsRequestMsgContentType) => {
    this.worker?.postMessage(
      `{"type": "message", "value":${
        typeof msg === "string" ? msg : JSON.stringify(msg)
      }}`
    );
  };

  send = (params: WsRequestMsgContentType) => {
    if (this.#connectReady) {
      this.#send(params);
    } else {
      this.#tasks.push(params);
    }
  };

  onWsMessage = (value: string) => {
    const chatStore = useChatStore();
    const userStore = useUserStore();
    const globalStore = useGlobalStore();
    const groupStore = useGroupStore();
    const contactStore = useContactStore();

    const params: { type: WsResponseMsgType; data: unknown } =
      JSON.parse(value);
    switch (params.type) {
      case WsResponseMsgType.UserLoginSuccess: {
        console.log("前端收到用户登录成功ws");
        const { token, ...rest } = params.data as UserLoginSuccessResponse;
        localStorage.setItem("TOKEN", token);
        dealToken.clear();
        dealToken.get();
        groupStore.updateUserStatusBatch([
          {
            userId: rest.id,
            activeStatus: OnlineEnum.ONLINE,
            lastOptTime: Date.now(),
            userName: rest.userName,
            userAvatar: rest.userAvatar,
          },
        ]);
        chatStore.getSessionList(true);
        contactStore.getFriendApplyList(true);
        contactStore.getContactList(true);
        break;
      }
      case WsResponseMsgType.Message: {
        console.log(
          "ws: 接收到新消息",
          chatStore.chatMessageList,
          chatStore.messageMap,
          "params:",
          params,
          "value:",
          value
        );
        // alert("接受到新消息：" + (params.data as MessageShow).message.id);
        chatStore.pushMsg(params.data as MessageShow);
        break;
      }
      case WsResponseMsgType.UserOlineOfflineNotify: {
        // const data = params.data as WsUserStatusChangeVO;
        // groupStore.groupInfo.onlineCount = data.onlineNum;
        // groupStore.updateUserStatusBatch(data.chatMemberVOS);
        break;
      }
      case WsResponseMsgType.UserTokenInvalid: {
        userStore.isSign = false;
        userStore.loginUser.userRole = undefined;
        localStorage.removeItem("TOKEN");
        break;
      }
      case WsResponseMsgType.RequestAddFriend: {
        const data = params.data as WsFriendApplyVO;
        globalStore.unReadMark.newFriendUnreadCount += data.unreadCount;
        if (chatStore.navFlag === 1) {
          const friendApplyItem = data.friendApplyVO;
          friendApplyItem.time = timeToStr(friendApplyItem.createTime);
          contactStore.friendApplyList.unshift(friendApplyItem);
          if (chatStore.showModal) {
            contactStore.friendApplyList[0].readStatus = 1;
            UserApplyControllerService.markReadFriendApplyUsingGet();
          }
        }
        if (!chatStore.showModal || chatStore.navFlag !== 1) {
          globalStore.isNeedNotify.friendNotify = true;
        }
        notify({
          name: "新好友",
          text: "您有一个新的好友请求，快来看看~",
          onClick: () => {
            if (chatStore.navFlag !== 1) {
              contactStore.getFriendApplyList(true);
            }
            chatStore.showModal = true;
            chatStore.navFlag = 1;
          },
        });
        break;
      }
      default: {
        console.log("接收到非法类型的消息", params);
        break;
      }
    }
  };
}

export default Ws;
