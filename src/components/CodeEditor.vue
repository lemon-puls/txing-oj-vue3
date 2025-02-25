<template>
  <div id="code-editor" ref="codeEditorRef" :style="props.mystyle" />
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import {
  onMounted,
  ref,
  toRaw,
  withDefaults,
  defineProps,
  watchEffect,
  defineExpose,
  watch,
} from "vue";

interface Props {
  value: string;
  handleChange: (v: string) => void;
  language?: string;
  mystyle?: string | object;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    // console.log(v);
  },
  language: () => "java",
  mystyle: () => "",
});

const codeEditorRef = ref();
const codeEditor = ref();

// const fillValue = () => {
//     if (!codeEditor.value) {
//         return;
//     }
//     toRaw(codeEditor.value).setValue("新时代！");
// };

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  initCodeEditor();
});

const initCodeEditor = () => {
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    theme: "vs-dark", // 主题
    value: props.value, // 默认显示的值
    language: props.language,
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
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
};

defineExpose({ initCodeEditor });
</script>

<style scoped></style>
