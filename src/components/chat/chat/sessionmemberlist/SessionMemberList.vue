<!--
* @SessionMemberList
* @author Li zhiwei
* @date 2023/12/21 17:48
-->

<template>
  <div id="SessionMemberList">
    <div class="session-search-parent">
      <a-input-search
        class="session-search"
        placeholder="快速查找"
        allow-clear
        v-model="queryKey"
        @input="onQueryInputChange"
      />
    </div>
    <div class="online-count-parent">
      <span class="online-count"
        >在线人数:
        <span style="color: red">{{
          groupStore.groupInfo?.onlineCount
        }}</span></span
      >
    </div>
    <ul class="member-list">
      <li
        class="member-list-item"
        v-for="(item, index) in queryKey.length === 0
          ? groupStore.userList
          : tempMemberList"
        :key="index"
      >
        <!--        <a-dropdown-->
        <!--          style="z-index: 14000"-->
        <!--          trigger="contextMenu"-->
        <!--          @select="handleSelect"-->
        <!--        >-->
        <AvatarPopover
          :user-name="cachedUserList[item.userId]?.userName"
          :user-avatar="cachedUserList[item.userId]?.userAvatar"
          :sign="cachedUserList[item.userId]?.personSign"
          :is-friend="isFriend(item)"
          :user-id="Number(item.userId)"
          :is-leader="isLeader"
        >
          <template #target>
            <div>
              <a-badge
                :count="6"
                dot
                :dotStyle="{ width: '10px', height: '10px' }"
                :offset="[-3, 3]"
                :class="[{ memberOnline: item.activeStatus === 1 }]"
              >
                <a-avatar>
                  <img
                    alt="avatar"
                    :src="cachedUserList[item.userId]?.userAvatar"
                  />
                </a-avatar>
              </a-badge>
              <span class="user-name">{{
                cachedUserList[item.userId]?.userName
              }}</span>
            </div>
          </template>
        </AvatarPopover>

        <!--        <template #content>-->
        <!--          <a-doption-->
        <!--            v-if="!isFriend(item)"-->
        <!--            :value="{ item, value: 'friendApply' }"-->
        <!--            >加好友-->
        <!--          </a-doption>-->
        <!--          <a-doption-->
        <!--            v-if="isFriend(item)"-->
        <!--            :value="{ item, value: 'sendMessage' }"-->
        <!--            >发消息-->
        <!--          </a-doption>-->
        <!--        </template>-->
        <!--        </a-dropdown>-->
      </li>
    </ul>
    <a-divider />
    <div class="group-name">
      <div class="group-name-label">
        <span class="group-name-label-span">群聊名称</span>
      </div>
      <div class="group-name-content">
        <span class="group-name-content-span">{{ groupInfo.groupName }}</span>
        <!--        <svg-icon icon="modify" size="20px"></svg-icon>-->
      </div>
    </div>
    <a-divider />
    <div class="group-ops">
      <a-popconfirm
        v-if="
          !groupInfo.forbiddenOrNot &&
          isLeader &&
          Number(groupInfo.roomId) !== 1
        "
        content="确定要解散该群聊吗?"
        @ok="onRemoveMember"
      >
        <span class="group-ops-span">解散群聊</span>
      </a-popconfirm>
      <a-popconfirm
        v-else-if="
          !groupInfo.forbiddenOrNot &&
          groupInfo.memberOrNot &&
          Number(groupInfo.roomId) !== 1
        "
        content="确定要推出该群聊吗?"
        @ok="onRemoveMember"
      >
        <span class="group-ops-span">退出群聊</span>
      </a-popconfirm>
    </div>
  </div>

  <!--  <AddFriendModal :userId="curUserId" v-model:visible="visible" />-->
</template>

