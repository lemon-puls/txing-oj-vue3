<template>
  <div id="CourseFavourId">
    <div class="course-list" v-if="courseData.length > 0">
      <a-popover
        :trigger="'contextMenu'"
        :position="'bottom'"
        v-for="course in courseData"
        :key="course.id"
        style="width: 120px !important; border-radius: 10px"
      >
        <CourseItem
          :course="course"
          :is-show-overlay="false"
          @click="onClickCourse(course.id)"
        ></CourseItem>
        <template #content>
          <div class="ops-content" style="text-align: center">
            <a-space>
              <span class="ops-button" @click="onCancelFavour(course.id)"
                ><SvgIcon icon="remove1" :size="20" /> 取消收藏</span
              >
            </a-space>
          </div>
        </template>
      </a-popover>
    </div>
    <div class="page-plugin" v-if="courseData.length > 0">
      <a-pagination
        show-total
        :total="total"
        :page-size="pageParams.pageSize"
        @change="onCurrentChange"
      />
    </div>
    <a-empty v-else />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import { CourseAppControllerService } from "../../../generated";
import CourseItem from "@/components/course/CourseItem.vue";
import message from "@arco-design/web-vue/es/message";
import SvgIcon from "@/icons/SvgIcon";

const router = useRouter();

// 总页数
const total = ref(0);
const courseData = ref([]);
const pageParams = ref({
  current: 1,
  pageSize: 20,
});
const onCurrentChange = (current: number) => {
  pageParams.value = {
    ...pageParams.value,
    current: current,
  };
};

const loadCourseData = async () => {
  const res = await CourseAppControllerService.getUserFavourUsingPost(
    pageParams.value
  );
  if (res.code != 0) {
    message.error(res.msg);
    return;
  }
  total.value = res.data.total;
  courseData.value = res.data.list;
};
watchEffect(() => {
  loadCourseData();
});
const onClickCourse = (courseId: number) => {
  router.push({
    path: "/txing/course/video/play/" + courseId,
  });
};
/**
 * 取消收藏课程
 */
const onCancelFavour = async (courseId: number) => {
  const res = await CourseAppControllerService.favourCourseUsingPost(courseId);
  if (res.code != 0) {
    message.error(res.msg);
    return;
  }
  message.success("已取消收藏");
  loadCourseData();
};
</script>

<style scoped lang="scss">
#CourseFavourId {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .course-list {
    width: 90%;
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
}

.ops-content {
  .ops-button {
    display: flex;
    align-items: center;
    column-gap: 10px;

    &:hover {
      color: #007bff;
    }

    cursor: pointer;
  }
}
</style>
