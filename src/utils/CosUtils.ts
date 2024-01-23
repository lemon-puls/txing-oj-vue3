import COS from "cos-js-sdk-v5";
import { FileControllerService } from "../../generated";

const cos = new COS({
  // getAuthorization 必选参数
  getAuthorization: function (options, callback) {
    // 初始化时不会调用，只有调用 cos 方法（例如 cos.putObject）时才会进入
    // 异步获取临时密钥
    // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
    // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
    // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048

    FileControllerService.getCosCredentialsUsingGet().then((res) => {
      if (res.code !== 0) {
        console.log("获取Cos临时秘钥失败: ", res.msg);
        return;
      }
      const data = res.data;
      const credentials = data.credentials;
      callback({
        TmpSecretId: credentials.tmpSecretId,
        TmpSecretKey: credentials.tmpSecretKey,
        SecurityToken: credentials.sessionToken,
        // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
        StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
        ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
      });
    });
  },
});

const generateUUID = () => {
  // 生成随机的 UUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const handleFileInUploading = (file: File, bussiness: string) => {
  const prefix = file.name.slice(file.name.lastIndexOf("."));
  cos.uploadFile(
    {
      Bucket: "xxx" /* 填写自己的 bucket，必须字段 */,
      Region: "xxx" /* 存储桶所在地域，必须字段 */,
      Key:
        bussiness +
        "/" +
        generateUUID() +
        prefix /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */,
      Body: file, // 上传文件对象
      // SliceSize:
      //   1024 *
      //   1024 *
      //   5 /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */,
      onProgress: function (progressData) {
        console.log(JSON.stringify(progressData));
      },
    },
    function (err, data) {
      if (err) {
        console.log("上传失败", err);
      } else {
        alert("上传成功");
        console.log("上传成功:", data);
      }
    }
  );
};
