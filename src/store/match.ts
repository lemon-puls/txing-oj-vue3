import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { QuestionSubmitDoRequest } from "../../generated";
import { useUserStore } from "@/store/user";
import moment, { now } from "moment/moment";
import { RoomTypeEnum } from "@/enume";
import { useRouter } from "vue-router";
import { UserShowVO } from "@/service/types";

export const useMatchStore = defineStore("match", () => {
  const pkUserShowVO = ref<UserShowVO>();

  const setPkUserShowVO = (userShowVO: UserShowVO) => {
    pkUserShowVO.value = userShowVO;
  };
  return {
    pkUserShowVO,
    setPkUserShowVO,
  };
});
