<template>
  <div id="lineChartId">
    <div class="close-icon" @click="closeChart($parent)">
      <SvgIcon icon="close" size="35"></SvgIcon>
    </div>
    <div>
      <!--      <h2>欢迎查看你的刷题统计表，继续加油哦！</h2>-->
      <img src="@/assets/chartTitle.jpg" />
    </div>
    <div class="my-chart">
      <!--    折线图-->
      <div ref="lineCharts" style="width: 50%; height: 500px"></div>
      <div ref="barCharts" style="width: 50%; height: 500px"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { inject, onMounted, ref } from "vue";
import { QuestionSubmitControllerService } from "../../../../generated";
import message from "@arco-design/web-vue/es/message";
import { reduce } from "lodash";
import { convertTimeStrToDateStr } from "@/utils/computeTime";
import SvgIcon from "@/icons/SvgIcon";

// 日期数组
const dates = ref();
// 题目数数组
const questionCounts = ref();
// 提交数数组
const submitCounts = ref();
// 通过数数组
const acCounts = ref();
// 通过率数组
const acRates = ref();

let myLineCharts;
let myBarCharts;
let lineCharts = ref();
let barCharts = ref();
onMounted(async () => {
  await loadChartData();
  console.log(
    "chartData",
    dates.value,
    questionCounts.value,
    submitCounts.value,
    acCounts.value,
    acRates.value
  );
  let option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
      // formatter: (params: any) => {
      //   let result = params[0].axisValue + "<br/>"; // 显示x轴坐标值
      //   params.forEach((item: any) => {
      //     result += item.seriesName + ": " + item.value + "<br/>"; // 保留两位小数显示y轴坐标值
      //   });
      //   return result;
      // },
    },
    legend: {
      data: ["做题数", "提交数", "通过数"],
      // top: "5%", // 图例距离容器顶部的距离
      // right: "5%", // 图例距离容器右侧的距离
      // backgroundColor: "#ccc",
      // textStyle: {
      // color: "#ccc",
      // // ...
      // },
      // ...
    },
    label: {
      show: true,
    },
    xAxis: {
      type: "category",
      name: "日期",
      data: dates.value,
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      // type: "category",
      name: "次数",
      position: "left",
      // axisLabel: {
      // formatter: "{value} h",
      // },
    },
    series: [
      {
        name: "做题数",
        data: questionCounts.value,
        type: "line",
        // smooth: true,
        yAxisIndex: 0,
        radius: [0, "50%"],
        // stack: "x",
      },
      {
        name: "提交数",
        data: submitCounts.value,
        type: "line",
        // smooth: true,
        yAxisIndex: 0,
        radius: [0, "50%"],
        // stack: "x",
      },
      {
        name: "通过数",
        data: acCounts.value,
        type: "line",
        // smooth: true,
        yAxisIndex: 0,
        radius: [0, "50%"],
        // stack: "x",
      },
    ],
  };
  let barOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none", // 更适合柱形图的指示器类型,
      },
    },
    label: {
      show: true,
    },
    xAxis: {
      name: "日期",
      type: "category",
      data: dates.value,
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} %",
      },
      min: 0,
      max: 100,
      name: "通过比例",
    },
    legend: {
      data: ["通过率"],
      // top: "5%", // 图例距离容器顶部的距离
      // right: "5%", // 图例距离容器右侧的距离
      // backgroundColor: "#ccc",
      // textStyle: {
      // color: "#ccc",
      // // ...
      // },
      // ...
    },
    series: [
      {
        data: acRates.value,
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(220, 220, 220, 0.8)",
        },
        name: "通过率",
      },
    ],
  };
  // 折线图
  myLineCharts = echarts.init(lineCharts.value);
  myLineCharts.setOption(option);
  // 柱状图
  myBarCharts = echarts.init(barCharts.value);
  myBarCharts.setOption(barOption);
});

const loadChartData = async () => {
  const res = await QuestionSubmitControllerService.getChartDataUsingPost();
  if (res.code != 0) {
    message.error(res.msg);
    return;
  }
  questionCounts.value = res.data.questionCounts;
  dates.value = res.data.dates.map((date: string) => {
    return convertTimeStrToDateStr(date);
  });
  submitCounts.value = res.data.submitCounts;
  acCounts.value = res.data.acCounts;
  acRates.value = res.data.acRates;
};

// 关闭图表抽屉
const closeChart = inject("handleClose");
</script>

<style scoped lang="scss">
#lineChartId {
  //display: flex;
  //flex-direction: column;
  //justify-content: center;
  //align-items: center;
  text-align: center;

  .my-chart {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
  }

  .close-icon {
    text-align: initial;
    position: absolute;
    top: 20px;
    right: 50px;
  }
}
</style>
