<template>
  <div class="home">
    <CodeEditor :value="codeValue" :handle-change="onCodeChange" />
    <MdEditor :value="value" :handle-change="onchange" />
    <!--    <img alt="Vue logo" src="../assets/logo.png" />-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />-->
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";

const value = ref();
const onchange = (v: string) => {
  value.value = v;
};

const codeValue = ref();
const onCodeChange = (v: string) => {
  codeValue.value = v;
};
</script>
