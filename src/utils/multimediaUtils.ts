import { MsgTypeEnum } from "@/enume";

/**
 * 生成消息体
 * @param fileInfo
 * @param msgType
 * @param isMock
 */
export const generateBody = (
  fileInfo: any,
  msgType: MsgTypeEnum,
  isMock?: boolean
) => {
  const {
    name,
    type,
    size,
    suffix,
    width,
    height,
    tempUrl,
    downloadUrl,
    second,
    thumbWidth,
    thumbHeight,
    thumbUrl,
  } = fileInfo;
  const url = isMock ? tempUrl : downloadUrl;
  const baseBody = { size, url };
  let body = {};
  if (msgType === MsgTypeEnum.IMG) {
    body = { ...baseBody, width, height };
  }
  return { body, type: msgType };
};

/**
 * 图片消息尺寸适配
 */
export const formatImage = (
  width: number,
  height: number,
  option = {
    maxWidth: 200,
    maxHeight: 150,
  }
): number => {
  const { maxWidth, maxHeight } = option;
  if (width < maxWidth && height < maxHeight) {
    return height;
  } else if (width > height) {
    return (maxWidth / width) * height;
  } else if (width === height || width < height) {
    return maxHeight;
  }
  return maxHeight;
};
