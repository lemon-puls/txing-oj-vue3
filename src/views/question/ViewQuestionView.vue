<template>
  <div id="ViewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24"> {{ question }}</a-col>
      <a-col :md="12" :xs="24">
        <CodeEditor />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, withDefaults, defineProps } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import CodeEditor from "@/components/CodeEditor.vue";

const question = ref<QuestionVO>();

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const loadData = async () => {
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    props.id
  );
  if (res.code === 0) {
    question.value = res.data;
  } else {
    message.error("加载题目数据失败:" + res.message);
  }
};
/**
 * 加载数据
 */
onMounted(() => {
  loadData();
});

/**
 * 只要页号等变量发生改变时 就会触发loadData的调用 获取到当前页对应的数据
 */
watchEffect(() => {
  loadData();
});
</script>

<style scoped>
#ViewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
