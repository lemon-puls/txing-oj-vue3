<!--
* @SessionList
* @author Li zhiwei
* @date 2023/12/20 11:46
-->

<template>
  <div class="session-search-parent">
    <a-input-search class="session-search" placeholder="快速查找" />
  </div>
  <ul id="SessionList" v-infinite-scroll="load">
    <li
      v-for="(item, index) in sessionList"
      :key="index"
      :class="['session-item', { active: 1 === item.roomId }]"
    >
      <div class="avatar-name-message">
        <a-badge :count="10" :max-count="99" class="session-avatar">
          <a-avatar>
            <img
              alt="avatar"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            />
          </a-avatar>
        </a-badge>
        <div class="name-and-message">
          <div class="name">
            <span>{{ item.name }}</span>
          </div>
          <div class="message">{{ item.userName }}: {{ item.lastMessage }}</div>
        </div>
      </div>

      <span class="time">{{ item.lastMsgTime }}</span>
    </li>
  </ul>
</template>

<style lang="scss">
.session-search-parent {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .session-search {
    width: 80%;
    margin-top: 10px;
  }

  //.arco-input-append {
  //  background-color: rgba(0, 0, 0, 0);
  //}
}

#SessionList {
  padding-top: 10px;
  padding-left: 0;
  padding-right: 0;
  margin: 10px 10px;
  overflow-y: auto;

  .session-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 3px;
    padding-right: 3px;
    //background-color: #979797;
    //max-width: 300px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;

    &.active {
      background-color: #eeeeee;
    }

    //.session-avatar {
    //  width: 1vw;
    //  height: 1vw;
    //}
    .avatar-name-message {
      display: flex;
      flex-direction: row;
      align-items: center;
      column-gap: 15px;

      .session-avatar {
        .arco-badge-number {
          width: 40px;
        }
      }

      .name-and-message {
        .name {
          font-size: (1vw);
          width: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .message {
          color: #979797;
          width: 100%;
          font-size: (1vw * 0.8);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          text-overflow: ellipsis;
          overflow: hidden;
          //word-break: break-word;
        }
      }
    }

    .time {
      font-size: (1vw * 0.8);
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      width: auto;
      max-width: 40%;
      color: #979797;
    }
  }
}
</style>

<script setup lang="ts">
import { computed, ref } from "vue";
import { RoomTypeEnum, SessionItem } from "@/service/types";
// 会话数据
const sessionList = ref([
  {
    lastMsgTime: "2023年10月01日",
    avatar:
      "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
    name: "相亲相爱一家人",
    roomId: 1,
    lastMessage: "家人们 烧烤不",
    type: 0,
    unreadCount: 10,
    userName: "lemon",
  },
  {
    lastMsgTime: "2023年10月02日",
    avatar:
      "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
    name: "相亲相爱一家人",
    roomId: 2,
    lastMessage: "家人们 烧烤不",
    type: 0,
    unreadCount: 10,
    userName: "lemon",
  },
  {
    lastMsgTime: "15:44",
    avatar:
      "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
    name: "相亲相爱一家人",
    roomId: 3,
    lastMessage: "家人们 烧烤不",
    type: 0,
    unreadCount: 10,
    userName: "lemon",
  },
  {
    lastMsgTime: "2023年10月04日",
    avatar:
      "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
    name: "相亲相爱一家人",
    roomId: 4,
    lastMessage: "家人们 烧烤不",
    type: 0,
    unreadCount: 10,
    userName: "lemon",
  },
  {
    lastMsgTime: "2023年10月05日",
    avatar:
      "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
    name: "相亲相爱一家人",
    roomId: 5,
    lastMessage: "家人们 烧烤不",
    type: 0,
    unreadCount: 10,
    userName: "lemon",
  },
  {
    lastMsgTime: "2023年10月06日",
    avatar:
      "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
    name: "相亲相爱一家人",
    roomId: 6,
    lastMessage: "家人们 烧烤不",
    type: 0,
    unreadCount: 10,
    userName: "lemon",
  },
  {
    lastMsgTime: "2023年10月07日",
    avatar:
      "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
    name: "相亲相爱一家人",
    roomId: 7,
    lastMessage: "家人们 烧烤不",
    type: 0,
    unreadCount: 10,
    userName: "lemon",
  },
]);
// 加载会话
const load = () => {
  console.log("加载会话数据");
};
</script>
