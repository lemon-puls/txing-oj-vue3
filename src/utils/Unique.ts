import { UserItem } from "@/service/types";

export const uniqueUserList = (arr: UserItem[]) => {
  return Object.values(
    Object.fromEntries(arr.map((item) => [item.userId, item]))
  );
};
