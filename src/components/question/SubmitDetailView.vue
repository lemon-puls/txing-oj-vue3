<template>
  <a-descriptions style="max-width: 80%" :column="{ xs: 1, md: 2, lg: 2 }">
    <a-descriptions-item
      v-for="item of data"
      :label="item.label"
      :span="item.span ?? 1"
      :key="item.label"
    >
      <a-tag>{{ item.value }}</a-tag>
    </a-descriptions-item>
  </a-descriptions>
  <a-divider />
  <a-card
    :style="{ width: '100%' }"
    :title="`${props.questionSubmitDatail.title}`"
  >
    <template #extra>
      <div>
        <a-space>
          <span style="color: #7d7979">{{
            props.questionSubmitDatail.language
          }}</span>
          <a-link>
            {{ props.questionSubmitDatail.createTime }}
            <!--        {{-->
            <!--          moment(props.questionSubmitDatail.createTime).format("YYYY-MM-DD")-->
            <!--        }}-->
          </a-link>
        </a-space>
      </div>
    </template>
    <!--    <md-viewer :value="props.questionSubmitDatail.code" />-->
    <pre>{{ props.questionSubmitDatail.code }}</pre>
  </a-card>
</template>

<script setup lang="ts">
import MdViewer from "@/components/MdViewer";
import { defineProps, reactive, withDefaults } from "vue";
import moment from "moment";

interface Props {
  questionSubmitDatail: any;
}

const props = withDefaults(defineProps<Props>(), {
  questionSubmitDatail: () => {
    return reactive({
      createTime: "2020-12-23",
      exceedPercent: 75,
      id: 0,
      times: 1000,
      memory: 1000,
      result: "成功",
      status: "等待中",
      code:
        "package com.bitdf.txing.txcodesandbox.model;\n" +
        "\n" +
        "import lombok.AllArgsConstructor;\n" +
        "import lombok.Data;\n" +
        "import lombok.NoArgsConstructor;\n" +
        "\n" +
        "/**\n" +
        " * @author Lizhiwei\n" +
        " * @date 2023/11/14 0:53:13\n" +
        " * 注释：存储判题信息\n" +
        " */\n" +
        "@AllArgsConstructor\n" +
        "@NoArgsConstructor\n" +
        "@Data\n" +
        "public class JudgeInfo {\n" +
        "    /**\n" +
        "     * 执行用时\n" +
        "     */\n" +
        "    private Long time;\n" +
        "    /**\n" +
        "     * 空间使用\n" +
        "     */\n" +
        "    private Long memory;\n" +
        "    /**\n" +
        "     * 判题信息\n" +
        "     */\n" +
        "    private String message;\n" +
        "}\n",
      language: "Java",
      title: "数组求和",
    });
  },
});

/**
 * 基本情况
 */
const data = [
  {
    label: "题目",
    value: props.questionSubmitDatail.title,
    span: 3,
  },
  {
    label: "占用内存",
    value: `${(props.questionSubmitDatail.memory / 1024).toFixed(2)} MB`,
  },
  {
    label: "执行时间",
    value: `${props.questionSubmitDatail.times} ms`,
  },
  {
    label: "判题状态",
    value: props.questionSubmitDatail.status,
  },
  {
    label: "判题结果",
    value: props.questionSubmitDatail.result,
  },
  {
    label: "超越用户比例",
    value: `${(props.questionSubmitDatail.exceedPercent == -1
      ? 0
      : props.questionSubmitDatail.exceedPercent * 100
    ).toFixed(2)} %`,
  },
];

let code = "helloworld!";
</script>

<style scoped></style>
