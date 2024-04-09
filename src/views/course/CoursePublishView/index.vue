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
      <a-form-item field="intro" label="课程简介">
        <a-textarea
          placeholder="请介绍一下您的课程吧..."
          :max-length="100"
          allow-clear
          show-word-limit
          v-model="form.intro"
        />
      </a-form-item>
      <a-form-item field="post" label="视频封面">
        <a-upload
          action="/"
          :fileList="file ? [file] : []"
          :show-file-list="false"
          @change="onChange"
          :custom-request="uploadCourseCover"
          :image-preview="true"
          :draggable="true"
          list-type="picture-card"
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
            <span
              >共 <span style="color: red">{{ videos.length }}</span> 小节</span
            >
          </div>
          <CourseSunItem
            v-for="(video, index) in videos"
            :key="video.fileId"
            :video="video"
            :index="index"
            style="
              background-color: rgba(230, 225, 225, 0.5);
              border-radius: 15px;
              padding: 10px;
              margin-top: 10px;
            "
            @on-edit="onEditVideo"
            @on-delete="onDeleteVideo"
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
    @ok="onCreateVideo"
    :on-before-ok="onBeforeCreateVideo"
  >
    <a-form :model="curVideoInfo">
      <a-form-item field="name" label="小节标题">
        <a-input v-model="curVideoInfo.name" />
      </a-form-item>
      <a-form-item
        field="orderNo"
        label="序号"
        tooltip="如果为0 自动添加到末尾"
      >
        <a-input-number
          :style="{ width: '320px' }"
          placeholder="Please Enter"
          :default-value="0"
          mode="button"
          class="input-demo"
          v-model="curVideoInfo.orderNo"
          :min="0"
        />
      </a-form-item>
      <a-form-item field="post" label="上传视频">
        <a-upload
          :custom-request="customUpload"
          :multiple="false"
          action="/"
          :fileList="videoFile ? [videoFile] : []"
          :on-before-upload="onBeforeUpload"
          @change="onVideoUploadChange"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { IconPlus, IconEdit } from "@arco-design/web-vue/es/icon";
import CourseSunItem from "@/components/course/CourseSunItem.vue";
import VideoPlayerDialog from "@/components/course/VideoPlayerDialog.vue";
import { RequestOption } from "@arco-design/web-vue";
import TcVod from "vod-js-sdk-v6";
import { CourseAppControllerService } from "../../../../generated";
import { VideoBaseInfo } from "@/service/types";
import { useUpload } from "@/hooks/useUpload";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";
import { compressImage, getFileByImgUrl } from "@/utils/FileUtils";
import { flatten } from "lodash";
import { isBlob } from "../../../../generated/core/request";

const router = useRouter();
const route = useRoute();
const isUpdate = route.path.includes("update");
onMounted(() => {
  loadCourseData();
});
// 修改video
const isUploadingVideo = ref(false);
// 当前操作的video的索引
let index = 0;
const onEditVideo = (video: any, i: number) => {
  curVideoInfo.value = video;
  videoFile.value = [{ url: video.videoUrl }];
  visible.value = true;
  isUploadingVideo.value = true;
  index = i;
};
// 删除video
const onDeleteVideo = async (video: any, index: number) => {
  if (isUpdate) {
    // 更新下
    const res = await CourseAppControllerService.deleteVideoBatchUsingPost(
      video.courseId,
      [video.id]
    );
    if (res.code != 0) {
      message.success("删除失败：", res.msg);
      return;
    }
  }
  message.success("删除成功");
  // 更新数组
  videos.value.splice(index, 1);
};

// 更新时要加载原数据
const loadCourseData = async () => {
  const courseId = route.query.courseId;
  if (!courseId) {
    return;
  }
  const res = await CourseAppControllerService.getVideoPlayVoUsingGet(
    Number(courseId)
  );
  if (res.code != 0) {
    message.error("课程数据加载失败，请尝试刷新！");
    return;
  }
  Object.assign(form, res.data);
  videos.value = res.data.videoVOS;
  console.log("form:", form);
  file.value = {
    url: form.coverUrl,
  };
};

