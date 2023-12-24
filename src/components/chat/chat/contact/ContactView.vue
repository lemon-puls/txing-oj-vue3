<!--
* @ContactView
* @author Li zhiwei
* @date 2023/12/21 19:47
-->

<template>
  <div id="ContactView">
    <a-split
      :style="{
        width: '100%',
        height: '100%',
      }"
      :default-size="0.3"
    >
      <template #first>
        <ContactList />
      </template>
      <template #second>
        <ContactDetail :data="data" />
      </template>
    </a-split>
  </div>
</template>

<style scoped>
#ContactView {
  width: 100%;
}
</style>

<script setup lang="ts">
import ContactList from "@/components/chat/chat/contact/contactList/ContactList";
import ContactDetail from "@/components/chat/chat/contact/contactDetail/ContactDetail";
import { ref } from "vue";

const data = ref({
  avatar:
    "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epOhY2tKMfGKuvO5YQIhoVYiayhg6JEpKLYuz9jnvfOB7kzbSB7rFWKAwrtlWV6P0oiamhS7sTDf7OQ/132",
  userName: "明天会更好",
  sign: "如果信念有颜色 那一定是中国红！",
  isFriend: false,
});
</script>
