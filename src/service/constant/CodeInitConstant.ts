export const JAVA =
  "class Solution {\n" +
  "    public void answer() {\n" +
  "        Scanner scanner = new Scanner(System.in);\n" +
  "\n" +
  "    }\n" +
  "}";

export const PYTHON =
  "class Solution:\n" +
  "    def answer(self):\n" +
  "        # 在这里输入你的代码";

export const C = "void answer() {\n" + "    // 在这里输入你的代码\n" + "}";

export const JAVASCRIPT =
  "function answer() {\n" +
  "    // 从命令行读取输入\n" +
  "    const readline = require('readline');\n" +
  "    \n" +
  "    const rl = readline.createInterface({\n" +
  "        input: process.stdin,\n" +
  "        output: null\n" +
  "    });\n" +
  "    rl.question('', (input) => {\n" +
  "        // 在这里编写你的代码\n" +
  "        \n" +
  "        rl.close();\n" +
  "    });\n" +
  "}\n";

const getCodeInit = (language: string) => {
  switch (language) {
    case "java":
      return JAVA;
    case "javascript":
      return JAVASCRIPT;
    case "python":
      return PYTHON;
    case "c":
      return C;
    default:
      return "";
  }
};

export default { JAVA, C, PYTHON, JAVASCRIPT, getCodeInit };
