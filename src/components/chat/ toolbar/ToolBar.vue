<!--
* @ToolBar
* @author Li zhiwei
* @date 2023/12/20 9:59
-->

<template>
  <aside id="ToolBar">
    <a-avatar>
      <img alt="avatar" :src="userStore.loginUser.userAvatar" />
    </a-avatar>
    <div class="navs">
      <!--      <router-link exact-active-class="nav-selected" to="/">-->
      <!--      </router-link>-->
      <div @click="onClickIcon(0)">
        <a-badge
          :count="globalStore.isNeedNotify.messageNotify ? 1 : 0"
          dot
          :dotStyle="{ width: '10px', height: '10px' }"
        >
          <div class="nav-icon-div">
            <icon-message
              :class="['nav-icon', { selected: chatStore.navFlag === 0 }]"
              :size="35"
            />
          </div>
        </a-badge>
      </div>
      <div @click="onClickIcon(1)">
        <a-badge
          :count="globalStore.isNeedNotify.friendNotify ? 1 : 0"
          dot
          :dotStyle="{ width: '10px', height: '10px' }"
        >
          <div class="nav-icon-div">
            <icon-user-group
              :class="['nav-icon', { selected: chatStore.navFlag === 1 }]"
              :size="35"
            />
          </div>
        </a-badge>
      </div>
      <!--      <router-link exact-active-class="nav-selected" to="/">-->

      <!--      </router-link>-->
      <!--      <a-tabs-->
      <!--        type="card-gutter"-->
      <!--        direction="vertical"-->
      <!--        :editable="false"-->
      <!--        auto-switch-->
      <!--      >-->
      <!--        <template #title>-->
      <!--          <a-badge :count="2" :max-count="99">-->
      <!--            <icon-message class="nav-icon" :size="40" />-->
      <!--          </a-badge>-->
      <!--        </template>-->
      <!--        <a-tab-pane> aaaa </a-tab-pane>-->
      <!--      </a-tabs>-->
    </div>
  </aside>
</template>

<style lang="scss">
#ToolBar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  padding: 20px 0;
  background-color: #303030;
  border-radius: 20px 0 0 20px;

  .navs {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    row-gap: 25px;

    .arco-badge-number {
      //max-width: 10px;
      //max-height: 10px;
      //text-align: center;
      //margin: auto auto;
    }

    .nav-icon-div {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;

      .nav-icon {
        color: #f5f5f5;
      }

      .selected {
        color: #fcf743;
        //color: $primary-color;
        //color: var(--primary-color);
      }
    }
  }
}
</style>

<script setup lang="ts">
import { IconMessage, IconUserGroup } from "@arco-design/web-vue/es/icon";
import { useChatStore } from "@/store/chat";
import { useGlobalStore } from "@/store/global";
import { computed } from "vue";
import { useContactStore } from "@/store/contact";
import { useUserStore } from "@/store/user";

const chatStore = useChatStore();
const globalStore = useGlobalStore();
const contactStore = useContactStore();
const userStore = useUserStore();

const unReadMark = computed(() => globalStore.unReadMark);

const onClickIcon = async (val: number) => {
  // if (val === 1) {
  //   await contactStore.getFriendApplyList(true);
  //   await contactStore.getContactList(true);
  // }
  chatStore.navFlag = val;
};
</script>
