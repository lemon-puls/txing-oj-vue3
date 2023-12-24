<!--
* @ContactDetail
* @author Li zhiwei
* @date 2023/12/21 19:48
-->

<template>
  <div id="ContactDetail">
    <a-avatar :size="200" class="avatar">
      <img alt="avatar" :src="data.avatar" />
    </a-avatar>
    <div class="username-parent">
      <span class="username">{{ data.userName }}</span>
    </div>
    <div>
      <span class="sign">Ta说: {{ data.sign }}</span>
    </div>
    <a-divider />
    <div class="ops">
      <a-button
        v-if="data.isFriend"
        type="primary"
        class="send-msg"
        shape="round"
        >发消息
      </a-button>
      <a-button
        v-if="data.isFriend"
        type="primary"
        class="delete-friend"
        shape="round"
        status="danger"
        >删除联系人
      </a-button>
      <a-button
        v-if="!data.isFriend"
        style="width: 120px"
        type="primary"
        shape="round"
        status="warning"
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
import { defineProps, ref } from "vue";

const props = defineProps(["data"]);
</script>
