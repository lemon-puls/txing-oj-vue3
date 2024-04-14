<template>
  <div id="ChartDrawerId">
    <a-drawer
      :width="340"
      :height="620"
      :visible="visible"
      :placement="position"
      @ok="handleOk"
      @cancel="handleCancel"
      unmountOnClose
      style="z-index: 12000"
      :footer="false"
      :header="false"
    >
      <template #title> Title</template>
      <div>
        <LineChart />
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
// 图标抽屉
import { ref, withDefaults, defineProps, defineExpose, provide } from "vue";
import LineChart from "@/components/chart/lineChart/index.vue";
// const props = withDefaults(defineProps<{ visible: boolean }>(), {
//   visible: () => false,
// });

const visible = ref(false);
const position = ref("top");

const handleClickChart = () => {
  visible.value = true;
};
const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};

defineExpose({
  handleClickChart,
});

provide("handleClose", handleCancel);
</script>

<style scoped lang="scss">
#ChartDrawerId {
}
</style>
