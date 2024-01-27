<!--
* @SendBar
* @author Li zhiwei
* @date 2023/12/20 16:19
-->

<template>
  <div ref="sendBarRef" id="SendBar">
    <div class="icons">
      <a-popover trigger="click" position="tl">
        <!--        <icon-face-smile-fill class="icon" :size="30" style="color: #ff9500" />-->
        <svg-icon class="icon" color="blue" icon="emoji" size="35px" />
        <template #content>
          <div class="emoji-div">
            <div class="emoji-content">
              <ul class="emoji-list">
                <li
                  class="emoji-item"
                  v-for="(emoji, index) of emojisConstant"
                  :key="index"
                  @click="insertEmoji(emoji)"
                >
                  {{ emoji }}
                </li>
              </ul>
            </div>
            <div class="emoji-foot">
              <icon-face-smile-fill
                class="icon"
                :size="30"
                style="color: #ff9500"
              />
            </div>
          </div>
        </template>
      </a-popover>
      <!--      <icon-folder-->
      <!--        @click="openFileSelector"-->
      <!--        class="icon"-->
      <!--        :size="30"-->
      <!--        style="color: #e9d28a"-->
      <!--      />-->
      <!--      <icon-voice class="icon" :size="30" style="color: cornflowerblue" />-->
      <svg-icon
        @click="openFileSelector"
        class="icon"
        icon="picture"
        size="35px"
      />
    </div>
    <div
      ref="inputRef"
      class="input"
      :contenteditable="true"
      @input="onInputText"
      autofocus
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
      border-radius: 5px;

      &:hover {
        background-color: #d0d0d0;
      }
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

.emoji-div {
  display: flex;
  flex-direction: column;
  width: 300px;

  .emoji-foot {
    display: flex;
    align-items: center;
    padding: 4px 6px 0;
    margin-top: 4px;
    border-top: 1px solid #7d7979;
  }

  .emoji-content {
    display: flex;
    // 换行
    flex-wrap: wrap;
    align-content: flex-start;
    height: 220px;
    overflow-y: auto;
  }

  .emoji-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    word-break: break-word;
    list-style-type: none;
  }

  .emoji-item {
    width: 28px;
    height: 28px;
    padding-top: 4px;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #979797;
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
import { reactive, ref } from "vue";
import { MsgTypeEnum } from "@/enume";
import { Service } from "../../../../../generated";
import { useGlobalStore } from "@/store/global";
import message from "@arco-design/web-vue/es/message";
import { useChatStore } from "@/store/chat";
import { emojisConstant } from "@/service/constant/emojisConstant";
import { useFileDialog } from "@vueuse/core";
import { useUpload } from "@/hooks/useUpload";
import { generateBody } from "@/utils/multimediaUtils";
import { useMockMessage } from "@/hooks/useMockMessage";
import SvgIcon from "@/icons/SvgIcon";

const sendBarRef = ref<HTMLElement | null>();
const inputRef = ref<HTMLElement>();
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
        // alert("更新消息：" + tempMsgId.value);
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
// 插入表情
const insertEmoji = (emoji: string) => {
  if (inputRef.value) {
    inputValue.value = inputRef.value.innerText =
      inputRef.value.innerText + emoji;
  }

  // const input = inputRef.value.input;
  // const editRange = inputRef.value?.range as {
  //   range: Range;
  //   selection: Selection;
  // };
  // if (!input || !editRange) {
  //   console.log("到了！", input, editRange);
  //   return;
  // }
  // insertInputText({ content: emoji, ...editRange });
  // inputValue.value = input.innerText;
};

const nowMsgType = ref<MsgTypeEnum>(MsgTypeEnum.IMG);
const options = reactive({ multiple: false, accept: ".jpg,.png" });
const { open, reset, onChange } = useFileDialog(options);
const mockMessage = useMockMessage();
// 文件上传状态变动回调
const useUploadChange = (status: any) => {
  // alert("调用了useUploadChange");
  if (status === "success") {
    if (!fileInfo.value) {
      return;
    }
    const { body, type } = generateBody(fileInfo.value, nowMsgType.value);
    send(type, body);
  }
  reset();
};
// 开始上传文件时（前）触发调用
const onStartFunction = () => {
  // alert("调用了onStartFunction");
  if (!fileInfo.value) {
    return;
  }
  const { type, body } = generateBody(fileInfo.value, nowMsgType.value, true);
  const res = mockMessage.mockMessage(type, body);
  tempMsgId.value = res.message.id;
  console.log("pushMsg:", res);
  chatStore.pushMsg(res);
  chatStore.chatListToBottomAction?.();
};
const {
  handleFileInUploading,
  uploadFile,
  isUploading,
  fileInfo,
  onStart,
  onChange: uploadOnChange,
} = useUpload();
onStart.on(onStartFunction);
uploadOnChange(useUploadChange);

const openFileSelector = (fileType: string, isEmoji = false) => {
  if (fileType === "img") {
    nowMsgType.value = MsgTypeEnum.IMG;
    options.accept = ".jpg,.png,.gif,.jpeg,.webp";
  }
  open();
};
// 选中文件后调用
const selectAndUploadFile = async (files?: FileList | null) => {
  console.log("files:", files);
  if (!files?.length) {
    return;
  }
  const file = files[0];
  if (nowMsgType.value === MsgTypeEnum.IMG) {
    if (!file.type.includes("image")) {
      return message.error("请选择图片文件");
    }
  }
  await uploadFile(file, "chat");
  console.log("上传成功了out", fileInfo.value);
};
onChange(selectAndUploadFile);
</script>
