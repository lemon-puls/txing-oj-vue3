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
    <a-collapse :default-active-key="['1']" :bordered="false">
      <a-collapse-item header="新的朋友" key="1">
        <FriendRequestItem
          v-for="(item, index) in requestList"
          :key="index"
          :item="item"
          @xxx="onNodeClick"
        />
      </a-collapse-item>
      <a-collapse-item header="好友列表" key="2">
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
          <span style="margin-left: 10px">{{
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
  .create-group {
    width: 100%;
    text-align: right;

    .create-group-button {
      margin: 10px 10px;
      border-radius: 20px;
    }
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
import { computed, ref } from "vue";
import FriendItem from "@/components/chat/chat/contact/contactList/friendItem/FriendItem.vue";
import { IconDelete } from "@arco-design/web-vue/es/icon";
import { useContactStore } from "@/store/contact";
import { ContactItem, FriendApplyItem } from "@/service/types";
import { useGlobalStore } from "@/store/global";
import FriendRequestItem from "@/components/chat/chat/contact/contactList/friendRequestItem/FriendRequestItem.vue";

const contactStore = useContactStore();
const globalStore = useGlobalStore();
const requestList = computed(() => contactStore.friendApplyList);
const friendList = computed(() => contactStore.contactList);

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
const friendList1 = ref([
  {
    avatar:
      "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
    userName: "ITLemonx",
  },
]);

// 创建群聊对话框
const visible = ref(false);
const clickCreateGroup = () => {
  visible.value = true;
};
const handleOk = () => {
  console.log(
    "selectedMemberIds:",
    selectedMemberIds.value,
    "groupName:",
    groupName.value
  );
  visible.value = false;
};
const handleCancel = () => {
  selectedMemberIds.value.splice(0);
  groupName.value = "";
  visible.value = false;
};
// 创建群聊 数据穿梭器
const data = Array(8)
  .fill(undefined)
  .map((_, index) => ({
    value: index,
    label:
      "明天会更好的吧--https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1726766580186198017/aic5Zy0z-42f3f796a326707a796ec644af28e1a1.jpg",
  }));
const selectedMemberIds = ref<Array<string>>([]);
const styleHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: "8px",
};
// 群聊名称
const groupName = ref();
</script>
