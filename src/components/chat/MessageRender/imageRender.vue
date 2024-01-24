<!--
* @imageRender
* @author Li zhiwei
* @date 2024/1/24 14:21
-->

<template>
  <div id="imageRender" :style="{ height: getImageHeight + 'px' }">
    <div v-if="hasLoadError" class="image-slot" :style="getWidthStyle()">
      <icon-sync :size="36" />
      加载失败
    </div>
    <template v-else>
      <img
        :src="body?.url"
        v-if="body?.url"
        @error="handleError"
        style="height: 100%"
      />
    </template>
  </div>
</template>

<style scoped>
#imageRender {
}
</style>

<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
import { ImageBody } from "@/service/types";
import { formatImage } from "@/utils/multimediaUtils";
import { IconSync } from "@arco-design/web-vue/es/icon";

const hasLoadError = ref(false);
const isLoading = ref(true);

const props = defineProps<{ body: ImageBody }>();
console.log("ImageBody:", props.body);

const getImageHeight = computed(() => {
  const { width, height } = props.body;
  return formatImage(width, height);
});
const handleError = () => {
  isLoading.value = false;
  hasLoadError.value = true;
};
const getWidthStyle = () => {
  const { width, height } = props.body;
  return `width: ${(getImageHeight.value / height) * width}px`;
};
</script>
