<!--
* @MessageList
* @author Li zhiwei
* @date 2023/12/21 14:33
-->

<template>
  <div id="MessageList">
    <div class="sesion-header">
      <span class="session-name" style="font-size: 1.5em"
        >相亲相爱一家人（18）</span
      >
    </div>
    <hr class="advier-line" />
    <VirtualList
      data-prop-name="messageShow"
      :data-key="getKey"
      :item="MessageItem"
      :size="20"
      :data="msgList"
      class="virtual-list"
    />
  </div>
</template>

<style scoped lang="scss">
#MessageList {
  display: flex;
  flex-direction: column;
  height: 100%;

  .sesion-header {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .session-name {
      margin-left: 10px;
    }
  }

  .advier-line {
    color: #d0d0d0;
    margin: 0 0;
    margin-bottom: 10px;
  }

  .virtual-list {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 99%;
    margin: 0 auto;
    /// / 100 % 时谷歌浏览器会出现无法滚动问题
    padding-right: 20px;
    padding-left: 20px;
    overflow-y: auto;
    flex: 1;
  }
}
</style>

<script setup lang="ts">
import VirtualList from "@/components/VirtualList";
import MessageItem from "@/components/chat/chat/messageList/MessageItem.vue";
// 测试数据
import { ref } from "vue";
import { MessageShow } from "@/service/types";

const msgList = ref([
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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

const getKey = (item: MessageShow) => item.message.id;
</script>