<style lang="scss">
#SessionMemberList {
  border-radius: 0px 20px 20px 0;

  .session-search-parent {
    display: flex;
    flex-direction: row;
    justify-content: center;

    .session-search {
      width: 80%;
      margin: 10px auto;
    }
  }

  .online-count-parent {
    .online-count {
      float: right;
      margin-right: 20px;
    }
  }

  .member-list {
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    flex-wrap: wrap;
    padding: 0;
    margin-left: 10px;
    margin-top: 30px;
    row-gap: 10px;
    column-gap: 20px;
    max-height: 50vh;
    overflow-y: auto;

    &-item {
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .user-name {
        max-width: 45px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
    }

    .memberOnline {
      .arco-badge-dot {
        background-color: green;
      }
    }
  }

  .group-name {
    &-label {
      &-span {
        font-size: 16px;
        margin-left: 10px;
      }
    }

    &-content {
      padding: 10px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-span {
        font-size: 14px;
      }
    }
  }

  .group-ops {
    text-align: center;

    &-span {
      font-size: 18px;
      color: #ff7300;
      cursor: default;
    }
  }
}
</style>

<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { useGroupStore } from "@/store/group";
import { useCacheStore } from "@/store/cache";
import { useContactStore } from "@/store/contact";
import { useUserStore } from "@/store/user";
import AddFriendModal from "@/components/chat/AddFriendModal/AddFriendModal.vue";
import message from "@arco-design/web-vue/es/message";
import AvatarPopover from "@/components/user/AvatarPopover.vue";
import SvgIcon from "@/icons/SvgIcon";
import { GroupMemberRoleEnum } from "@/enume";
import { Service } from "../../../../../generated";
import { reactive } from "vue";
import { SessionItem, UserItem } from "@/service/types";

const groupStore = useGroupStore();
const cacheStore = useCacheStore();
const contactStore = useContactStore();
const userStore = useUserStore();
const cachedUserList = computed(() => cacheStore.cachedUserList);

// 是否是群主
const isLeader = computed(
  () => groupInfo.value.role === GroupMemberRoleEnum.LEADER
);
// 是否是该群聊成员
// const isMemeber = computed(() => {
//   groupStore.
// })

const isFriend = (item: any) => {
  return (
    contactStore.contactList.find(
      (cur) => cur.userId.toString() === item.userId.toString()
    ) !== undefined ||
    item.userId.toString() === userStore.loginUser.id.toString()
  );
};
const curUserId = ref<number>();
// 右键菜单选择处理器
const handleSelect = (val: { item: any; value: string }) => {
  switch (val.value) {
    case "friendApply": {
      curUserId.value = val.item.userId;
      visible.value = true;
    }
  }
};
const visible = ref(false);

// 处理右击事件
// const handleRightClick = (e: MouseEvent) => {
//   alert("右击");
//   isShowRightClickModal.value = true;
// };

// const userList = ref([
//   {
//     id: 1,
//     avatar:
//       "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
//     isOnline: 1,
//     userName: "lemon",
//   },
// ]);
const groupInfo = computed(() => groupStore.groupInfo);
// 移除成员处理
const onRemoveMember = async () => {
  const res = await Service.removeGroupMemberUsingPost({
    roomId: groupInfo.value.roomId,
    userId: userStore.loginUser.id,
  });
  if (res.code !== 0) {
    message.error(res.msg);
    return;
  }
  message.success("操作成功");
  groupStore.getGroupMemberList(true);
  groupStore.getGroupDetail();
};

// 会话搜索框
const queryKey = ref<string>("");
// 临时会话列表 用于存储搜索结果
let tempMemberList = reactive<UserItem[]>([]);
const onQueryInputChange = () => {
  if (queryKey.value.length === 0) {
    tempMemberList.splice(0, tempMemberList.length);
    return;
  }
  tempMemberList = groupStore.userList.filter((item) => {
    if (item.userId) {
      const userItem = cachedUserList.value[item.userId];
      return userItem?.userName?.includes(queryKey.value);
    } else {
      return false;
    }
  });
};
</script>
