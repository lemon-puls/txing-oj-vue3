<template>
  <div id="lineChartId">
    <div>
      <h2>欢迎查看你的刷题统计表，继续加油哦！</h2>
    </div>
    <!--    折线图-->
    <div ref="charts" style="width: 60%; height: 500px"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

let option = {
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "cross" },
  },
  legend: {},
  xAxis: {
    type: "category",
    name: "日期",
    data: [
      "4.13",
      "4.14",
      "4.15",
      "4.16",
      "4.17",
      "4.18",
      "4.19",
      "4.20",
      "4.21",
      "4.22",
    ],
  },
  yAxis: {
    // type: "category",
    name: "次数",
    position: "left",
  },
  series: [
    {
      data: [10, 22, 28, 43, 49, 10, 22, 28, 43, 49],
      type: "line",
      // stack: "x",
    },
    {
      data: [9, 21, 27, 42, 48, 10, 22, 28, 43, 49],
      type: "line",
      // stack: "x",
    },
  ],
};
let mycharts: any;
let charts = ref();
onMounted(() => {
  // 折线图
  mycharts = echarts.init(charts.value);
  mycharts.setOption(option);
});
</script>

<style scoped lang="scss">
#lineChartId {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
