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
    <div ref="charts" style="width: 800px; height: 500px"></div>

    <!--    <a-upload action="/" :upload="uploadFile" />-->
    <input type="file" name="file" @change="handleFileSelect" />
    <button value="上传" @click="uploadFile" />
    <AvatarPopoverTest
      user-name="最好的我们"
      sign="Ta说: 为了提高自己而努力！"
      :is-friend="true"
      user-avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
    >
      <template #target>
        <a-button>success</a-button>
      </template>
      <!--      <template #mycontent>-->
      <!--        <span>这是内容！</span>-->
      <!--      </template>-->
    </AvatarPopoverTest>

    <!--    <InfiniteScrollTest />-->
    <a-button
      type="primary"
      @contextmenu.prevent="contextMenuVisible != !contextMenuVisible"
      >出现右键菜单
    </a-button>
    <MyContextMenu />
  </div>
</template>

<script setup lang="ts">
import VirtualList from "@/components/VirtualList";
import { onMounted, provide, reactive, ref } from "vue";
import { throttle } from "lodash";
import MsgItem from "@/views/test/MsgItem.vue";
import SvgIcon from "@/icons/SvgIcon";
import * as echarts from "echarts";
import { useUpload } from "@/hooks/useUpload";
import AvatarPopoverTest from "@/components/user/AvatarPopover.vue";
import InfiniteScrollTest from "@/components/test/InfiniteScrollTest.vue";
import MyContextMenu from "@/components/chat/chat/sessionlist/ContextMenu/MyContextMenu.vue";

// 右键菜单显隐
const contextMenuVisible = ref(false);

const { handleFileInUploading } = useUpload();

const selectedFile = ref<File | undefined>(undefined);
const uploadFile = () => {
  handleFileInUploading(selectedFile.value as File, "chat");
};

const handleFileSelect = (event: any) => {
  // 获取选中的文件对象
  selectedFile.value = event.target.files[0];
};

let charts = ref();
onMounted(() => {
  // 获取节点
  let mycharts = echarts.init(charts.value);
  // mycharts.setOption({
  //   tooltip: {
  //     trigger: "axis",
  //     axisPointer: { type: "cross" },
  //   },
  //   legend: {},
  //   xAxis: [
  //     {
  //       type: "category",
  //       axisTick: {
  //         alignWithLabel: true,
  //       },
  //       data: [
  //         "1月",
  //         "2月",
  //         "3月",
  //         "4月",
  //         "5月",
  //         "6月",
  //         "7月",
  //         "8月",
  //         "9月",
  //         "10月",
  //         "11月",
  //         "12月",
  //       ],
  //     },
  //   ],
  //   yAxis: [
  //     {
  //       type: "value",
  //       name: "降水量",
  //       min: 0,
  //       max: 250,
  //       position: "right",
  //       axisLabel: {
  //         formatter: "{value} ml",
  //       },
  //     },
  //     {
  //       type: "value",
  //       name: "温度",
  //       min: 0,
  //       max: 25,
  //       position: "left",
  //       axisLabel: {
  //         formatter: "{value} °C",
  //       },
  //     },
  //   ],
  //   series: [
  //     {
  //       name: "降水量",
  //       type: "bar",
  //       yAxisIndex: 0,
  //       data: [
  //         6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36.0, 19.3,
  //       ],
  //     },
  //     {
  //       name: "温度",
  //       type: "line",
  //       smooth: true,
  //       yAxisIndex: 1,
  //       data: [
  //         6.0, 10.2, 10.3, 11.5, 10.3, 13.2, 14.3, 16.4, 18.0, 16.5, 12.0, 5.2,
  //       ],
  //     },
  //   ],
  // });
  mycharts.setOption({
    // title: {
    //   text: "水球图",
    // },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
    },
    legend: {},
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
    ],
    yAxis: [
      // {
      //   type: "value",
      //   name: "降水量",
      //   min: 0,
      //   max: 250,
      //   position: "right",
      //   axisLabel: {
      //     formatter: "{value} ml",
      //   },
      // },
      {
        type: "value",
        name: "温度",
        min: 0,
        max: 25,
        position: "left",
        axisLabel: {
          formatter: "{value} °C",
        },
      },
    ],
    series: [
      // {
      //   name: "降水量",
      //   type: "bar",
      //   yAxisIndex: 0,
      //   data: [
      //     6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36.0, 19.3,
      //   ],
      // },
      {
        name: "温度",
        type: "line",
        smooth: true,
        yAxisIndex: 0,
        radius: [0, "50%"],
        data: [
          6.0, 10.2, 10.3, 11.5, 10.3, 13.2, 14.3, 16.4, 18.0, 16.5, 12.0, 5.2,
        ],
      },
    ],
    // grid: {
    //   left: 0,
    //   right: 0,
    //   top: 0,
    //   bottom: 0,
    // },
  });
});

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
