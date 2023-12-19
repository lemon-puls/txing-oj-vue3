<template>
  <div id="msgItemId">
    <ul>
      <li>
        {{ data.content }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

let props = defineProps(["data"]);
</script>

<style scoped>
#msgItemId {
  background-color: #ff7300;
}
</style>
