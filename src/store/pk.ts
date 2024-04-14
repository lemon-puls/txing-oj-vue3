import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { QuestionSubmitDoRequest } from "../../generated";
import { useUserStore } from "@/store/user";
import moment, { now } from "moment/moment";
import { RoomTypeEnum } from "@/enume";
import { useRouter } from "vue-router";
import CodeInitConstant from "@/service/constant/CodeInitConstant";

export const usePkStore = defineStore(
  "pk",
  () => {
    const pkSubmit = ref<QuestionSubmitDoRequest>({});
    // 是否匹配成功
    const isMatchSuccess = ref(false);
    // 当前PK的matchId
    const currentMatchId = ref(-1);
    const initPkSubmit = (questionId: number) => {
      const oldVal = localStorage.getItem("pk");
      let oldPkSubmit = null;
      if (oldVal !== null) {
        oldPkSubmit = JSON.parse(oldVal)?.pkSubmit;
      }
      if (oldPkSubmit == null || oldPkSubmit === "") {
        pkSubmit.value = {
          language: "java",
          code: CodeInitConstant.JAVA,
          questionId: questionId,
        };
      }
    };
    /**
     * 重置
     */
    const resetPkSubmit = () => {
      localStorage.removeItem("pk");
    };

    /**
     * 匹配成功
     */
    const updatePkMatchData = (flag: boolean, matchId: number) => {
      currentMatchId.value = matchId;
      isMatchSuccess.value = flag;
    };
    return {
      pkSubmit,
      initPkSubmit,
      resetPkSubmit,
      isMatchSuccess,
      updatePkMatchData,
      currentMatchId,
    };
  },
  {
    persist: true,
  }
);
