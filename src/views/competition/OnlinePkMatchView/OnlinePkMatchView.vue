<!--
* @OnlinePkMatchView
* @author Li zhiwei
* @date 2024/2/19 17:54
-->

<template>
  <a-spin :loading="false" tip="请稍等，正在为您匹配对手..." dot>
    <div id="OnlinePkMatchView">
      <!--    头部区域-->
      <div class="header">
        <a-row
          class="grid-demo"
          :style="{
            height: '50px',
          }"
        >
          <a-col
            flex="30%"
            :style="{
              height: '50px',
            }"
          >
            <div
              style="
                display: flex;
                align-items: center;
                height: 100%;
                margin-left: 10px;
                color: #979797;
              "
            >
              <div>
                <svg-icon icon="back" size="18px" />
                <span>放弃竞赛</span>
              </div>
            </div>
          </a-col>
          <a-col flex="auto" style="height: 100%">
            <div
              style="
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 18px;
                column-gap: 5px;
              "
            >
              <span>正在与</span>
              <img
                style="border-radius: 50%; height: 25px; width: 25px"
                src="https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1/PYorLjF1-%E5%BE%80%E6%98%94%E6%B1%97%E6%B0%B4_The%20sweat%20of%20the%20past_1_SaYoii_%E6%9D%A5%E8%87%AA%E5%B0%8F%E7%BA%A2%E4%B9%A6%E7%BD%91%E9%A1%B5%E7%89%88.jpg"
              />
              <span>明天会更好</span>
              <span style="color: red">PK</span>
            </div>
          </a-col>
          <a-col flex="30%" style="height: 100%">
            <div
              style="
                display: flex;
                justify-content: flex-end;
                align-items: center;
                height: 100%;
                column-gap: 15px;
                margin-right: 10px;
              "
            >
              <div>
                <span>对手状态：</span
                ><span style="color: #ff7300">正在作答</span>
              </div>
              <a-countdown
                :value="Date.now() + 1000 * 60 * 60 * 2"
                :now="Date.now()"
              />
              <a-button type="outline" status="success" shape="round"
                >完成作答
              </a-button>
            </div>
          </a-col>
        </a-row>
      </div>
      <!--    答题区域-->
      <a-split
        :style="{
          width: '100%',
          overflow: 'scroll',
          height: 'calc(100vh - 60px)',
          minWidth: '500px',
        }"
        :default-size="0.4"
      >
        <template #first>
          <a-card :title="question.title">
            <a-descriptions title="题目限制" :column="{ xs: 1, md: 2, lg: 3 }">
              <a-descriptions-item label="时间限制">
                {{ question.judgeConfig.timeLimit ?? 0 }} ms
              </a-descriptions-item>
              <a-descriptions-item label="内存限制">
                {{
                  `${(question.judgeConfig.memoryLimit / (1024 * 1024)).toFixed(
                    2
                  )} MB`
                }}
              </a-descriptions-item>
            </a-descriptions>
            <MdViewer :value="question.content || ''" />
            <!--          <div id="questionFavourId">-->
            <!--            <icon-star-fill v-if="isFavour" :size="30" @click="clickFavour" />-->
            <!--            <icon-star v-else :size="30" @click="clickFavour"></icon-star>-->
            <!--            <span style="margin-left: 5px">收藏</span>-->
            <!--          </div>-->
            <template #extra>
              <a-space wrap>
                <a-tag
                  v-for="(tag, index) of question.tags"
                  :key="index"
                  color="green"
                  >{{ tag }}
                </a-tag>
              </a-space>
            </template>
          </a-card>
        </template>
        <template #second>
          <div>
            <a-split
              direction="vertical"
              :default-size="0.7"
              :style="{ height: 'calc(100vh - 77px)' }"
            >
              <template #first>
                <!--              display: flex; flex-direction: column-->
                <div style="height: 100%">
                  <a-form
                    style="padding-left: 10px; box-sizing: border-box"
                    :model="form"
                    layout="inline"
                  >
                    <a-form-item
                      field="title"
                      label="编程语言"
                      style="min-width: 240px"
                    >
                      <a-select
                        v-model="java"
                        :style="{ width: '320px' }"
                        placeholder="选择语言"
                        @change="onlanguagechange"
                      >
                        <a-option>java</a-option>
                        <a-option>cpp</a-option>
                        <a-option>go</a-option>
                      </a-select>
                    </a-form-item>
                  </a-form>
                  <CodeEditor
                    value="helloworld"
                    language="java"
                    :handleChange="changeCode"
                    style="height: 100%"
                  />
                </div>
              </template>
              <template #second>
                <div
                  style="height: 100%; padding: 10px; box-sizing: border-box"
                >
                  <div
                    class="exec-area-head"
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      box-sizing: border-box;
                    "
                  >
                    <span style="color: green">执行结果</span>
                    <div style="display: flex; column-gap: 10px">
                      <a-button type="outline" status="success">运行</a-button>
                      <a-button type="outline" status="success"
                        >提交并保存
                      </a-button>
                    </div>
                  </div>
                  <hr />
                  <div class="exec-area-result">
                    <span>执行成功</span>
                  </div>
                </div>
              </template>
            </a-split>
          </div>
        </template>
      </a-split>
    </div>
  </a-spin>
