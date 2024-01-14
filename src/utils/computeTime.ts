import dayjs, { ConfigType, OpUnitType } from "dayjs";

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
