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
    <div ref="inputRef" class="input" :contenteditable="true"></div>
    <div class="sendMsg">
      <a-button
        class="sendMsgButton"
        :long="false"
        type="outline"
        status="success"
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

const sendBarRef = ref<HTMLElement | null>();
const inputRef = ref<HTMLElement | null>();
</script>
