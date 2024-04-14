<template>
  <div id="forumPostPublishId">
    <div class="title">
      <h3>标题</h3>
      <a-textarea
        :max-length="20"
        allow-clear
        placeholder="请输入标题，非必填！"
        show-word-limit
        v-model="title"
      />
    </div>
    <div class="input">
      <h3>内容</h3>
      <a-textarea
        placeholder="请输入帖子内容..."
        :max-length="1000"
        allow-clear
        show-word-limit
        v-model="content"
      />
    </div>
    <div class="picture">
      <h3>配图</h3>
      <a-upload
        :limit="9"
        list-type="picture-card"
        action="/"
        :file-list="fileList"
        image-preview
        :custom-request="uploadTopicImg"
        :on-before-upload="onBeforeUpload"
        :on-before-remove="onRemoveImg"
      />
      <div style="text-align: right">
        <span
          >你还可以上传
          <span style="color: red">{{ restCount }}</span> 张图片</span
        >
      </div>
    </div>
    <div class="submit">
      <a-button type="primary" shape="round" @click="submitTopic"
        >立即发布
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUpload } from "@/hooks/useUpload";
import { FileItem, RequestOption } from "@arco-design/web-vue";
import { compressImage } from "@/utils/FileUtils";
import { ref, toRaw, defineProps, onMounted } from "vue";
import message from "@arco-design/web-vue/es/message";
import { TopicAppControllerService } from "../../../generated";
import { useRoute, useRouter } from "vue-router";
import { useForumStore } from "@/store/forum";

const route = useRoute();
const router = useRouter();
const isUpdate = route.path.includes("update");
const props = defineProps(["topicId"]);
const forumStore = useForumStore();

onMounted(() => {
  if (isUpdate) {
    loadOldTopicData();
  }
});
// 上传图片剩余数
const restCount = ref(9);
// 标题
const title = ref("");
// 内容
const content = ref("");

const loadOldTopicData = async () => {
  const res = await TopicAppControllerService.getTopicVoByIdUsingGet(
    props.topicId
  );
  if (res.code != 0) {
    message.error(res.msg);
    return;
  }
  title.value = res.data.title;
  content.value = res.data.content;
  if (res.data.imgs != null) {
    res.data.imgs.forEach((img: string) => {
      fileList.value.push({
        url: img,
      });
    });
  }
};

// 文件上传
const fileList = ref<any[]>([]);
const {
  uploadFile,
  fileInfo,
  onChange: uploadOnChange,
  onProgressChange,
  parseFile,
} = useUpload();
let isFirst = true;
const onBeforeUpload = async (file: File) => {
  const info = await parseFile(file);
  // 限制文件大小
  if (info.size > 10 * 1024 * 1024) {
    message.error(`文件大小不能超过${10}MB` + info.size);
    return false;
  }
  return true;
};
const uploadTopicImg = (option: RequestOption) => {
  // if (fileList.value.length > 0) {
  //   message.warning("最多只能上传9张图片");
  //   return;
  // }
  const { onProgress, onSuccess, onError } = option;
  if (option.fileItem.file) {
    compressImage(option.fileItem.file).then((compressedFile: File) => {
      uploadFile(compressedFile, "forum");
    });
  }
  if (isFirst) {
    uploadOnChange((val: any) => {
      if (val == "success") {
        onSuccess("成功上传了");
        const clonedObject = Object.assign({}, option.fileItem);
        // option.fileItem.url = fileInfo.value?.downloadUrl;
        clonedObject.url = fileInfo.value?.downloadUrl;
        // 不能直接用下面这种写法 这样存进数组中的都是同一个对象 url也都是同一个
        // fileList.value.push(option.fileItem);
        fileList.value.push(clonedObject);
        restCount.value = 9 - fileList.value.length;
      } else if (val == "fail") {
        onError("上传失败");
      }
    });
    onProgressChange((val: any) => {
      onProgress(val);
    });
    isFirst = false;
  }
};
// 移除文件
const onRemoveImg = (fileItem: FileItem) => {
  // 使用 filter 方法移除指定对象
  fileList.value = fileList.value.filter((item) => {
    // console.log(item.url, fileItem.url, item.url != fileItem.url);
    return item.url != fileItem.url;
  });
  restCount.value++;
};

// 提交
const submitTopic = async () => {
  if (content.value == "") {
    message.error("内容不得为空");
    return;
  }
  // 收集配图链接
  const imgs = fileList.value.map((fileItem) => fileItem.url);
  const params = {
    title: title.value,
    content: content.value,
    imgs: imgs ? imgs : [],
  };
  let res;
  if (isUpdate) {
    res = await TopicAppControllerService.updateTopicUsingPost({
      ...params,
      id: props.topicId,
    });
  } else {
    // 发送请求
    res = await TopicAppControllerService.publishTopicUsingPost(params);
  }

  if (res.code != 0) {
    message.error(res.msg + ", 请稍后重试！");
    return;
  }
  message.success("提交成功");
  // 跳转
  router.push({
    path: "/txing/forum/search",
  });
  forumStore.open(res.data);
};
</script>

<style lang="scss">
#forumPostPublishId {
  max-width: 1280px;
  width: 90vw;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px 20px;
  flex: 1;

  .title {
    width: 80%;
    margin: 0 auto;
    background-color: white;
    border-radius: 10px;
    padding: 15px;

    .arco-textarea-wrapper {
      height: 30px;
    }
  }

  .input {
    width: 80%;
    margin: 10px auto;
    background-color: white;
    border-radius: 10px;
    padding: 15px;

    .arco-textarea-wrapper {
      height: 300px;
    }
  }

  .picture {
    width: 80%;
    margin: 10px auto;
    background-color: white;
    border-radius: 10px;
    padding: 15px;

    .arco-upload-list-picture {
      width: 150px;
      height: 150px;
    }

    .arco-upload-picture-card {
      width: 150px;
      height: 150px;
    }
  }

  .submit {
    margin: 30px 0;
    text-align: center;
  }
}
</style>
