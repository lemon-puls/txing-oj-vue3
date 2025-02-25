<template>
  <div id="addPostView">
    <!--    <h2>创建文章</h2>-->
    <a-form id="infoForm" :model="form" label-align="left" auto-label-width>
      <a-form-item field="title">
        <div id="titleParentId">
          <a-input
            id="titleInputId"
            v-model="form.title"
            placeholder="请输入标题..."
            :max-length="40"
          />
          <a-popover title="发布文章" :trigger="'click'">
            <a-button id="submitButtonId" type="primary" style="min-width: 60px"
              >发布
            </a-button>
            <template #content>
              <div id="publishDialogId">
                <p>添加封面图</p>
                <a-upload
                  :action="`${apiBaseUrl}/api/file/upload`"
                  :fileList="file ? [file] : []"
                  :show-file-list="false"
                  @change="onChange"
                  @progress="onProgress"
                  :data="appendData"
                  with-credentials
                  :headers="{ TOKEN: token }"
                >
                  <template #upload-button>
                    <div
                      :class="`arco-upload-list-item${
                        file && file.status === 'error'
                          ? ' arco-upload-list-item-error'
                          : ''
                      }`"
                    >
                      <div
                        class="arco-upload-list-picture custom-upload-avatar"
                        v-if="form.coverImg !== null && form.coverImg !== ''"
                      >
                        <img :src="form.coverImg ? form.coverImg : ''" />
                        <div class="arco-upload-list-picture-mask">
                          <IconEdit />
                        </div>
                        <a-progress
                          v-if="
                            file &&
                            file.status === 'uploading' &&
                            file.percent < 100
                          "
                          :percent="file.percent"
                          type="circle"
                          size="mini"
                          :style="{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translateX(-50%) translateY(-50%)',
                          }"
                        />
                      </div>
                      <div class="arco-upload-picture-card" v-else>
                        <div class="arco-upload-picture-card-text">
                          <IconPlus />
                          <div style="margin-top: 10px; font-weight: 600">
                            Upload
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </a-upload>
                <p>编辑摘要</p>
                <a-textarea
                  placeholder="请输入文章摘要..."
                  :max-length="{ length: 100, errorOnly: false }"
                  allow-clear
                  show-word-limit
                  style="height: 100px"
                  v-model="form.intro"
                />
                <a-button
                  type="primary"
                  style="min-width: 100px; margin-top: 30px; max-width: 100px"
                  @click="doSubmit"
                  >发布文章
                </a-button>
              </div>
            </template>
          </a-popover>
        </div>
      </a-form-item>
      <a-form-item field="content">
        <MdEditor
          style="max-width: 100vw; width: 100%"
          :value="form.content"
          :handle-change="onContentChange"
          :post-id="route.query.id"
          biz="post_content_img"
        />
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import {
  PostControllerService,
  QuestionControllerService,
  UserControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";
import { IconEdit, IconPlus } from "@arco-design/web-vue/es/icon";
import { useRouter } from "vue-router";

const router = useRouter();

const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

/**
 * 更新时加载文章原数据
 */
const route = useRoute();
const updatePage = route.path.includes("update");
onMounted(() => {
  loadPostOldData();
});

const loadPostOldData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await PostControllerService.getPostUpdateVoUsingGet(id as any);
  if (res.code === 0) {
    Object.assign(form.value, res.data);
  } else {
    message.error("获取文章失败：", res.msg);
  }
};

let form = ref({
  content: "",
  title: "",
  coverImg: "",
  intro: "",
});

/**
 * 上传封面图
 */
const file = ref();
let appendData = ref({
  biz: "post_cover",
  oldImg: "",
});
// const onChange = (_: any, currentFile: any) => {
//   file.value = {
//     ...currentFile,
//     // url: URL.createObjectURL(currentFile.file),
//   };
// };
const onChange = async (_: any, currentFile: any) => {
  // if (currentFile.length == 2) {
  //   currentFile.splice(0, 1);
  // }
  const response = toRaw(toRaw(currentFile)).response;
  if (response == undefined || response.data === form.value.coverImg) {
    return;
  }
  if (response.code !== 0) {
    message.error(response.msg);
    return;
  }
  form.value.coverImg = response.data;
  appendData.value.oldImg = response.data;
  file.value = {
    ...currentFile,
    url: response.data,
  };
  message.success("封面图片上传成功");
  return;
};

const onProgress = (currentFile: any) => {
  file.value = currentFile;
};

/**
 * 提交
 */
const doSubmit = async () => {
  if (form.value.title.length <= 0) {
    message.warning("文章标题不得为空");
    return;
  }
  if (form.value.content.length > 10000 || form.value.content.length <= 0) {
    message.warning(
      "文章长度不合法，文章内容不得为空，且需控制在10000字以内！"
    );
    return;
  }
  if (updatePage) {
    // 更新
    // console.log(
    //   "route.query.id",
    //   route.query.id ? BigInt(route.query.id + "") : 0
    // );
    const res = await PostControllerService.updatePostUsingPost({
      ...form.value,
      id: route.query.id ? route.query.id : 0,
    });
    if (res.code === 0) {
      message.success("更新成功");
      router.push({
        path: "/txing/post/view/" + route.query.id,
      });
    } else {
      message.error("更新失败:" + res.msg);
    }
  } else {
    // 新建

    const res = await PostControllerService.addPostUsingPost({
      ...form.value,
    });
    if (res.code === 0) {
      message.success("发表成功");
      router.push({
        path: "/txing/post/view/" + res.data,
      });
    } else {
      message.error("发表失败:" + res.msg);
    }
  }
};
// 标题校验
// const onblur = () => {};
// 文章内容
const onContentChange = (value: string) => {
  form.value.content = value;
  if (value.length > 10000) {
    message.warning("文章已达到最大长度10000，请勿继续输入！");
  }
};

// 用户token
const token = localStorage.getItem("TOKEN");
</script>
<style>
#addPostView {
  background: rgba(255, 255, 255, 0.8);
  /*max-width: 1280px;*/
  /*max-width: 80vw;*/
  margin: 0 auto;
  flex: 1;
  /*border-radius: 20px;*/
}

#addPostView .bytemd {
  height: calc(100vh - 70px);
}

#addPostView bytemd-fullscreen {
  height: calc(100vh) !important;
}

#addPostView .arco-form-item {
  margin-bottom: 0;
}

#addPostView .arco-form-item-label-col {
  padding-right: 0;
}

/*.medium-zoom-image {*/
/*  width: auto;*/
/*  max-width: 100%;*/
/*}*/

/*.bytemd-preview {*/
/*  overflow-wrap: break-word;*/
/*}*/

#titleInputId {
  max-width: 600px;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
}

#titleParentId {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
}

#submitButtonId {
  margin-right: 30px;
}

/*发布文章弹窗*/
#publishDialogId {
  width: 350px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#publishDialogId .arco-upload-picture-card {
  height: 150px !important;
  width: 250px !important;
}

#publishDialogId .arco-upload-list-picture {
  height: 150px;
  width: auto;
  max-height: 300px;
  /*object-fit: cover;*/
}
</style>
