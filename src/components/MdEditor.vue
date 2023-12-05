<template>
  <Editor
    :value="value"
    :mode="mode"
    :locale="zhHans"
    :plugins="plugins"
    @change="handleChange"
    :uploadImages="uploadImage"
  />
</template>

<script setup lang="ts">
import { Editor, Viewer } from "@bytemd/vue-next";
import { FileControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";
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
import "bytemd/dist/index.min.css";
import "highlight.js/styles/default.css";
import "katex/dist/katex.css";
import "juejin-markdown-themes/dist/juejin.min.css";
// 中文包
import zhHans from "bytemd/locales/zh_Hans.json";
import gfmLocale from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import mathLocale from "@bytemd/plugin-math/locales/zh_Hans.json";
import mermaidLocale from "@bytemd/plugin-mermaid/locales/zh_Hans.json";

const plugins = [
  gfm({ locale: gfmLocale }),
  highlight(),
  mediumZoom(),
  gemoji(),
  breaks(),
  frontmatter(),
  math({ locale: mathLocale }),
  mediumZoom(),
  mermaid({ locale: mermaidLocale }),
  // Add more plugins here
];

interface Props {
  value: string;
  handleChange: (v: string) => void;
  mode?: string;
  postId: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
  mode: () => "split",
  postId: () => "-1",
});
// 上传图片
const uploadImage = async (files: any) => {
  console.log("files", files);
  const res = await FileControllerService.uploadFileUsingPost(
    "post_content_img",
    props.postId,
    files[0]
  );
  if (res.code !== 0) {
    message.error(res.msg);
    return [
      {
        title: files[0].name,
        url: "",
      },
    ];
  }
  return [
    {
      // title: files.map((i: any) => i.name),
      title: files[0].name,
      url: res.data,
    },
  ];
};
</script>

<style scoped>
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none !important;
}

.bytemd {
  height: 400px;
}
</style>
