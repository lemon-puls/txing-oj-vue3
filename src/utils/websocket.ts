import { worker } from "@/utils/initWorker";
import { useUserStore } from "@/store/user";
import {
  UserLoginSuccessResponse,
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

class Ws {
  // 是否已建立ws连接
  #connectReady = false;
  // 任务队列
  #tasks: WsRequestMsgContentType[] = [];

  constructor() {
    this.initConnect();
    // 收到消息
    worker.addEventListener("message", this.onWorkerMsg);
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
    const token = localStorage.getItem("TOKEN");
    // 初始化ws(连接)
    worker.postMessage(
      `{"type": "initWS", "value": ${token ? `"${token}"` : null}}`
    );
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

  #send(msg: WsRequestMsgContentType) {
    worker.postMessage(
      `{"type": "message", "value":${
        typeof msg === "string" ? msg : JSON.stringify(msg)
      }}`
    );
  }

  send = (params: WsRequestMsgContentType) => {
    if (this.#connectReady) {
      this.#send(params);
    } else {
      this.#tasks.push(params);
    }
  };

  onWsMessage = (value: string) => {
    const groupStore = useGroupStore();
    const chatStore = useChatStore();
    const userStore = useUserStore();
    const globalStore = useGlobalStore();
    const router = useRouter();

    const params: { type: WsResponseMsgType; data: unknown } =
      JSON.parse(value);
    switch (params.type) {
      case WsResponseMsgType.UserLoginSuccess: {
        const { token, ...rest } = params.data as UserLoginSuccessResponse;
        localStorage.setItem("TOKEN", token);
        dealToken.clear();
        dealToken.get();
        // @ts-ignore
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
        break;
      }
      case WsResponseMsgType.Message: {
        chatStore.pushMsg(params.data as MessageShow);
        break;
      }
      case WsResponseMsgType.UserOlineOfflineNotify: {
        const data = params.data as WsUserStatusChangeVO;
        groupStore.groupInfo.onlineCount = data.onlineNum;
        groupStore.updateUserStatusBatch(data.chatMemberVOS);
        break;
      }
      case WsResponseMsgType.UserTokenInvalid: {
        userStore.isSign = false;
        userStore.loginUser.userRole = undefined;
        localStorage.removeItem("TOKEN");
        break;
      }
      case WsResponseMsgType.RequestAddFriend: {
        const data = params.data as { userId: number; unReadCount: number };
        globalStore.unReadMark.newFriendUnreadCount += data.unReadCount;
        notify({
          name: "新好友",
          text: "您有一个新的好友请求，快来看看~",
          onClick: () => {
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

export default new Ws();
