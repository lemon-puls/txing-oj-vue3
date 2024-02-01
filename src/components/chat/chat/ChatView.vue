<!--
* @ChatView
* @author Li zhiwei
* @date 2023/12/20 10:08
-->

<template>
  <div id="ChatView">
    <!--    <a-row class="grid-demo">-->
    <!--      &lt;!&ndash;      <a-col style="background-color: yellow" :span="1">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <div>6 - 25%</div>&ndash;&gt;-->
    <!--      &lt;!&ndash;      </a-col>&ndash;&gt;-->
    <!--      <a-col :span="6">-->
    <!--        <SessionList />-->
    <!--      </a-col>-->
    <!--      <a-col style="background-color: blue" :span="14">-->
    <!--        <div>6 - 25%</div>-->
    <!--      </a-col>-->
    <!--      <a-col style="background-color: black" :span="4">-->
    <!--        <div>6 - 25%</div>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <a-split
      :style="{
        height: '100%',
        width: '100%',
      }"
      :default-size="0.3"
      :min="0.25"
      :max="0.4"
    >
      <template #first>
        <SessionList />
      </template>
      <template #second>
        <a-split
          :style="{
            height: '100%',
            width: '100%',
          }"
          class="message-list-and-member-list"
          :default-size="0.8"
          :min="400"
        >
          <template #first>
            <div>
              <a-split
                direction="vertical"
                :style="{ height: '40vw' }"
                :default-size="0.7"
                :min="0.2"
                :max="0.9"
              >
                <template #first>
                  <MessageList></MessageList>
                </template>
                <template #second>
                  <SendBar />
                </template>
              </a-split>
            </div>
          </template>
          <template #second>
            <SessionMemberList
              v-if="
                !isLoading &&
                currentSessionItem &&
                currentSessionItem.type == RoomTypeEnum.GROUP
              "
            />
            <SessionFriendInfo
              v-if="
                currentSessionItem &&
                currentSessionItem.type == RoomTypeEnum.SINGLE
              "
            />
          </template>
        </a-split>
      </template>
    </a-split>
  </div>
</template>

<style lang="scss" scoped>
#ChatView {
  flex: 1;
  background-color: #f5f5f5;
  border-radius: 0px 20px 20px 0;
}
</style>

<script setup lang="ts">
import SessionList from "@/components/chat/chat/sessionlist/SessionList";
import SendBar from "@/components/chat/chat/sendbar/SendBar";
import VirtualListTest from "@/views/test/VirtualListTest";
import MessageItem from "@/components/chat/chat/messageList/MessageItem";
import {
  Message,
  MessageTypeEnum,
  MessageUser,
  TextMsgBody,
} from "@/service/types";
import { computed, ref } from "vue";
import MessageList from "@/components/chat/chat/messageList/MessageList.vue";
import SessionMemberList from "@/components/chat/chat/sessionmemberlist/SessionMemberList.vue";
import { useGroupStore } from "@/store/group";
import { useChatStore } from "@/store/chat";
import { RoomTypeEnum } from "@/enume";
import SessionFriendInfo from "@/components/chat/chat/sessionmemberlist/SessionFriendInfo.vue";

const groupStore = useGroupStore();
const chatStore = useChatStore();
const currentSessionItem = computed(() => chatStore.currentSessionItem);

const isLoading = computed(() => Number(groupStore.groupInfo.roomId) === -1);
// const isShowMessageList = computed(
//   () => currentSessionItem.value !== undefined
// );

// 测试数据
const msg = ref([
  {
    fromUser: {
      userId: 1,
      userName: "lemon",
      avatar:
        "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
    },
    message: {
      id: 1,
      roomId: 1,
      type: 0,
      body: {
        content: "今天刷算法题",
      },
      sendTime: 1234567890,
    },
    sendTime: "18:30",
    timeNode: "08:30",
    loading: false,
  },
  {
    fromUser: {
      userId: 1,
      userName: "lemon",
      avatar:
        "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
    },
    message: {
      id: 1,
      roomId: 1,
      type: 0,
      body: {
        content: "今天刷算法题",
      },
      sendTime: 1234567890,
    },
    sendTime: "18:30",
    timeNode: "08:30",
    loading: false,
  },
  {
    fromUser: {
      userId: 1,
      userName: "lemon",
      avatar:
        "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
    },
    message: {
      id: 1,
      roomId: 1,
      type: 0,
      body: {
        content: "今天刷算法题",
      },
      sendTime: 1234567890,
    },
    sendTime: "18:30",
    timeNode: "08:30",
    loading: false,
  },
  {
    fromUser: {
      userId: 1,
      userName: "lemon",
      avatar:
        "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
    },
    message: {
      id: 1,
      roomId: 1,
      type: 0,
      body: {
        content: "今天刷算法题",
      },
      sendTime: 1234567890,
    },
    sendTime: "18:30",
    timeNode: "08:30",
    loading: false,
  },
]);
</script>
