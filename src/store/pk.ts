import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { QuestionSubmitDoRequest } from "../../generated";
import { useUserStore } from "@/store/user";
import moment, { now } from "moment/moment";
import { RoomTypeEnum } from "@/enume";
import { useRouter } from "vue-router";

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
      console.log("执行了initPkSubmit", oldVal, questionId);
      let oldPkSubmit = null;
      if (oldVal !== null) {
        oldPkSubmit = JSON.parse(oldVal)?.pkSubmit;
      }
      if (oldPkSubmit == null || oldPkSubmit === "") {
        pkSubmit.value = {
          language: "java",
          code:
            "import java.util.*;\n" +
            "/**\n" +
            " * @author " +
            useUserStore().loginUser.userName +
            "\n" +
            " * @date " +
            moment(now()).format("YYYY-MM-DD HH:mm:ss") +
            "\n" +
            " */\n" +
            "public class Main {\n" +
            "\n" +
            "    public static void main(String[] args) {\n" +
            "        // 请开始您的作答\n" +
            "        Scanner scanner = new Scanner(System.in);\n" +
            "    \n" +
            "    }\n" +
            "}",
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
