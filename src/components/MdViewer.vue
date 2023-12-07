<template>
  <Viewer id="viewerClass" :value="value" :plugins="plugins" :locale="zhHans" />
</template>

<script setup lang="ts">
import { Viewer } from "@bytemd/vue-next";
import { markRaw } from "vue";
import { defineProps, withDefaults } from "vue";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import highlightssr from "@bytemd/plugin-highlight-ssr";
import math from "@bytemd/plugin-math";
import mathssr from "@bytemd/plugin-math-ssr";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
// CSS
// import "bytemd/dist/index.css";
// import "highlight.js/styles/default.css";
// import "katex/dist/katex.css";
// import "juejin-markdown-themes/dist/juejin.min.css";
import "juejin-markdown-themes/dist/channing-cyan.min.css";
// 中文包
import zhHans from "bytemd/locales/zh_Hans.json";
import gfmLocale from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import mathLocale from "@bytemd/plugin-math/locales/zh_Hans.json";
import mermaidLocale from "@bytemd/plugin-mermaid/locales/zh_Hans.json";

const plugins = [
  gfm(),
  highlight(),
  gemoji(),
  breaks(),
  frontmatter(),
  math(),
  mermaid(),
  mediumZoom(),
  // highlightssr(),
  // mathssr(),
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
/*.viewer {*/
/*  overflow-wrap: break-word !important;*/
/*}*/

/*.viewerClass img {*/
/*  width: auto;*/
/*  max-width: 100%;*/
/*}*/
.medium-zoom-overlay {
  opacity: 0.6 !important;
  background: black !important;
}
</style>
