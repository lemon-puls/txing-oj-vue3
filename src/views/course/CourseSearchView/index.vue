<template>
  <div id="courseSearchViewId">
    <div class="search">
      <a-input-search
        :style="{ width: '40%' }"
        placeholder="搜搜你想要的视频吧"
        search-button
      >
        <template #button-icon>
          <icon-search />
        </template>
        <template #button-default> Search</template>
      </a-input-search>
    </div>
    <div class="course-list">
      <CourseItem v-for="i in 20" :key="i" @click="onClickCourse"></CourseItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import CourseItem from "@/components/course/CourseItem.vue";
import { IconSearch } from "@arco-design/web-vue/es/icon";
import { useRouter } from "vue-router";

const router = useRouter();
const onClickCourse = () => {
  router.push({
    path: "/txing/course/video/play",
  });
};
</script>

<style scoped lang="scss">
#courseSearchViewId {
  max-width: 1280px;
  width: 90vw;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.8);
  /*padding-right: 10px;*/
  /*padding-left: 10px;*/
  padding: 20px 20px;
  flex: 1;

  .search {
    text-align: center;
    margin-bottom: 80px;
    margin-top: 30px;
  }

  .course-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 20px;
    row-gap: 25px;
  }
}
</style>
