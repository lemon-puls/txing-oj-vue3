<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px" />
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps } from "vue";

interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const codeEditorRef = ref();
const codeEditor = ref();

const fillValue = () => {
  if (!codeEditor.value) {
    return;
  }
  toRaw(codeEditor.value).setValue("新时代！");
};

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    theme: "vs-dark", // 主题
    value: props.value, // 默认显示的值
    language: "java",
    // folding: true, // 是否折叠
    // foldingHighlight: true, // 折叠等高线
    // foldingStrategy: "indentation", // 折叠方式  auto | indentation
    // showFoldingControls: "always", // 是否一直显示折叠 always | mouseover
    // disableLayerHinting: true, // 等宽优化
    // emptySelectionClipboard: false, // 空选择剪切板
    // selectionClipboard: false, // 选择剪切板
    automaticLayout: true, // 自动布局
    // codeLens: false, // 代码镜头
    // scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
    colorDecorators: true, // 颜色装饰器
    // accessibilitySupport: "off", // 辅助功能支持  "auto" | "off" | "on"
    lineNumbers: "on", // 行号 取值： "on" | "off" | "relative" | "interval" | function
    lineNumbersMinChars: 5, // 行号最小字符   number
    // enableSplitViewResizing: false,
    readOnly: false, //是否只读  取值 true | false
    minimap: {
      enabled: true,
    },
  });
  codeEditor.value.onDidChangeModelContent(() => {
    console.log(props.value);
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>
