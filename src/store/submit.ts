import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { QuestionSubmitDoRequest } from "../../generated";
import { useUserStore } from "@/store/user";
import moment, { now } from "moment/moment";
import { RoomTypeEnum } from "@/enume";
import { useRouter } from "vue-router";
import CodeInitConstant from "@/service/constant/CodeInitConstant";

export const useSubmitStore = defineStore(
  "submit",
  () => {
    const submit = ref<QuestionSubmitDoRequest>({});
    // 当前题目的Id
    // const questionId = ref(-1);
    const initSubmit = (questionId: any) => {
      const oldVal = localStorage.getItem("submit");
      let oldSubmit = null;
      let oldJsonVal;
      if (oldVal !== null) {
        oldJsonVal = JSON.parse(oldVal);
        oldSubmit = oldJsonVal?.submit;
      }
      if (
        oldSubmit == null ||
        oldSubmit === "" ||
        oldSubmit.questionId != questionId
      ) {
        submit.value = {
          language: "java",
          code: CodeInitConstant.JAVA,
          questionId: questionId,
        };
      }
    };
    /**
     * 重置
     */
    const resetSubmit = () => {
      localStorage.removeItem("submit");
    };
    /**
     * 更新数据
     */
    const updateSubmit = (newVal: any) => {
      submit.value = newVal;
    };

    return {
      submit,
      initSubmit,
      resetSubmit,
      updateSubmit,
    };
  },
  {
    persist: true,
  }
);
