<!--
* @AvatarPopoverOld
* @author Li zhiwei
* @date 2024/1/26 11:01
-->

<template>
  <div id="AvatarPopover">
    <a-popover
      trigger="contextMenu"
      :title="nice"
      style="width: 300px !important; border-radius: 10px"
    >
      <slot name="target"></slot>
      <template #content>
        <!--        <slot name="mycontent"></slot>-->
        <div class="person-info">
          <div class="person-info-avatar">
            <a-avatar :size="80">
              <img alt="avatar" :src="userAvatar" />
            </a-avatar>
          </div>
          <div class="person-info-name">
            <span class="person-info-name-font">{{ userName }}</span>
          </div>
          <div class="person-info-sign">
            <span class="person-info-sign-font">{{ sign }}</span>
          </div>
          <a-divider />
          <div class="person-info-ops">
            <!--            <a-button type="primary">关注Ta</a-button>-->
            <a-button
              type="primary"
              status="warning"
              v-if="isFriend && !isCurrent"
              @click="onSendMessage"
              >发消息
            </a-button>
            <a-button
              type="primary"
              status="warning"
              @click="onApplyFriend"
              v-else-if="!isCurrent"
              >加好友
            </a-button>
            <a-button
              type="primary"
              status="warning"
              @click="onRemoveMember"
              v-if="isLeader && !isCurrent"
              >移出群聊
            </a-button>
          </div>
        </div>
      </template>
    </a-popover>
  </div>
  <AddFriendModal :userId="userId" v-model:visible="visible" />
</template>

<style lang="scss">
#AvatarPopover {
}

.person-info {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-avatar {
    text-align: center !important;
  }

  &-name {
    &-font {
      font-family: "楷体", KaiTi, serif;
      font-weight: bold;
      font-size: 20px;
    }
  }

  &-ops {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 15px;
  }
}

.arco-popover-popup-content {
  border-radius: 20px !important;
}
</style>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import AddFriendModal from "@/components/chat/AddFriendModal/AddFriendModal.vue";
import message from "@arco-design/web-vue/es/message";
import { useChatStore } from "@/store/chat";
import { useGlobalStore } from "@/store/global";
import { useGroupStore } from "@/store/group";
import { Service } from "../../../generated";
import { useUserStore } from "@/store/user";

const chatStore = useChatStore();
const globalStore = useGlobalStore();
const groupStore = useGroupStore();
const userStore = useUserStore();
const props = defineProps({
  userName: {
    type: String,
  },
  userAvatar: {
    type: String,
  },
  sign: {
    type: String,
  },
  isFriend: {
    type: Boolean,
    default: false, // 设置默认值为 false
  },
  isFan: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Number,
    default: 0,
  },
  isLeader: {
    type: Boolean,
    default: false,
  },
});

// const curUserId = ref<number>();
// 右键菜单选择处理器
const onApplyFriend = () => {
  visible.value = true;
};
const visible = ref(false);

// 点击“发消息”
const onSendMessage = () => {
  const session = chatStore.sessionList.find(
    (cur) => cur.name === props.userName
  );
  if (session) {
    globalStore.currentSession.roomId = session.roomId;
    globalStore.currentSession.type = session.type;
  } else {
    // TODO 应该要向后端查询
    Service.updateOrCreateContactUsingPost({ friendId: props.userId }).then(
      (res) => {
        if (res.code !== 0) {
          message.error(res.msg);
          return;
        }
        chatStore.sessionList.push(res.data);
        chatStore.sortAndUniqueSessionList();
        globalStore.currentSession.roomId = res.data.roomId;
        globalStore.currentSession.type = res.data.type;
      }
    );
    // message.error("找不到当前联系人对应的会话信息");
  }
  chatStore.navFlag = 0;
};

// 移出群聊
const onRemoveMember = async () => {
  const res = await Service.removeGroupMemberUsingPost({
    roomId: groupStore.groupInfo.roomId,
    userId: props.userId,
  });
  if (res.code !== 0) {
    message.error(res.msg);
    return;
  }
  visible.value = false;
  message.success('成功移除"' + props.userName + '"');
  groupStore.getGroupMemberList(true);
  groupStore.getGroupDetail();
};

// 选中的是否是当前用户自己
const isCurrent = props.userId.toString() === userStore.loginUser.id.toString();
</script>
