<template>
  <div id="coursePublishViewId">
    <a-form
      :model="form"
      :style="{ width: '70%' }"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item field="name" label="标题">
        <a-input v-model="form.name" placeholder="输入视频标题..." />
      </a-form-item>
      <a-form-item field="post" label="视频封面">
        <a-upload
          action="/"
          :fileList="file ? [file] : []"
          :show-file-list="false"
          @change="onChange"
          @progress="onProgress"
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
                v-if="file && file.url"
              >
                <img :src="file.url" />
                <div class="arco-upload-list-picture-mask">
                  <IconEdit />
                </div>
                <a-progress
                  v-if="file.status === 'uploading' && file.percent < 100"
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
                  <div style="margin-top: 10px; font-weight: 600">Upload</div>
                </div>
              </div>
            </div>
          </template>
        </a-upload>
      </a-form-item>
      <a-form-item field="videoList" label="视频集合">
        <div
          style="
            width: 100%;
            background-color: rgba(247, 244, 244, 0.5);
            padding: 10px;
            border-radius: 10px;
          "
        >
          <div
            class="course-sun-header"
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <a-button
              status="success"
              shape="round"
              style="margin-bottom: 10px"
              @click="handleClick"
              >添加小节
            </a-button>
            <span>共 <span style="color: red">10</span> 小节</span>
          </div>
          <CourseSunItem
            v-for="i in 10"
            :key="i"
            style="
              background-color: rgba(230, 225, 225, 0.5);
              border-radius: 15px;
              padding: 10px;
              margin-top: 10px;
            "
          />
        </div>
      </a-form-item>
      <a-form-item>
        <a-button
          html-type="submit"
          type="primary"
          status="normal"
          style="margin: 0 auto; width: 150px"
          >立即发布
        </a-button>
      </a-form-item>
    </a-form>
  </div>
  <a-modal
    v-model:visible="visible"
    title="添加小节"
    @cancel="handleCancel"
    @before-ok="handleBeforeOk"
  >
    <a-form :model="addVideoForm">
      <a-form-item field="name" label="输入小节标题">
        <a-input v-model="addVideoForm.name" />
      </a-form-item>
      <a-form-item field="post" label="上传视频">
        <a-upload :multiple="false" action="/" :default-file-list="fileList" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { IconPlus, IconEdit } from "@arco-design/web-vue/es/icon";
import CourseSunItem from "@/components/course/CourseSunItem.vue";
import VideoPlayerDialog from "@/components/course/VideoPlayerDialog.vue";

const form = reactive({
  name: "",
  post: "",
  isRead: false,
});
const handleSubmit = (data: any) => {
  console.log(data);
};

const file = ref();

const onChange = (_: any, currentFile: any) => {
  file.value = {
    ...currentFile,
    // url: URL.createObjectURL(currentFile.file),
  };
};
const onProgress = (currentFile: any) => {
  file.value = currentFile;
};

// 添加小节 对话框
const visible = ref(false);
const addVideoForm = reactive({
  name: "",
  post: "",
});

const handleClick = () => {
  visible.value = true;
};
const handleBeforeOk = (done: any) => {
  console.log(form);
  window.setTimeout(() => {
    done();
    // prevent close
    // done(false)
  }, 3000);
};
const handleCancel = () => {
  visible.value = false;
};
// 上传视频
const fileList = [
  {
    uid: "-1",
    name: "ice.png",
    url: "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp",
  },
  // {
  //   status: "error",
  //   uid: "-2",
  //   percent: 0,
  //   response: "上传错误提示",
  //   name: "cat.png",
  //   url: "//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp",
  // },
];
</script>

<style scoped lang="scss">
#coursePublishViewId {
  max-width: 1280px;
  width: 90vw;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  /*padding-right: 10px;*/
  /*padding-left: 10px;*/
  padding: 20px 20px;
  flex: 1;
}
</style>
