import dayjs, { ConfigType, OpUnitType } from "dayjs";
import { MessageShow } from "@/service/types";

const intervalTime = 5 * 60 * 1000;
const computedCountMax = 20;
let computedCount = 0;

export const isDiffNow = ({
  time,
  unit,
  diff,
}: {
  unit: OpUnitType;
  time: ConfigType;
  diff: number;
}): boolean => {
  return dayjs().diff(dayjs(time), unit) > diff;
};

export const isDiffNow10Min = (time: ConfigType): boolean => {
  return isDiffNow({ time, unit: "minute", diff: 10 });
};

export const computedTimeNode = (list: MessageShow[], needFirst = true) => {
  if (!list || list.length === 0) {
    return [];
  }
  const temp = needFirst ? [list[0]] : [];
  for (let i = 1; i < list.length; i++) {
    const cur = list[i];
    const pre = list[i - 1];
    temp.push(checkAddTimeBlock(cur, pre));
  }
  return temp;
};

const checkAddTimeBlock = (cur: MessageShow, pre: MessageShow) => {
  if (
    (pre && cur.message.sendTime - pre.message.sendTime > intervalTime) ||
    computedCount >= computedCountMax
  ) {
    computedCount = 0;
    return { ...cur, timeNode: timeToStr(cur.message.sendTime) };
  } else {
    computedCount += 1;
    return cur;
  }
};

// 时间格式化为相对文本，仿微信风格
const timeToStr = (time: number) => {
  const sendTime = dayjs(time);
  // 计算今天和消息的发送时间间隔多少天
  const gapDay = dayjs().endOf("day").diff(sendTime, "day");
  // 消息与今天是否 7 天及以上了
  const isLastWeek = gapDay >= 7;
  // 今天显示时分, 昨天的显示 `昨天 时分`, 今天往前一周内，显示`周几 时分`， 再前面显示日期 `年月日 时分`
  return gapDay < 2
    ? `${gapDay === 1 ? "昨天 " : ""}${sendTime.format("HH:mm")}`
    : isLastWeek
    ? sendTime.format("YYYY-MM-DD HH:mm")
    : dayjs(sendTime).format("dddd HH:mm");
};
