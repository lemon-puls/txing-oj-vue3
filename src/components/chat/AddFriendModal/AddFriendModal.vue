<!--
* @AddFriendModal
* @author Li zhiwei
* @date 2024/1/22 11:31
-->

<template>
  <div id="AddFriendModal">
    <a-modal
      v-model:visible="visibleBackup"
      title="添加好友"
      style="z-index: 10002"
      :footer="false"
      :closable="false"
    >
      <div class="modal-input-parent">
        <a-textarea
          class="text-input"
          v-model="content"
          placeholder="介绍一下自己吧！"
          allow-clear
        />
      </div>

      <div class="modal-button">
        <a-button type="primary" shape="round" @click="handleSend"
          >发送
        </a-button>
        <a-button shape="round" @click="handleCancel">取消</a-button>
      </div>
    </a-modal>
  </div>
</template>

<style lang="scss">
#AddFriendModal {
}

.modal-button {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 15px;
}

.modal-input-parent {
  .text-input {
    width: 80%;
  }

  text-align: center;
  margin-bottom: 20px;
}
</style>

<script setup lang="ts">
import { reactive, ref, defineProps, defineEmits, computed, inject } from "vue";
import { UserApplyControllerService } from "../../../../generated";
import message from "@arco-design/web-vue/es/message";

let props = defineProps(["visible", "userId"]);
let $emit = defineEmits(["update:visible"]);
const visibleBackup = computed(() => props.visible);
const content = ref("");
const handleSend = async () => {
  if (!props.userId || !content.value) {
    message.error("参数非法 无法申请");
    return;
  }
  const res = await UserApplyControllerService.applyFriendUsingPost({
    msg: content.value,
    targetUserId: props.userId,
  });
  if (res.code !== 0) {
    message.error("申请失败：" + res.msg);
    return;
  }
  $emit("update:visible", false);
  message.success("申请成功 请等待对方通过！");
};
const handleCancel = () => {
  $emit("update:visible", false);
};
</script>
