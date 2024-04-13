<template>
  <div id="courseSearchViewId">
    <div class="search">
      <a-input-search
        :style="{ width: '40%' }"
        placeholder="搜搜你想要的视频吧"
        search-button
        v-model="pageParams.filter[0].value"
        @search="onSearch"
        :allow-clear="true"
      >
        <template #button-icon>
          <icon-search />
        </template>
        <template #button-default> 走你</template>
      </a-input-search>
    </div>
    <div class="course-list">
      <CourseItem
        v-for="course in pageData.list"
        :key="course.id"
        :course="course"
        @click="onClickCourse(course.id)"
      ></CourseItem>
    </div>
    <div class="page-plugin">
      <a-pagination
        show-total
        :total="pageData.total"
        :page-size="pageParams.page.pageSize"
        @change="onCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import CourseItem from "@/components/course/CourseItem.vue";
import { IconSearch } from "@arco-design/web-vue/es/icon";
import { useRouter } from "vue-router";
import { CourseAppControllerService } from "../../../../generated";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();

// onMounted(() => {});

// 搜索视频
const onSearch = (val: string) => {
  loadCourseData();
};

// const courseData = ref([]);
const pageData = ref({
  total: 0,
  list: [],
});
const pageParams = ref({
  filter: [
    {
      fieldName: "name",
      queryType: "like",
      value: "",
    },
  ],
  page: {
    current: 1,
    pageSize: 20,
  },
});
const onCurrentChange = (current: number) => {
  pageParams.value = {
    ...pageParams.value,
    page: {
      current: current,
      pageSize: 20,
    },
  };
};

const loadCourseData = async () => {
  const res = await CourseAppControllerService.searchCourseByPageUsingPost(
    pageParams.value
  );
  if (res.code != 0) {
    message.error("课程数据加载失败：", res.msg);
    return;
  }
  pageData.value.list.splice(0);
  pageData.value.total = res.data.total;
  pageData.value.list = res.data.list;
  console.log("pageData", pageData.value);
};
watchEffect(() => {
  loadCourseData();
});
const onClickCourse = (courseId: number) => {
  router.push({
    path: "/txing/course/video/play/" + courseId,
  });
};
</script>

<style lang="scss">
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
    width: 92%;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 20px;
    row-gap: 25px;
  }

  .page-plugin {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }

  .arco-input-wrapper {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  .arco-btn-primary,
  .arco-btn-primary[type="button"],
  .arco-btn-primary[type="submit"] {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}
</style>
