<!--
* @SessionList
* @author Li zhiwei
* @date 2023/12/20 11:46
-->

<template>
  <div class="session-list-parent">
    <div class="session-search-parent">
      <a-input-search class="session-search" placeholder="快速查找" />
    </div>
    <ul id="SessionList" v-infinite-scroll="load">
      <li
        v-for="(item, index) in chatStore.sessionList"
        :key="index"
        :class="[
          'session-item',
          { active: currentSession.roomId.toString() === item.roomId },
        ]"
        @click="onSelectedSession(item.roomId, item.type)"
      >
        <div class="avatar-name-message">
          <a-badge
            :count="item.unreadCount"
            :max-count="99"
            class="session-avatar"
          >
            <a-avatar>
              <img alt="avatar" :src="item.avatar" />
            </a-avatar>
          </a-badge>
          <div class="name-and-message">
            <div class="name">
              <span>{{ item.name }}</span>
            </div>
            <div class="message">
              <!--              {{ item.userName }}: -->
              {{ item.lastMessage }}
            </div>
          </div>
        </div>

        <div class="time">
          <span>{{ formatTimestamp(item.activeTime) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.session-list-parent {
  display: flex;
  flex-direction: column;
  height: 100%;

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
    flex: 1;
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
        justify-content: space-between;
        align-items: center;
        column-gap: 15px;
        max-width: 70%;

        .session-avatar {
          margin-left: 5px;

          .arco-badge-number {
            //width: 40px;
          }
        }

        .name-and-message {
          margin-left: 5px;
          //max-width: 50%;

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
        //width: auto;
        max-width: 30%;
        color: #979797;
        margin-left: 10px;
        margin-right: 5px;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useChatStore } from "@/store/chat";
import { formatTimestamp } from "@/utils/computeTime";
import { useGlobalStore } from "@/store/global";

const chatStore = useChatStore();
const globalStore = useGlobalStore();
// onMounted(() => {
//   chatStore.getSessionList();
//   console.log("sessionList:", chatStore.sessionList);
// });
// 当前选中会话
const currentSession = computed(() => globalStore.currentSession);

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
]);
// 加载会话
const load = () => {
  chatStore.getSessionList();
};
// 选中会话
const onSelectedSession = (roomId: number, type: number) => {
  globalStore.currentSession.roomId = roomId;
  globalStore.currentSession.type = type;
};
</script>
