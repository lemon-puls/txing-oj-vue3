<template>
  <div id="addQuestionView">
    <a-form :model="form">
      <a-form-item field="answer" label="答案">
        <MdEditor />
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MdEditor />
      </a-form-item>
      <a-form-item field="title" label="标题">
        <a-input v-model="question.title" placeholder="请输入标题..." />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag v-model="question.tags" />
      </a-form-item>
      <!--      <a-form-item field="isRead">-->
      <!--        <a-checkbox v-model="form.isRead"> I have read the manual</a-checkbox>-->
      <!--      </a-form-item>-->
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import MdEditor from "@/components/MdEditor.vue";

const question = reactive({
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 0,
    stackLimit: 0,
    timeLimit: 0,
  },
  tags: [],
  title: "",
});
</script>
<style scoped>
#addQuestionView {
}
</style>
