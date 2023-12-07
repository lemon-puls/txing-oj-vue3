<template>
  <div id="addQuestionView">
    <h2>创建题目</h2>
    <a-form id="infoForm" :model="form" label-align="left" auto-label-width>
      <a-form-item field="title" label="标题">
        <a-input
          v-model="form.title"
          style="max-width: 600px"
          placeholder="请输入标题..."
        />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          style="max-width: 600px"
          v-model="form.tags"
          placeholder="请输入标签..."
        />
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MdEditor
          style="max-width: 50vw; width: 80%"
          :value="form.content"
          :handle-change="onContentChange"
        />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor
          style="max-width: 50vw; width: 80%"
          :value="form.answer"
          :handle-change="onAnswerChange"
        />
      </a-form-item>
      <a-form-item label="题目配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item field="judgeConfig.timeLimit" label="用时限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入用时限制..."
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
          <!--          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">-->
          <!--            <a-input-number-->
          <!--              v-model="form.judgeConfig.stackLimit"-->
          <!--              placeholder="请输入堆栈限制..."-->
          <!--              mode="button"-->
          <!--              size="large"-->
          <!--              min="0"-->
          <!--            />-->
          <!--          </a-form-item>-->
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制..."
              mode="button"
              size="large"
              min="0"
            />
          </a-form-item>
        </a-space>
      </a-form-item>

      <a-form-item label="测试用例" :content-flex="false" :merge-props="false">
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :key="index"
          no-style
        >
          <a-space direction="vertical" style="min-width: 640px">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入测试输入用例..."
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入测试输出用例..."
              />
            </a-form-item>
            <a-button status="danger" @click="handleDelete(index)"
              >Delete
            </a-button>
          </a-space>
        </a-form-item>
        <div style="margin-top: 32px">
          <a-button @click="handleAdd" type="outline" status="success"
            >Add
          </a-button>
        </div>
      </a-form-item>
      <div style="margin-top: 16px" />
      <a-form-item>
        <a-button type="primary" style="min-width: 150px" @click="doSubmit"
          >submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";

const route = useRoute();
const updatePage = route.path.includes("update");

let form = ref({
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    timeLimit: 1000,
  },
  tags: [],
  title: "",
});

/**
 * 根据题目ID 获取题目详细信息 （用于更新）
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.infoUsingGet1(id as any);
  if (res.code === 0) {
    form.value = res.data as any;
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
      console.log("lallaa", form.value.judgeCase);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
  } else {
    message.error("加载失败：" + res.message);
  }
};

onMounted(() => {
  loadData();
});

/**
 * 新增测试用例
 */
const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};
/**
 * 删除测试用例
 * @param index
 */
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};

/**
 * 提交
 */
const doSubmit = async () => {
  console.log(form.value);
  if (updatePage) {
    // 更新
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success({
        content: "更新成功",
        // closable: true,
        // position: "top",
        // duration: 1000 * 600,
      });
    } else {
      message.error("更新失败:" + res.message);
    }
  } else {
    // 新建
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("创建成功");
    } else {
      message.error("创建失败:" + res.message);
    }
  }
};

const onContentChange = (value: string) => {
  form.value.content = value;
};

const onAnswerChange = (value: string) => {
  form.value.answer = value;
};
</script>
<style>
#addQuestionView {
  background: rgba(255, 255, 255, 0.8);
  max-width: 1280px;
  width: 90vw;
  /*max-width: 90vw;*/
  /*min-width: 100%;*/
  margin: 0 auto;
  padding-top: 20px;
  flex: 1;
  /*border-radius: 20px;*/
}

#addQuestionView h2 {
  text-align: center;
}

#addQuestionView .arco-form {
  margin-left: 60px !important;
}

/*.arco-message-success {*/
/*  z-index: 10000 !important;*/
/*}*/
</style>
