import { defineStore } from "pinia";
import { ref } from "vue";
import { QuestionSubmitDoRequest } from "../../generated";
import { useUserStore } from "@/store/user";
import moment, { now } from "moment";

export const useMatchStore = defineStore(
  "match",
  () => {
    const matchSubmits = ref<QuestionSubmitDoRequest[]>([]);

    const initSubmits = (questionIds: number[]) => {
      const oldVal = localStorage.getItem("match");
      console.log("打印", oldVal);
      if (oldVal == null || oldVal === "") {
        for (let i = 0; i < questionIds.length; i++) {
          matchSubmits.value[i] = {
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
      localStorage.removeItem("match");
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
