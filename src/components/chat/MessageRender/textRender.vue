<!--
* @textRender
* @author Li zhiwei
* @date 2024/1/24 13:56
-->

<template>
  <div class="text">
    <span>{{ body.content }}</span>
  </div>
</template>

<style scoped>
#text {
}
</style>

<script setup lang="ts">
import { TextMsgBody } from "@/service/types";
import { defineProps } from "vue";

const props = defineProps<{ body: TextMsgBody }>();
</script>
