import { defineStore } from "pinia";
import { ref } from "vue";
import { QuestionSubmitDoRequest } from "../../generated";
import { useUserStore } from "@/store/user";
import moment, { now } from "moment";
import CodeInitConstant from "@/service/constant/CodeInitConstant";

export const useWeekMatchStore = defineStore(
  "weekmatch",
  () => {
    const matchSubmits = ref<QuestionSubmitDoRequest[]>([]);

    const initSubmits = (questionIds: number[]) => {
      const oldVal = localStorage.getItem("weekmatch");
      if (oldVal == null || oldVal === "") {
        for (let i = 0; i < questionIds.length; i++) {
          matchSubmits.value[i] = {
            language: "java",
            code: CodeInitConstant.JAVA,
            questionId: questionIds[i],
          };
        }
      }
    };
    /**
     * 重置
     */
    const resetMatchSubmits = () => {
      matchSubmits.value.slice(0, matchSubmits.value.length);
      localStorage.removeItem("weekmatch");
    };

    const pkSubmit = ref<QuestionSubmitDoRequest>();
    const initPkSubmit = (questionId: number) => {
      const oldVal = localStorage.getItem("weekmatch");
      if (oldVal == null || oldVal === "") {
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
      matchSubmits.value.slice(0, matchSubmits.value.length);
      localStorage.removeItem("weekmatch");
    };
    return {
      matchSubmits,
      initSubmits,
      resetMatchSubmits,
    };
  },
  {
    persist: true,
  }
);
