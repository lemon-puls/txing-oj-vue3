<!--
* @ContactDetail
* @author Li zhiwei
* @date 2023/12/21 19:48
-->

<template>
  <div id="ContactDetail" v-if="isReady">
    <a-avatar :size="200" class="avatar">
      <img alt="avatar" :src="user.userAvatar" />
    </a-avatar>
    <div class="username-parent">
      <span class="username">{{ user.userName }}</span>
    </div>
    <div>
      <span class="sign">Ta说: {{ user.personSign }}</span>
    </div>
    <a-divider />
    <div class="ops">
      <a-button
        v-if="isFriend"
        type="primary"
        class="send-msg"
        shape="round"
        @click="sendMessaheForFriend"
        >发消息
      </a-button>
      <a-popconfirm
        style="z-index: 12000"
        content="删除后不可恢复 确认要删除?"
        @ok="onDeleteFriend(item.userId)"
      >
        <a-button
          v-if="isFriend"
          type="primary"
          class="delete-friend"
          shape="round"
          status="danger"
          >删除联系人
        </a-button>
      </a-popconfirm>
      <a-button
        v-if="!isFriend && item.status === 0"
        style="width: 120px"
        type="primary"
        shape="round"
        status="warning"
        @click="contactStore.onAcceptFriendApply(item.id)"
        >同意申请
      </a-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#ContactDetail {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .username-parent {
    margin: 15px auto;

    .username {
      font-size: 25px;
      font-weight: bold;
    }
  }

  .ops {
    .send-msg {
      margin-right: 10px;
      width: 120px;
    }

    .delete-friend {
      width: 120px;
    }
  }
}
</style>

<script setup lang="ts">
import { computed, defineProps, onBeforeMount, ref } from "vue";
import { useGlobalStore } from "@/store/global";
import { useCacheStore } from "@/store/cache";
import { useChatStore } from "@/store/chat";
import message from "@arco-design/web-vue/es/message";
import { useContactStore } from "@/store/contact";

const globalStore = useGlobalStore();
const cacheStore = useCacheStore();
const chatStore = useChatStore();
const contactStore = useContactStore();

const item = computed(() => globalStore.currentSelectedContact);
const user = computed(() =>
  item.value ? cacheStore.cachedUserList[item.value.userId] : null
);
const isFriend = computed(() => {
  let res = false;
  if (item.value) {
    if (!("status" in item.value)) {
      res = true;
    } else if (item.value.status === 0) {
      res = false;
    } else {
      const contact = contactStore.contactList.find(
        (cur) => cur.userId.toString() === item.value?.userId.toString()
      );
      res = contact !== undefined && contact !== null;
    }
  }
  return res;
});
const isReady = computed(
  () => globalStore.currentSelectedContact && user.value !== undefined
);

// 点击“发消息”
const sendMessaheForFriend = () => {
  const session = chatStore.sessionList.find(
    (cur) => cur.name === user.value?.userName
  );
  if (session) {
    globalStore.currentSession.roomId = session.roomId;
    globalStore.currentSession.type = session.type;
    chatStore.navFlag = 0;
  } else {
    // TODO 应该要向后端查询
    message.error("找不到当前联系人对应的会话信息");
  }
};

// 删除好友
const onDeleteFriend = async (userId: number) => {
  await contactStore.onDeleteContact(userId);
  message.error("删除成功");
};
</script>
