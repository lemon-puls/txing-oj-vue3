<!--
* @SendBar
* @author Li zhiwei
* @date 2023/12/20 16:19
-->

<template>
  <div ref="sendBarRef" id="SendBar">
    <div class="icons">
      <icon-face-smile-fill class="icon" :size="30" style="color: #ff9500" />
      <icon-folder class="icon" :size="30" style="color: #e9d28a" />
      <icon-voice class="icon" :size="30" style="color: cornflowerblue" />
    </div>
    <div
      ref="inputRef"
      class="input"
      :contenteditable="true"
      @input="onInputText"
    ></div>
    <div class="sendMsg">
      <a-button
        class="sendMsgButton"
        :long="false"
        type="outline"
        status="success"
        @click="sendMsgHandler"
        >发送
      </a-button>
    </div>
  </div>
</template>

<style lang="scss">
#SendBar {
  display: flex;
  flex-direction: column;
  height: 100%;
  //overflow: hidden;

  .icons {
    //position: sticky;
    //top: 0px;
    //display: flex;
    //flex-direction: row;
    //justify-content: right;
    //align-items: center;
    //row-gap: 15px;
    margin-left: 10px;
    margin-top: 10px;

    .icon {
      margin-right: 10px;
    }
  }

  .input {
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    height: 100%;
    margin-top: 10px;
    //margin-left: 20px;
    //margin-right: 20px;
    padding: 4px 20px;
    overflow: hidden;
    overflow-y: auto;
    font-size: 14px;
    color: inherit;
    white-space: pre-wrap;
    cursor: inherit;
    resize: none;
    background: none;
    border: none;
    border-radius: 0;
    outline: none;
    word-break: break-word;
  }

  .sendMsg {
    display: flex;
    justify-content: right;

    .sendMsgButton {
      width: 80px;
      margin: 10px 10px;
    }
  }
}
</style>

<script setup lang="ts">
import {
  IconFaceSmileFill,
  IconFolder,
  IconVoice,
} from "@arco-design/web-vue/es/icon";
import { ref } from "vue";
import { MsgTypeEnum } from "@/enume";
import { Service } from "../../../../../generated";
import { useGlobalStore } from "@/store/global";
import message from "@arco-design/web-vue/es/message";
import { useChatStore } from "@/store/chat";

const sendBarRef = ref<HTMLElement | null>();
const inputRef = ref<HTMLElement | null>();
const inputValue = ref("");
const isSending = ref(false);
const globalStore = useGlobalStore();
const chatStore = useChatStore();
const tempMsgId = ref(0);

const sendMsgHandler = () => {
  console.log("触发消息发送处理");
  if (!inputValue.value?.trim().length || isSending.value) {
    console.log("消息无效：", inputValue.value);
    return;
  }
  isSending.value = true;
  send(MsgTypeEnum.TEXT, {
    content: inputValue.value,
  });
  console.log("发送消息：", inputValue.value);
};
const send = (msgType: MsgTypeEnum, body: any) => {
  Service.sendMsgUsingPost({
    roomId: globalStore.currentSession.roomId,
    msgType,
    body,
  })
    .then((res) => {
      if (res.code !== 0) {
        message.error("发送消息失败，请刷新重试！");
        return;
      } else if (res.data.message.type === MsgTypeEnum.TEXT) {
        chatStore.pushMsg(res.data);
        // await Service.msgReadReportUsingPost(res.data.message.roomId).then(
        //   (res1) => {
        //     chatStore.pushMsg(res.data);
        //   }
        // );
      } else {
        // 更新上传状态下的消息
        chatStore.updateMsg(tempMsgId.value, res.data);
      }
      if (inputRef.value) {
        inputRef.value.innerText = "";
      }
      chatStore.updateSessionLastActiveTime(globalStore.currentSession.roomId);
    })
    .finally(() => {
      isSending.value = false;
      // TODO 输入框重新获取焦点

      // 滚动到底部
      chatStore.chatListToBottomAction?.();
    });
};

// 输入文本触发
const onInputText = () => {
  if (inputRef.value) {
    const text = inputRef.value?.innerText;
    inputValue.value = text;
  }
};
</script>
