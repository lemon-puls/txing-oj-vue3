<template>
  <Editor
    :value="value"
    :mode="mode"
    re
    :plugins="plugins"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import { Editor, Viewer } from "@bytemd/vue-next";
import highlight from "@bytemd/plugin-highlight";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import { defineProps, withDefaults } from "vue";
import gemoji from "@bytemd/plugin-gemoji";

const plugins = [
  gfm(),
  highlight(),
  mediumZoom(),
  gemoji(),
  // Add more plugins here
];

interface Props {
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style>
</style>
