<template>
  <div id="virtualListTestId">
    <!--    <VirtualList-->
    <!--      ref="virtualListRef"-->
    <!--      class="virtual-list scroll-hover"-->
    <!--      dataPropName="data"-->
    <!--      :data="chatMessageList"-->
    <!--      :data-key="getKey"-->
    <!--      :item="MsgItem"-->
    <!--      :size="20"-->
    <!--      @totop="onToTop"-->
    <!--      @scroll="onScroll"-->
    <!--      @ok="goToBottom"-->
    <!--      @tobottom="tobottom"-->
    <!--    />-->
    <svg style="width = 40px; height: 40px">
      <!-- use绑定id -->
      <use xlink:href="#icon-coffee" fill="pink" />
    </svg>
    aSssadasD
    <SvgIcon icon="lock" />
  </div>
</template>

<script setup lang="ts">
import VirtualList from "@/components/VirtualList";
import { provide, ref } from "vue";
import { throttle } from "lodash";
import MsgItem from "@/views/test/MsgItem.vue";
import SvgIcon from "@/icons/SvgIcon";

const chatMessageList = ref([
  {
    id: 1,
    content: "nice",
  },
  {
    id: 2,
    content: "nice",
  },
  {
    id: 3,
    content: "nice",
  },
  {
    id: 4,
    content: "nice",
  },
  {
    id: 5,
    content: "nice",
  },
  {
    id: 6,
    content: "nice",
  },
  {
    id: 7,
    content: "nice",
  },
  {
    id: 8,
    content: "nice",
  },
  {
    id: 9,
    content: "nice",
  },
  {
    id: 10,
    content: "nice",
  },
  {
    id: 11,
    content: "nice",
  },
  {
    id: 12,
    content: "nice",
  },
  {
    id: 13,
    content: "nice",
  },
  {
    id: 14,
    content: "nice",
  },
  {
    id: 15,
    content: "nice",
  },
  {
    id: 16,
    content: "nice",
  },
  {
    id: 17,
    content: "nice",
  },
  {
    id: 18,
    content: "nice",
  },
  {
    id: 19,
    content: "nice",
  },
  {
    id: 20,
    content: "nice",
  },
  {
    id: 21,
    content: "nice",
  },
  {
    id: 22,
    content: "nice",
  },
]);

const virtualListRef = ref();

const tobottom = () => {
  console.log("滚动到底部");
};

// 回到底部
const goToBottom = () => {
  console.log("回到底部");
};

// 回到最新消息
const goToNewMessage = () => {
  console.log("回到最新消息");
};

// 提供虚拟列表 ref 给子组件使用
provide("virtualListRef", virtualListRef);

// 到顶部时触发函数 记录旧的滚动高度，加载更多消息后滚动回加载时那条消息的位置
const onToTop = async () => {
  console.log("到达顶部");
};

// 滚动时触发函数，主要处理新消息提示
const onScroll = throttle((eventData) => {
  console.log("滚动le");
}, 100);

const getKey = (item: any) => item.id;
</script>

<style scoped lang="scss">
#virtualListTestId {
  max-width: 1280px;
  width: 90vw;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  /*padding-right: 10px;*/
  /*padding-left: 10px;*/
  padding: 20px 20px;
  height: 500px;
}

.virtual-list {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 99%;
  margin: 0 auto;
  /// / 100 % 时谷歌浏览器会出现无法滚动问题
  padding-right: 20px;
  padding-left: 20px;
  overflow-y: auto;
}
</style>
