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
        <ContactDetail />
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
</script>