// 上传封面图
const file = ref();
const onChange = (_: any, currentFile: any) => {
  file.value = {
    ...currentFile,
    // url: URL.createObjectURL(currentFile.file),
  };
};
const {
  uploadFile,
  fileInfo,
  onStart,
  onChange: uploadOnChange,
  onProgressChange,
  parseFile,
} = useUpload();
// onStart.on(onStartFunction);
let isFirst = true;
const uploadCourseCover = (option: RequestOption) => {
  const { onProgress, onSuccess, onError } = option;
  if (option.fileItem.file) {
    compressImage(option.fileItem.file).then((compressedFile: File) => {
      // const downloadLink = document.createElement("a");
      // downloadLink.href = URL.createObjectURL(compressedFile);
      // downloadLink.download = compressedFile.name;
      // downloadLink.click();
      // URL.revokeObjectURL(downloadLink.href);
      uploadFile(compressedFile, "course");
    });
  }
  if (isFirst) {
    uploadOnChange((val: any) => {
      if (val == "success") {
        file.value.url = fileInfo.value?.downloadUrl;
        form.coverUrl = fileInfo.value?.downloadUrl ?? "";
        onSuccess("成功上传了");
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

const form = reactive({
  id: undefined,
  name: "",
  coverUrl: "",
  intro: "",
});
const handleSubmit = async (data: any) => {
  // 校验合法性
  if (!form.name || !form.coverUrl || !form.intro || videos.value.length <= 0) {
    message.error("数据不完整 请填充完整！");
    return;
  }
  let res;
  if (isUpdate) {
    res = await CourseAppControllerService.updateCourseBaseInfoUsingPost({
      ...form,
    });
  } else {
    const params = {
      courseVO: {
        ...form,
      },
      videoVOList: videos.value,
    };
    res = await CourseAppControllerService.addCourseUsingPost(params);
  }
  if (res.code != 0) {
    message.error("提交失败：" + res.msg);
    return;
  }
  message.success("提交成功");
  router.push({
    path: "/txing/course/video/play/" + (isUpdate ? form.id : res.data),
  });
};

// 添加小节 对话框
const visible = ref(false);

const handleClick = () => {
  visible.value = true;
};
const handleCancel = () => {
  visible.value = false;
  isUploadingVideo.value = false;
};
// 更新小节数组
const updateVideos = (newVideoInfo: VideoBaseInfo) => {
  // videos.value = videos.value.map((video) => {
  //   if (newVideoInfo.id && video.id == newVideoInfo.id) {
  //     return newVideoInfo; // 使用新的对象替换原对象
  //   } else {
  //     return video; // 其他对象保持不变
  //   }
  // });
  videos.value[index] = newVideoInfo;
};

const onBeforeCreateVideo = () => {
  // 校验
  if (!curVideoInfo.value.name) {
    message.warning("请填写名称");
    return false;
  } else if (!curVideoInfo.value.fileId) {
    message.warning("请等待视频上传完成");
    return false;
  } else {
    return true;
  }
};
const onCreateVideo = async () => {
  if (!curVideoInfo.value.orderNo || curVideoInfo.value.orderNo <= 0) {
    curVideoInfo.value.orderNo = videos.value.length + 1;
  }
  let newVideoInfo = { id: undefined };
  Object.assign(newVideoInfo, curVideoInfo.value);
  if (isUpdate) {
    if (isUploadingVideo.value) {
      // 更新
      // 提交到后端
      const res =
        await CourseAppControllerService.addOrUpdateCourseVideoUsingPost({
          ...newVideoInfo,
          courseId: form.id,
        });
      if (res.code != 0) {
        message.error("提交失败，请稍后重试！");
        return;
      }
      // 更新小节数组
      videos.value[index] = newVideoInfo;
    } else {
      // 更新下的新增
      // newVideoInfo.courseId =
      // 提交到后端
      const res =
        await CourseAppControllerService.addOrUpdateCourseVideoUsingPost({
          ...newVideoInfo,
          courseId: form.id,
        });
      if (res.code != 0) {
        message.error("提交失败，请稍后重试！");
        return;
      }
      videos.value.push(newVideoInfo);
    }
  } else {
    // 新建下
    if (isUploadingVideo.value) {
      // 更新小节数组
      videos.value[index] = newVideoInfo;
    } else {
      // 新建下的创建
      videos.value.push(newVideoInfo);
    }
  }
  // 按照 id 值升序排序
  videos.value.sort((a, b) => a.orderNo - b.orderNo);
  isUploadingVideo.value = false;
  visible.value = false;
  curVideoInfo.value = {
    name: "",
    orderNo: 0,
  };
  videoFile.value = undefined;
};

// 上传视频
let videoFile = ref();
// const onBeforeUpload = () => {
//   alert("出发");
// };
const onVideoUploadChange = (_: any, currentFile: any) => {
  videoFile.value = {
    ...currentFile,
    // url: URL.createObjectURL(currentFile.file),
  };
};

const videos = ref<VideoBaseInfo[]>([]);

// 向后端请求上传签名
const getSignature = () => {
  return CourseAppControllerService.getVodSignUsingGet().then((response) => {
    return response.data;
  });
};

const getIMg = (file: File) => {
  return new Promise<any>((resolve) => {
    //file参数传入的是视频文件流
    const video = document.createElement("video");
    video.setAttribute("crossorign", "anonymous");
    video.setAttribute("controls", "controls");
    video.setAttribute("autoplay", "autoplay");
    // 这样就不用处理跨域问题了
    video.volume = 0;
    video.setAttribute("src", window.URL.createObjectURL(file));
    video.setAttribute("width", "150");
    video.setAttribute("height", "84");
    let coverFile: File;
    video.addEventListener("loadeddata", () => {
      // 创建canvas画布
      const canvas = document.createElement("canvas");
      canvas.width = video.width; // 设置画布的长宽也就是图片的长宽
      canvas.height = video.height;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      const img = document.createElement("img");
      thumbnailUrl.value = canvas.toDataURL("image/png");
      canvas.toBlob((blob) => {
        coverFile = new File([blob as Blob], "thumbnail.jpg", {
          type: "image/jpeg",
        });
        resolve({
          coverFile: coverFile,
          duration: video.duration,
        });
        // 假设 file 是包含要下载图片的 File 对象
        // const downloadLink = document.createElement("a");
        // downloadLink.href = URL.createObjectURL(thumbnailFile);
        // downloadLink.download = thumbnailFile.name;
        // downloadLink.click();
        // URL.revokeObjectURL(downloadLink.href);
        // const myObject = URL.createObjectURL(thumbnailFile);
        // // 现在 thumbnailFile 就是视频文件的首帧图片文件
        // console.log(myObject);
        // // 你可以继续处理这个文件，比如进行上传操作
      }, "image/jpeg");

      // canvas.toBlob((blob) => {
      //   // 压缩图片
      //   const compressedFile = new Promise<any>((resolveCompress) => {
      //     const reader = new FileReader();
      //     reader.readAsDataURL(blob);
      //     reader.onload = () => {
      //       const image = new Image();
      //       image.src = reader.result as string;
      //       image.onload = () => {
      //         const quality = 0.5; // 调节压缩质量，根据实际情况调整
      //         const canvasCompressed = document.createElement("canvas");
      //         const ctx = canvasCompressed.getContext(
      //           "2d"
      //         ) as CanvasRenderingContext2D;
      //         canvasCompressed.width = image.width;
      //         canvasCompressed.height = image.height;
      //         ctx.drawImage(
      //           image,
      //           0,
      //           0,
      //           canvasCompressed.width,
      //           canvasCompressed.height
      //         );
      //         canvasCompressed.toBlob(
      //           (blobCompressed) => {
      //             const fileCompressed = new File(
      //               [blobCompressed as Blob],
      //               "thumbnail.jpg",
      //               { type: "image/jpeg" }
      //             );
      //             resolveCompress(fileCompressed);
      //           },
      //           "image/jpeg",
      //           quality
      //         );
      //       };
      //     };
      //   });
      //
      //   compressedFile.then((fileCompressed) => {
      //     coverFile = fileCompressed;
      //     const downloadLink = document.createElement("a");
      //     downloadLink.href = URL.createObjectURL(coverFile);
      //     downloadLink.download = coverFile.name;
      //     downloadLink.click();
      //     URL.revokeObjectURL(downloadLink.href);
      //     resolve({
      //       coverFile: coverFile,
      //       duration: video.duration,
      //     });
      //   });
      // }, "image/jpeg");
    });
  });

  // const video = document.createElement("video");
  // video.setAttribute("crossorigin", "anonymous");
  // video.setAttribute("controls", "controls");
  // video.setAttribute("autoplay", "autoplay");
  // video.volume = 0;
  // video.setAttribute("src", window.URL.createObjectURL(file));
  // video.setAttribute("width", "150");
  // video.setAttribute("height", "84");
  // let coverFile: File;
  // video.addEventListener("loadeddata", () => {
  //   const canvas = document.createElement("canvas");
  //   canvas.width = video.width;
  //   canvas.height = video.height;
  //   canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  //
  //
  // });
};

const thumbnailUrl = ref<string>(""); // 保存视频首帧图片的 URL
let curVideoInfo = ref<VideoBaseInfo>({
  name: "",
  orderNo: 0,
});
const customUpload = (option: RequestOption) => {
  const { onProgress, onSuccess, onError } = option;

  if (option.fileItem.file) {
    // eslint-disable-next-line no-undef
    getIMg(option.fileItem.file).then((info) => {
      // const downloadLink = document.createElement("a");
      // downloadLink.href = URL.createObjectURL(coverFile);
      // downloadLink.download = coverFile.name;
      // downloadLink.click();
      // URL.revokeObjectURL(downloadLink.href);

      // 通过 import 引入的话，new TcVod(opts) 即可
      // new TcVod.default(opts) 是 script 引入 的用法
      const tcVod = new TcVod({
        getSignature: getSignature, // 前文中所述的获取上传签名的函数
      });

      const uploader = tcVod.upload({
        mediaFile: option.fileItem.file, // 媒体文件（视频或音频或图片），类型为 File
        coverFile: info.coverFile,
        enableResume: true,
        enableRaceRegion: false,
      });
      uploader.on("media_progress", function (info) {
        // console.log(info.percent); // 进度
        onProgress(info.percent);
      });
      uploader
        .done()
        .then(function (doneResult) {
          // deal with doneResult
          curVideoInfo.value = {
            ...curVideoInfo.value,
            fileId: doneResult.fileId,
            videoUrl: doneResult.video.url,
            coverUrl: doneResult.cover.url,
            times: Number(info.duration.toFixed(0)),
          };
          onSuccess("成功了");
        })
        .catch(function (err) {
          // deal with error
          onError("失败了");
        });
      // 回调结果说明
      // type doneResult = {
      //   fileId: string,
      //   video: {
      //     url: string
      //   },
      //   cover: {
      //     url: string
      //   }
      // }
    });
  }
};
// 视频上传前校验
const onBeforeUpload = async (file: File) => {
  const info = await parseFile(file);
  const videoSuffixs = ["mp4"];
  if (!videoSuffixs.includes(info.suffix)) {
    message.error("仅支持MP4视频文件");
    return false;
  }
  // 限制文件大小
  if (info.size > 50 * 1024 * 1024) {
    message.error(`文件大小不能超过${50}MB` + info.size);
    return false;
  }
  return true;
};
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

  .arco-upload-picture-card {
    height: 150px !important;
    width: 250px !important;
  }

  .arco-upload-list-picture {
    height: 150px;
    width: auto;
    max-height: 300px;
    /*object-fit: cover;*/
  }
}
</style>
