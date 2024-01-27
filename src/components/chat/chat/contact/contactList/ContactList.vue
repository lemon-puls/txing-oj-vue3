<!--
* @ContactList
* @author Li zhiwei
* @date 2023/12/21 19:48
-->

<template>
  <div id="ContactList">
    <div class="create-group">
      <a-button
        @click="clickCreateGroup"
        class="create-group-button"
        type="outline"
        >创建群聊
      </a-button>
    </div>
    <a-divider style="margin: 0; padding: 0" />
    <a-collapse
      class="side-collapse"
      :default-active-key="['1']"
      :bordered="false"
    >
      <a-collapse-item header="新的朋友" key="1">
        <FriendRequestItem
          v-for="(item, index) in requestList"
          :key="index"
          :item="item"
          @xxx="onNodeClick"
        />
      </a-collapse-item>
      <a-collapse-item class="friend-list" header="好友列表" key="2">
        <FriendItem
          v-for="(item, index) in friendList"
          :key="index"
          :item="item"
          @myClick="onNodeClick"
        />
      </a-collapse-item>
    </a-collapse>
  </div>

  <a-modal
    style="z-index: 10500"
    v-model:visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title>创建群聊</template>
    <div class="create-group-modal">
      <div class="group-name">
        <span>群聊名称：</span>
        <a-input
          :style="{ width: '60%' }"
          v-model="groupName"
          placeholder="请输入群聊名称"
          allow-clear
        />
      </div>

      <a-transfer :data="data" v-model="selectedMemberIds">
        <template
          #source-title="{
            // countTotal,
            // countSelected,
            checked,
            indeterminate,
            onSelectAllChange,
          }"
        >
          <div :style="styleHeader">
            好友列表
            <a-checkbox
              :model-value="checked"
              :indeterminate="indeterminate"
              @change="onSelectAllChange"
            />
          </div>
        </template>
        <!--        <template #source="{ data }">-->
        <!--          <ul>-->
        <!--            <li v-for="item in data" :key="item.value">{{ item.label }}</li>-->
        <!--          </ul>-->
        <!--        </template>-->

        <template
          #target-title="{
            // countTotal, countSelected,
            onClear,
          }"
        >
          <div :style="styleHeader">
            已选择
            <IconDelete @click="onClear" />
          </div>
        </template>

        <template #item="{ label }">
          <a-avatar :size="30">
            <img alt="avatar" :src="label.split('--')[1]" />
          </a-avatar>
          <span style="margin-left: 10px; width: 100%">{{
            label.split("--")[0].length > 6
              ? label.slice(0, 6) + "..."
              : label.split("--")[0]
          }}</span>
        </template>
      </a-transfer>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
#ContactList {
  display: flex;
  flex-direction: column;
  height: 100%;

  .create-group {
    width: 100%;
    text-align: right;

    .create-group-button {
      margin: 10px 10px;
      border-radius: 20px;
    }
  }

  .side-collapse {
    overflow-y: auto;
  }
}

.create-group-modal {
  .group-name {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import FriendItem from "@/components/chat/chat/contact/contactList/friendItem/FriendItem.vue";
import { IconDelete } from "@arco-design/web-vue/es/icon";
import { useContactStore } from "@/store/contact";
import { ContactItem, FriendApplyItem } from "@/service/types";
import { useGlobalStore } from "@/store/global";
import FriendRequestItem from "@/components/chat/chat/contact/contactList/friendRequestItem/FriendRequestItem.vue";
import { useCacheStore } from "@/store/cache";
import { Service } from "../../../../../../generated";
import message from "@arco-design/web-vue/es/message";
import infiniteScroll from "vue-infinite-scroll";
import _ from "lodash";

const contactStore = useContactStore();
const globalStore = useGlobalStore();
const cacheStore = useCacheStore();
const requestList = computed(() => contactStore.friendApplyList);
const friendList = computed(() => contactStore.contactList);

onMounted(() => {
  handleClick();
});

const onNodeClick = (item: FriendApplyItem | ContactItem) => {
  globalStore.currentSelectedContact = item;
};

const requestList1 = ref([
  {
    avatar:
      "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
    userName: "明天会更好",
    status: 0,
    time: "13:11",
    content: "哥哥 我们可以加个微信吗",
  },
]);

// 创建群聊对话框
const visible = ref(false);
const clickCreateGroup = () => {
  // TODO 待优化 采用分页加载的方式会更好 而不是一次性加载所有的联系人信息
  contactStore.getContactList(false, 10000);
  visible.value = true;
};
const handleOk = async () => {
  const res = await Service.addGroupUsingPost({
    name: groupName.value,
    userIdList: selectedMemberIds.value,
  });
  if (res.code !== 0) {
    message.error("创建失败：" + res.msg);
    return;
  }
  message.success('群聊"' + groupName.value + '"成功创建');
  visible.value = false;
};
const handleCancel = () => {
  selectedMemberIds.value.splice(0);
  groupName.value = "";
  visible.value = false;
};
// 创建群聊 数据穿梭器
const cachedUserList = computed(() => cacheStore.cachedUserList);
const data = computed(() =>
  contactStore.contactList.map((item) => {
    const cacheUserVO = cachedUserList.value[Number(item.userId)];
    return {
      value: item.userId,
      label: cacheUserVO?.userName + "--" + cacheUserVO?.userAvatar,
    };
  })
);
const selectedMemberIds = ref<Array<number>>([]);
const styleHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: "8px",
};
// 群聊名称
const groupName = ref("");

/**
 * 通过监听滚动事件 实现分页加载好友申请记录 以及 联系人记录
 */
let targetElement: HTMLElement;
let friendListEl: HTMLElement;
const handleClick = async () => {
  targetElement = document.querySelector(".arco-collapse") as HTMLElement;
  friendListEl = document.querySelector(".friend-list") as HTMLElement;
  targetElement?.addEventListener("scroll", scrollThrottle);
};
const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = targetElement;
  if (scrollTop + clientHeight + 50 >= scrollHeight) {
    contactStore.getContactList();
  } else if (
    scrollTop + clientHeight + 100 >=
    scrollHeight - friendListEl.offsetHeight
  ) {
    // 触底，调用加载数据的方法
    contactStore.getFriendApplyList();
  }
};
const scrollThrottle = _.throttle(handleScroll, 100); //引入lodash功能
</script>
