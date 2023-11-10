<template>
  <div id="ViewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <a-descriptions
                title="题目限制"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="commnet" title="评论">
            <div>
              <a-scrollbar style="height: 56vh; overflow: auto">
                <a-comment author="Balzac" datetime="1 hour" align="right">
                  <template #actions>
                    <span class="action" key="heart" @click="onLikeChange">
                      <span v-if="like">
                        <IconHeartFill :style="{ color: '#f53f3f' }" />
                      </span>
                      <span v-else>
                        <IconHeart />
                      </span>
                      {{ 83 + (like ? 1 : 0) }}
                    </span>
                    <span class="action" key="star" @click="onStarChange">
                      <span v-if="star">
                        <IconStarFill
                          style="
                             {
                              color: '#ffb400';
                            }
                          "
                        />
                      </span>
                      <span v-else>
                        <IconStar />
                      </span>
                      {{ 3 + (star ? 1 : 0) }}
                    </span>
                    <span class="action" key="reply">
                      <IconMessage /> Reply
                    </span>
                  </template>
                  <template #avatar>
                    <a-avatar>
                      <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                      />
                    </a-avatar>
                  </template>
                  <template #content>
                    <div>
                      A design is a plan or specification for the construction
                      of an object or system or for the implementation of an
                      activity or process, or the result of that plan or
                      specification in the form of a prototype, product or
                      process.
                    </div>
                  </template>
                </a-comment>
                <a-comment author="Balzac" datetime="1 hour" align="right">
                  <template #actions>
                    <span class="action" key="heart" @click="onLikeChange">
                      <span v-if="like">
                        <IconHeartFill :style="{ color: '#f53f3f' }" />
                      </span>
                      <span v-else>
                        <IconHeart />
                      </span>
                      {{ 83 + (like ? 1 : 0) }}
                    </span>
                    <span class="action" key="star" @click="onStarChange">
                      <span v-if="star">
                        <IconStarFill
                          style="
                             {
                              color: '#ffb400';
                            }
                          "
                        />
                      </span>
                      <span v-else>
                        <IconStar />
                      </span>
                      {{ 3 + (star ? 1 : 0) }}
                    </span>
                    <span class="action" key="reply">
                      <IconMessage /> Reply
                    </span>
                  </template>
                  <template #avatar>
                    <a-avatar>
                      <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                      />
                    </a-avatar>
                  </template>
                  <template #content>
                    <div>
                      A design is a plan or specification for the construction
                      of an object or system or for the implementation of an
                      activity or process, or the result of that plan or
                      specification in the form of a prototype, product or
                      process.
                    </div>
                  </template>
                </a-comment>
                <a-comment author="Balzac" datetime="1 hour" align="right">
                  <template #actions>
                    <span class="action" key="heart" @click="onLikeChange">
                      <span v-if="like">
                        <IconHeartFill :style="{ color: '#f53f3f' }" />
                      </span>
                      <span v-else>
                        <IconHeart />
                      </span>
                      {{ 83 + (like ? 1 : 0) }}
                    </span>
                    <span class="action" key="star" @click="onStarChange">
                      <span v-if="star">
                        <IconStarFill
                          style="
                             {
                              color: '#ffb400';
                            }
                          "
                        />
                      </span>
                      <span v-else>
                        <IconStar />
                      </span>
                      {{ 3 + (star ? 1 : 0) }}
                    </span>
                    <span class="action" key="reply">
                      <IconMessage /> Reply
                    </span>
                  </template>
                  <template #avatar>
                    <a-avatar>
                      <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                      />
                    </a-avatar>
                  </template>
                  <template #content>
                    <div>
                      A design is a plan or specification for the construction
                      of an object or system or for the implementation of an
                      activity or process, or the result of that plan or
                      specification in the form of a prototype, product or
                      process.
                    </div>
                  </template>
                </a-comment>
                <a-comment author="Balzac" datetime="1 hour" align="right">
                  <template #actions>
                    <span class="action" key="heart" @click="onLikeChange">
                      <span v-if="like">
                        <IconHeartFill :style="{ color: '#f53f3f' }" />
                      </span>
                      <span v-else>
                        <IconHeart />
                      </span>
                      {{ 83 + (like ? 1 : 0) }}
                    </span>
                    <span class="action" key="star" @click="onStarChange">
                      <span v-if="star">
                        <IconStarFill
                          style="
                             {
                              color: '#ffb400';
                            }
                          "
                        />
                      </span>
                      <span v-else>
                        <IconStar />
                      </span>
                      {{ 3 + (star ? 1 : 0) }}
                    </span>
                    <span class="action" key="reply">
                      <IconMessage /> Reply
                    </span>
                  </template>
                  <template #avatar>
                    <a-avatar>
                      <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                      />
                    </a-avatar>
                  </template>
                  <template #content>
                    <div>
                      A design is a plan or specification for the construction
                      of an object or system or for the implementation of an
                      activity or process, or the result of that plan or
                      specification in the form of a prototype, product or
                      process.
                    </div>
                  </template>
                </a-comment>
                <a-comment author="Balzac" datetime="1 hour" align="right">
                  <template #actions>
                    <span class="action" key="heart" @click="onLikeChange">
                      <span v-if="like">
                        <IconHeartFill :style="{ color: '#f53f3f' }" />
                      </span>
                      <span v-else>
                        <IconHeart />
                      </span>
                      {{ 83 + (like ? 1 : 0) }}
                    </span>
                    <span class="action" key="star" @click="onStarChange">
                      <span v-if="star">
                        <IconStarFill
                          style="
                             {
                              color: '#ffb400';
                            }
                          "
                        />
                      </span>
                      <span v-else>
                        <IconStar />
                      </span>
                      {{ 3 + (star ? 1 : 0) }}
                    </span>
                    <span class="action" key="reply">
                      <IconMessage /> Reply
                    </span>
                  </template>
                  <template #avatar>
                    <a-avatar>
                      <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                      />
                    </a-avatar>
                  </template>
                  <template #content>
                    <div>
                      A design is a plan or specification for the construction
                      of an object or system or for the implementation of an
                      activity or process, or the result of that plan or
                      specification in the form of a prototype, product or
                      process.
                    </div>
                  </template>
                </a-comment>
                <a-comment author="Balzac" datetime="1 hour" align="right">
                  <template #actions>
                    <span class="action" key="heart" @click="onLikeChange">
                      <span v-if="like">
                        <IconHeartFill :style="{ color: '#f53f3f' }" />
                      </span>
                      <span v-else>
                        <IconHeart />
                      </span>
                      {{ 83 + (like ? 1 : 0) }}
                    </span>
                    <span class="action" key="star" @click="onStarChange">
                      <span v-if="star">
                        <IconStarFill
                          style="
                             {
                              color: '#ffb400';
                            }
                          "
                        />
                      </span>
                      <span v-else>
                        <IconStar />
                      </span>
                      {{ 3 + (star ? 1 : 0) }}
                    </span>
                    <span class="action" key="reply">
                      <IconMessage /> Reply
                    </span>
                  </template>
                  <template #avatar>
                    <a-avatar>
                      <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                      />
                    </a-avatar>
                  </template>
                  <template #content>
                    <div>
                      A design is a plan or specification for the construction
                      of an object or system or for the implementation of an
                      activity or process, or the result of that plan or
                      specification in the form of a prototype, product or
                      process.
                    </div>
                  </template>
                </a-comment>
                <a-comment author="Balzac" datetime="1 hour" align="right">
                  <template #actions>
                    <span class="action" key="heart" @click="onLikeChange">
                      <span v-if="like">
                        <IconHeartFill :style="{ color: '#f53f3f' }" />
                      </span>
                      <span v-else>
                        <IconHeart />
                      </span>
                      {{ 83 + (like ? 1 : 0) }}
                    </span>
                    <span class="action" key="star" @click="onStarChange">
                      <span v-if="star">
                        <IconStarFill
                          style="
                             {
                              color: '#ffb400';
                            }
                          "
                        />
                      </span>
                      <span v-else>
                        <IconStar />
                      </span>
                      {{ 3 + (star ? 1 : 0) }}
                    </span>
                    <span class="action" key="reply">
                      <IconMessage /> Reply
                    </span>
                  </template>
                  <template #avatar>
                    <a-avatar>
                      <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                      />
                    </a-avatar>
                  </template>
                  <template #content>
                    <div>
                      A design is a plan or specification for the construction
                      of an object or system or for the implementation of an
                      activity or process, or the result of that plan or
                      specification in the form of a prototype, product or
                      process.
                    </div>
                  </template>
                </a-comment>
                <a-comment author="Balzac" datetime="1 hour" align="right">
                  <template #actions>
                    <span class="action" key="heart" @click="onLikeChange">
                      <span v-if="like">
                        <IconHeartFill :style="{ color: '#f53f3f' }" />
                      </span>
                      <span v-else>
                        <IconHeart />
                      </span>
                      {{ 83 + (like ? 1 : 0) }}
                    </span>
                    <span class="action" key="star" @click="onStarChange">
                      <span v-if="star">
                        <IconStarFill
                          style="
                             {
                              color: '#ffb400';
                            }
                          "
                        />
                      </span>
                      <span v-else>
                        <IconStar />
                      </span>
                      {{ 3 + (star ? 1 : 0) }}
                    </span>
                    <span class="action" key="reply">
                      <IconMessage /> Reply
                    </span>
                  </template>
                  <template #avatar>
                    <a-avatar>
                      <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                      />
                    </a-avatar>
                  </template>
                  <template #content>
                    <div>
                      A design is a plan or specification for the construction
                      of an object or system or for the implementation of an
                      activity or process, or the result of that plan or
                      specification in the form of a prototype, product or
                      process.
                    </div>
                  </template>
                </a-comment>
                <a-comment author="Balzac" datetime="1 hour" align="right">
                  <template #actions>
                    <span class="action" key="heart" @click="onLikeChange">
                      <span v-if="like">
                        <IconHeartFill :style="{ color: '#f53f3f' }" />
                      </span>
                      <span v-else>
                        <IconHeart />
                      </span>
                      {{ 83 + (like ? 1 : 0) }}
                    </span>
                    <span class="action" key="star" @click="onStarChange">
                      <span v-if="star">
                        <IconStarFill
                          style="
                             {
                              color: '#ffb400';
                            }
                          "
                        />
                      </span>
                      <span v-else>
                        <IconStar />
                      </span>
                      {{ 3 + (star ? 1 : 0) }}
                    </span>
                    <span class="action" key="reply">
                      <IconMessage /> Reply
                    </span>
                  </template>
                  <template #avatar>
                    <a-avatar>
                      <img
                        alt="avatar"
                        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                      />
                    </a-avatar>
                  </template>
                  <template #content>
                    <div>
                      A design is a plan or specification for the construction
                      of an object or system or for the implementation of an
                      activity or process, or the result of that plan or
                      specification in the form of a prototype, product or
                      process.
                    </div>
                  </template>
                </a-comment>
              </a-scrollbar>
              <div id="commentInput">
                <a-textarea
                  style="height: 100px"
                  placeholder="快来发表一下评论吧 注意要友好哦！"
                  allow-clear
                />
                <a-divider size="0" />
                <a-button type="primary" status="success" style="float: right"
                  >发表评论
                </a-button>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane key="answer" title="答案">
            <a-card v-if="question" :title="question.title">
              <MdViewer :value="question.answer || ''" />
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="submitRecord" title="提交记录">
            提交记录
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item field="title" label="编程语言" style="min-width: 240px">
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code as string"
          :language="form.language"
          :handleChange="changeCode"
        />
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  IconHeartFill,
  IconStarFill,
  IconHeart,
  IconStar,
  IconMessage,
} from "@arco-design/web-vue/es/icon";
import { onMounted, ref, watchEffect, withDefaults, defineProps } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
  QuestionSubmitAddRequest,
  QuestionVO,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";

const like = ref(false);
const star = ref(false);
const onLikeChange = () => {
  like.value = !like.value;
};
const onStarChange = () => {
  star.value = !star.value;
};

const form = ref<QuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

const changeCode = (value: string) => {
  form.value.code = value;
};

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }

  const res = await QuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
  } else {
    message.error("提交失败 请稍后重试：" + res.message);
  }
};

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

const scrollTo = (num: number) => {
  alert(num);
  console.log(num);
};
</script>

<style>
#ViewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  padding-right: 10px;
  padding-left: 10px;
}

#ViewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}

.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.action:hover {
  background: var(--color-fill-3);
}

/*评论输入框*/
#commentInput {
  /*position: absolute;*/
  bottom: 0;
  width: 100%;
  margin-top: 20px;
}
</style>
