<template>
  <Viewer :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { defineProps, withDefaults } from "vue";
import { Viewer } from "@bytemd/vue-next";

const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];

interface Props {
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style></style>
