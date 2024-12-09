import { createEventHook } from "@vueuse/core";
import { cos } from "@/utils/CosUtils";
import { ref } from "vue";
import message from "@arco-design/web-vue/es/message";

export type FileInfo = {
  name: string;
  type: string;
  size: number;
  suffix: string;
  width?: number;
  height?: number;
  tempUrl?: string;
  downloadUrl?: string;
  second?: number;
  thumbWidth?: number;
  thumbHeight?: number;
  thumbUrl?: string;
};

// 从环境变量获取配置
const MAX_FILE_SIZE =
  Number(process.env.VUE_APP_MAX_FILE_SIZE ?? 100) * 1024 * 1024;
const COS_BUCKET = process.env.VUE_APP_COS_BUCKET ?? "";
const COS_REGION = process.env.VUE_APP_COS_REGION ?? "";

console.log("MAX_FILE_SIZE", MAX_FILE_SIZE, COS_REGION, COS_BUCKET);

if (!COS_BUCKET || !COS_REGION) {
  console.error("请在环境变量中配置 VUE_APP_COS_BUCKET 和 VUE_APP_COS_REGION");
}

export const useUpload = () => {
  // 是否正在上传中
  const isUploading = ref(false);
  // 上传进度
  const progress = ref(0);
  // 文件信息
  const fileInfo = ref<FileInfo | null>(null);
  const { on: onChange, trigger } = createEventHook();
  const { on: onProgressChange, trigger: progressTrigger } = createEventHook();
  const onStart = createEventHook<any>();

  // 上传文件
  const handleFileInUploading = (
    file: File,
    bussiness: string,
    inner?: boolean
  ) => {
    isUploading.value = true;
    const suffix = file.name.slice(file.name.lastIndexOf("."));
    cos.uploadFile(
      {
        Bucket: COS_BUCKET,
        Region: COS_REGION,
        Key:
          bussiness +
          "/" +
          generateUUID() +
          suffix /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
        Body: file, // 上传文件对象
        // SliceSize:
        //   1024 *
        //   1024 *
        //   5 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
        onProgress: function (progressData) {
          // console.log(JSON.stringify(progressData));
          if (!inner) {
            progress.value = Math.round(
              (progressData.loaded / progressData.total) * 100
            );
            progressTrigger(progress.value);
          }
        },
      },
      function (err, data) {
        isUploading.value = false;
        if (inner) return;
        if (err) {
          trigger("fail");
        } else {
          const downloadUrl = "https://" + data.Location;
          if (fileInfo.value) {
            fileInfo.value.downloadUrl = downloadUrl;
          }
          trigger("success");
        }
      }
    );
  };
  /**
   * 获取图片宽高
   */
  const getImgWH = (file: File) => {
    const img = new Image();
    const tempUrl = URL.createObjectURL(file);
    img.src = tempUrl;
    return new Promise((resolve, reject) => {
      img.onload = () => {
        resolve({ width: img.width, height: img.height, tempUrl });
      };
      img.onerror = () => {
        // 释放临时URL资源
        URL.revokeObjectURL(tempUrl);
        reject({ width: 0, height: 0, url: null });
      };
    });
  };

  /**
   * 解析文件
   */
  const parseFile = async (file: File, addParams: Record<string, any> = {}) => {
    const { name, size, type } = file;
    const suffix = name.split(".").pop()?.trim().toLowerCase() || "";
    const baseInfo = { name, size, type, suffix, ...addParams };

    if (type.includes("image")) {
      const { width, height, tempUrl } = (await getImgWH(file)) as any;
      return { ...baseInfo, width, height, tempUrl };
    }
    return baseInfo;
  };

  /**
   * 上传文件
   * @param file
   * @param addParams
   */
  const uploadFile = async (
    file: File,
    bussiness: string,
    addParams?: Record<string, any>
  ) => {
    if (isUploading.value || !file) {
      return;
    }
    const info = await parseFile(file, addParams);
    // 限制文件大小
    if (info.size > MAX_FILE_SIZE) {
      message.error(`文件大小不能超过${process.env.VUE_APP_MAX_FILE_SIZE}MB`);
      return;
    }
    fileInfo.value = { ...info };
    onStart.trigger(fileInfo);
    handleFileInUploading(file, bussiness);
  };

  return {
    handleFileInUploading,
    uploadFile,
    isUploading,
    fileInfo,
    onStart,
    onChange,
    onProgressChange,
    parseFile,
  };
};

const generateUUID = () => {
  // 生成随机的 UUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