</template>

<style lang="scss">
#OnlinePkMatchView {
  //height: 100vh;

  .header {
    height: 50px;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
  }

  .arco-space-horizontal .arco-space-item {
    margin-bottom: 0 !important;
  }
}
</style>

<script setup lang="ts">
import MdViewer from "@/components/MdViewer.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import SvgIcon from "@/icons/SvgIcon";

const question = {
  id: "1732346680676282369",
  title: "两数相加",
  content:
    '给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。\n\n请你将两个数相加，并以相同形式返回一个表示和的链表。\n\n你可以假设除了数字 0 之外，这两个数都不会以 0 开头。\n\n示例 1：\n\n\n![image.png](https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/common/1726766580186198017/TeyMC1xd-image.png "image.png")\n输入：l1 = [2,4,3], l2 = [5,6,4]\n输出：[7,0,8]\n解释：342 + 465 = 807.\n\n示例 2：\n\n输入：l1 = [0], l2 = [0]\n输出：[0]\n\n示例 3：\n\n输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\n输出：[8,9,9,9,0,0,0,1]\n\n提示：\n每个链表中的节点数在范围 [1, 100] 内\n0 <= Node.val <= 9\n题目数据保证列表表示的数字不含前导零',
  answer:
    '```java\nimport java.util.*;\n/**\n * @author lemon123456\n * @date 2023-12-06 23:40:17\n */\npublic class Main {\n\n    public static void main(String[] args) {\n        // 请开始您的作答\n        Scanner scanner = new Scanner(System.in);\n        int n = scanner.nextInt();\n        int m = scanner.nextInt();\n        ListNode head1 = new ListNode(-1);\n        ListNode head2 = new ListNode(-1);\n        ListNode tail1 = head1;\n        ListNode tail2 = head2;\n        for (int i = 0; i < n; i++) {\n            tail1.next = new ListNode(scanner.nextInt());\n            tail1 = tail1.next;\n        }\n        for (int i = 0; i < m; i++) {\n            tail2.next = new ListNode(scanner.nextInt());\n            tail2 = tail2.next;\n        }\n        head1 = head1.next;\n        head2 = head2.next;\n        ListNode head = null, tail = null;\n        int carry = 0;\n        while (head1 != null || head2 != null) {\n            int n1 = head1 != null ? head1.val : 0;\n            int n2 = head2 != null ? head2.val : 0;\n            int sum = n1 + n2 + carry;\n            if (head == null) {\n                head = tail = new ListNode(sum % 10);\n            } else {\n                tail.next = new ListNode(sum % 10);\n                tail = tail.next;\n            }\n            carry = sum / 10;\n            if (head1 != null) {\n                head1 = head1.next;\n            }\n            if (head2 != null) {\n                head2 = head2.next;\n            }\n        }\n        if (carry > 0) {\n            tail.next = new ListNode(carry);\n        }\n        ListNode curr = head;\n        while (curr != null) {\n            System.out.print(curr.val + " ");\n            curr = curr.next;\n        }\n    }\n}\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode() {\n    }\n    ListNode(int val) {\n        this.val = val;\n    }\n    ListNode(int val, ListNode next) {\n        this.val = val;\n        this.next = next;\n    }\n}',
  tags: ["基础题", "算法"],
  submitNum: 4,
  acceptedNum: 2,
  judgeConfig: {
    timeLimit: "10000",
    memoryLimit: "5000000",
  },
  thumbNum: 0,
  favourNum: 0,
  userId: "1",
  createTime: "2023-12-06T10:30:09.000+00:00",
  updateTime: "2024-02-01T05:27:53.000+00:00",
  userVO: {
    id: "1",
    userName: "lemon123456",
    userAvatar:
      "https://txing-oj-1311424669.cos.ap-guangzhou.myqcloud.com/post_cover/1/PYorLjF1-往昔汗水_The sweat of the past_1_SaYoii_来自小红书网页版.jpg",
    userProfile: null,
    userRole: "admin",
    createTime: "2023-11-21T00:56:49.000+00:00",
    school: "育才大学",
    profession: "网络工程",
    workExperience: null,
    questionCount: 340,
    acceptedRate: 0.75,
    submitCount: 156,
    acceptedCount: 101,
    personSign: "那年 我双手插兜 不知道什么是对手",
    needRefresh: true,
    lastOpsTime: "2024-02-17T15:52:00.000+00:00",
    activeStatus: 1,
  },
  isFavour: false,
};
</script>
