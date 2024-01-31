<!--
* @SessionList
* @author Li zhiwei
* @date 2023/12/20 11:46
-->

<template>
  <div class="session-list-parent">
    <div class="session-search-parent">
      <a-input-search
        v-model="queryKey"
        @input="onQueryInputChange"
        class="session-search"
        placeholder="快速查找"
        allow-clear
      />
    </div>
    <ul id="SessionList" ref="scrollElement">
      <li
        v-for="(item, index) in queryKey.length === 0
          ? chatStore.sessionList
          : tempSessionList"
        :key="index"
        @click="onSelectedSession(item.roomId, item.type)"
      >
        <a-popover
          v-model="popoverVisible"
          position="bottom"
          trigger="contextMenu"
        >
          <div
            :class="[
              'session-item',
              { active: currentSession.roomId.toString() === item.roomId },
            ]"
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
              <span v-if="item.activeTime">{{
                formatTimestamp(item.activeTime)
              }}</span>
            </div>
          </div>
          <template #content>
            <a-button type="text" @click="onRemoveSession(item.roomId)"
              >移除
            </a-button>
          </template>
        </a-popover>
      </li>
    </ul>
    <MyContextMenu />
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
            font-size: var(--font-size-chat-list-name);
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
            font-size: var(--font-size-chat-list-message);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            //word-break: break-word;
            margin-top: 5px;
          }
        }
      }

      .time {
        font-size: var(--font-size-chat-list-time);
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
import { reactive } from "vue";
import { SessionItem } from "@/service/types";
import { Service } from "../../../../../generated";
import message from "@arco-design/web-vue/es/message";
import { RoomTypeEnum } from "@/enume";
import MyContextMenu from "@/components/chat/chat/sessionlist/ContextMenu/MyContextMenu.vue";
import _ from "lodash";

const chatStore = useChatStore();
const globalStore = useGlobalStore();
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
  alert("触发");
  chatStore.getSessionList();
};
// 选中会话
const onSelectedSession = (roomId: number, type: number) => {
  globalStore.currentSession.roomId = roomId;
  globalStore.currentSession.type = type;
};

// 会话搜索框
const queryKey = ref<string>("");
// 临时会话列表 用于存储搜索结果
let tempSessionList = reactive<SessionItem[]>([]);
const onQueryInputChange = () => {
  if (queryKey.value.length === 0) {
    tempSessionList.splice(0, tempSessionList.length);
    return;
  }
  tempSessionList = chatStore.sessionList.filter((item) =>
    item.name.includes(queryKey.value)
  );
};

const popoverVisible = ref(true);
// 移除会话
const onRemoveSession = async (roomId: number) => {
  // 总群不能移除
  if (Number(roomId) === 1) {
    message.error("总群会话无法移除");
    return;
  }
  const res = await Service.removeSessionUsingPost({ roomId });
  if (res.code !== 0) {
    message.error(res.msg);
    return;
  }
  // 查找目标会话index
  const index = chatStore.sessionList.findIndex(
    (item) => item.roomId.toString() === roomId.toString()
  );
  if (globalStore.currentSession.roomId.toString() === roomId.toString()) {
    globalStore.currentSession.roomId = 1;
    globalStore.currentSession.type = RoomTypeEnum.GROUP;
  }
  chatStore.sessionList.splice(index, 1);
  message.success("移除成功");
};

/**
 * 通过监听滚动事件 实现分页加载会话记录
 */
let scrollElement = ref<HTMLElement>();
const handleScroll = () => {
  if (scrollElement.value) {
    const { scrollTop, scrollHeight, clientHeight } = scrollElement.value;
    if (scrollTop + clientHeight + 100 >= scrollHeight) {
      chatStore.getSessionList();
    }
  }
};
const scrollThrottle = _.throttle(handleScroll, 100); //引入lodash功能
onMounted(() => {
  scrollElement.value?.addEventListener("scroll", scrollThrottle);
});
</script>
